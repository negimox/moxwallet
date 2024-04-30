import React from "react";
import { SVG_LOGO } from "../utils/constants.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    // <div className="flex flex-row justify-between bg-[#434C5E] text-[#D8DEE9] py-3 px-4 fixed w-screen">
    //   <div className="flex flex-row my-auto">
    //   </div>

    // </div>
    <div className="navbar bg-base-100 border-accent border-solid border-b-2 pb-3 ">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost text-xl">
          <SVG_LOGO />
          <h2 className="font-black text-lg">MyWallet</h2>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar palceholder align-middle content-center"
          >
            {/*<div className="w-10 rounded-full">*/}
            {/*  <img*/}
            {/*    alt="Tailwind CSS Navbar component"*/}
            {/*    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div className="bg-neutral text-neutral-content rounded-full w-24">*/}
            {/*  <span className="text-2xl">D</span>*/}
            {/*</div>*/}
            <div className="bg-neutral text-neutral rounded-full w-24 py-1.5 text-2xl">
              <span className="text-neutral-content">D</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
