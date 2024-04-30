import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(1);
  const id = searchParams.get("id");
  const name = searchParams.get("name").split("_");

  const handleClick = () => {
    let data = JSON.stringify({
      amount,
      to: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/account/transfer",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center mt-36">
      <div className="card w-96 bg-natural-content shadow-2xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Send Money</h2>
          <div className="flex flex-row mt-12">
            <div className="avatar placeholder m-6">
              <div className="bg-neutral text-neutral rounded-full w-24">
                <span className="text-3xl text-neutral-content">
                  {name[0][0].toUpperCase() + name[1][0].toUpperCase()}
                </span>
              </div>
            </div>
            <span className="font-bold text-3xl my-auto text-left">
              {name[0] + " " + name[1]}
            </span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <span className="">₹</span>
            <input
              type="number"
              min="1"
              className="grow"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-accent" onClick={handleClick}>
              Send
            </button>

            <Link to="/dashboard">
              <button className="btn btn-ghost">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
