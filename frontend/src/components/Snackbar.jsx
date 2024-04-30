import { useEffect, useState } from "react";

const Snackbar = ({ duration, type, message }) => {
  console.log("ERROR");
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, duration);
  }, []);

  return !show ? null : (
    <div className="toast toast-top toast-end mt-20 z-50">
      <div className={"alert alert-" + type}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Snackbar;
