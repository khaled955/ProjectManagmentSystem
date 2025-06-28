
import { Outlet } from "react-router-dom";
import MySideBar from "../MySideBar/MySideBar";
import { useState } from "react";
import NavBar from "../Navbar/NavBar";

export default function MasterLayOut() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapse() {
    setIsCollapsed((current) => !current);
  }


    const isDesktop = window.innerWidth >= 576;


  return (
    <>
      {/* <NavBar /> */}
      <NavBar/>

      <div className=" mt-sm-5 py-sm-5 container-fluid d-flex overflow-hidden outlet-container">
        <MySideBar collapsed={isCollapsed} handleCollapse={handleCollapse} />

        <div
          className="row justify-content-center"
          style={{
            marginLeft: isCollapsed ? 80 : 240,
            width: isDesktop ? `calc(100% - ${isCollapsed ? 80 : 240}px)` : "100%",
            transition: "all 0.3s ease"
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}



