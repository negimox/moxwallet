const express = require("express");
const zod = require("zod");
const { User, Account } = require("../dbSchema");
const jwt = require("jsonwebtoken");
const JWT_SECERT = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();
module.exports = router;

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateInfoSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  // --------------------------------------
  // Create new user in DB
  const dbUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  // Also create the user's account and assign it random balance for the sake of testing.
  const userId = dbUser._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  // -------------------------------------
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECERT,
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const loginParse = signinSchema.safeParse(body);
  if (!loginParse.success) {
    return res.status(411).json({
      message: "Password/Username is incorrect",
    });
  }
  // Check if username and pass is korrect
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  //Creating Token
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECERT,
  );
  res.json({ token: token });
});

// It is a good practise to put user information at "/" according to the route name.
router.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const updateBody = updateInfoSchema.safeParse(body);
  if (!updateBody.success) {
    res.status(411).json({
      message: "Error while updating information.",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully.",
  });
});

router.get("/bulk", async (req, res) => {
  const query = req.query;
  const filter = query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
