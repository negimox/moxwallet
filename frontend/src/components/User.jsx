import { useEffect, useState } from "react";
import { HOST_API_V1_URL, SVG_MONEY } from "../utils/constants.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState();
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  const getUsers = async () => {
    const response = await axios.get(
      HOST_API_V1_URL + "/user/bulk?filter=" + filter,
    );
    setUsers(response.data.user);
  };

  useEffect(() => getUsers, [filter]);

  return (
    <>
      <div className="z-10 rounded-md flex flex-row h-fit text-2xl">
        <h2 className="font-medium pr-2">Your Balance</h2>
        <SVG_MONEY />
        <span className="px-8">₹ 50</span>
      </div>

      <label className="input input-bordered flex items-center gap-2 mt-10">
        <input
          type="text"
          className="grow"
          placeholder="Search Users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {!users ? <div className="skeleton w-full h-64"></div> : <></>}
      <ul className="menu bg-base-200 rounded-box w-full mt-12">
        {users?.map((user) => (
          <li key={user._id} className="mt-2">
            <div className="flex justify-between w-full">
              <span className="font-bold">
                {user.username}
                <span className="pl-4">
                  {user.firstName}
                  {user.lastName}
                </span>
              </span>
              <button
                onClick={() =>
                  navigate(
                    "/send?id=" +
                      user._id +
                      "&name=" +
                      user.firstName +
                      "_" +
                      user.lastName,
                  )
                }
                className="btn btn-accent"
              >
                Send Money
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
