import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Renders children routes here */}
    </div>
  );
}

export default Layout;
