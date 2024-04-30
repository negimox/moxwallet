import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HOST_API_V1_URL } from "../utils/constants.jsx";
import Snackbar from "./Snackbar.jsx";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const handleSignIn = async () => {
    let response;
    try {
      response = await axios.post(HOST_API_V1_URL + "/user/signin", {
        username: email,
        password,
      });
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <>
      {error && <Snackbar type="info" duration="2000" message={error} />}
      <div className="flex justify-center my-auto mt-20">
        <div className="bg-neutral-content z-10 my-auto rounded-md p-14 shadow-2xl">
          <h2 className="font-black text-4xl pb-6">Sign In</h2>
          {/*Form*/}
          <form className="py-2" onSubmit={(e) => e.preventDefault()}>
            <label className="input input-bordered flex items-center gap-2 my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button className="btn" onClick={handleSignIn}>
              Sign In
            </button>
          </form>
          {/*End Form*/}

          <p className="paragraph-text pt-6 text-neutral">
            New here?{" "}
            <Link className="link link-hover font-bold" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
