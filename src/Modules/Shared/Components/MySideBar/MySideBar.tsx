
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import styles from "./MySideBar.module.css";
import { useAuth } from '../../../../Hooks/useAuth';

export default function MySideBar({ collapsed, handleCollapse }: { handleCollapse: () => void; collapsed: boolean }) {

  const {logOut,isEmployee} = useAuth()
  return (
    <div
      className={`side-bar-container vh-100 overflow-hidden`}
      style={{
        position: "fixed",
       top:0,
        left: 0,
        width: collapsed ? "80px" : "240px",
        zIndex: 10,
        backgroundColor: "white",
        transition: "width 0.3s ease",
        overflowY: "auto"
      }}
    >
      <Sidebar collapsed={collapsed} className="h-100">
        <Menu className="h-100 fw-bold">
          <MenuItem>
            <div className={`position-absolute ${styles.arrowPosition}`}>
              <button onClick={handleCollapse} className='border-0 bg-transparent px-3'>
                {collapsed ? (
                  <i className="fa-solid fa-circle-chevron-right fs-2" style={{color:"#EF9B28"}}></i>
                ) : (
                  <i className="fa-solid fa-circle-chevron-left fs-2" style={{color:"#EFc428"}}></i>
                )}
              </button>
            </div>
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>

{!isEmployee && <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>}
 <MenuItem icon={<i className="fa-solid fa-chart-simple"></i>} component={<Link to="/dashboard/projects" />}> Projects</MenuItem>
{!isEmployee && <MenuItem icon={<i className="fa-solid fa-list-check"></i>} component={<Link to="/dashboard/tasks" />}> Tasks</MenuItem>}   
{isEmployee && <MenuItem icon={<i className="fa-solid fa-list-check"></i>} component={<Link to="/dashboard/my-tasks" />}> MyTasks</MenuItem>}   
          <MenuItem icon={<i className="fa-solid fa-id-card"></i>} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-lock"></i>} component={<Link to="/dashboard/change-password" />}> Change-Password</MenuItem>
          <MenuItem onClick={logOut} icon={<i className="fa-solid fa-right-from-bracket"></i>}> LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}





