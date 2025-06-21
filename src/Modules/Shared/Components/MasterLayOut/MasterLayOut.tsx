// import { Outlet } from "react-router-dom";
// import MySideBar from "../MySideBar/MySideBar";
// import NavBar from "../Navbar/NavBar";
// import { useState } from "react";

// export default function MasterLayOut() {
// const [isCollapsed , setIsCollapsed] = useState(false)

// function handleCollapse(){
//   setIsCollapsed(current=>!current)
// }

//   return (
//     <>
//    <NavBar/>

  

// <div className="mt-sm-5 py-sm-5 container-fluid d-flex overflow-hidden">
//   <MySideBar collapsed={isCollapsed} handleCollapse={handleCollapse} />

//   <div className="flex-grow-1 bg-info">

//       <Outlet />
    
//   </div>
// </div>












// </>

    
//   )
// }





import { Outlet } from "react-router-dom";
import MySideBar from "../MySideBar/MySideBar";
import NavBar from "../Navbar/NavBar";
import { useState } from "react";

export default function MasterLayOut() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapse() {
    setIsCollapsed((current) => !current);
  }


    const isDesktop = window.innerWidth >= 576;


  return (
    <>
      <NavBar />

      <div className=" mt-sm-5 py-sm-5 container-fluid d-flex overflow-hidden outlet-container">
        <MySideBar collapsed={isCollapsed} handleCollapse={handleCollapse} />

        <div
          className=""
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



