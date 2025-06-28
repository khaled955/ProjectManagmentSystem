import Loading from "../../../Shared/Components/Loading/Loading";
import { motion } from "framer-motion";
import { baseURL } from "../../../../Services/URL";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Hooks/useAuth";

export default function DisplayProfile() {
const {fetchUser,userInfo} = useAuth()

useEffect(()=>{
  fetchUser()
},[fetchUser,userInfo])


  if (!userInfo) return <Loading />;

  const profileImage = userInfo.imagePath
    ?`${baseURL}/${userInfo.imagePath}`
    : `https://ui-avatars.com/api/?name=${userInfo.userName}&background=random`;

  return (
   <>



    <motion.div
      className="container-fluid py-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="row g-4">
        {/* Profile Card */}
        <div className=" col-12 col-md-4">
          <div className="card text-center shadow rounded-4 p-3">
            <img
              src={profileImage}
              alt="profile"
              className="rounded-circle mx-auto mt-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <h5 className="mt-3 fw-bold">{userInfo.userName}</h5>
            <p className="text-muted">{userInfo.email}</p>
            <div className="d-flex justify-content-center gap-2 my-2">
              <button className="btn btn-primary btn-sm rounded-pill px-3">Follow</button>
              <button className="btn btn-outline-primary btn-sm rounded-pill px-3">Message</button>
            </div>
            <ul className="list-group list-group-flush text-start mt-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Website</span><span>-</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Twitter</span><span>-</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Facebook</span><span>-</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Instagram</span><span>-</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Panels */}
        <div className=" col-12 col-md-8">
          <div className="row g-4">
            <div className=" col-12 col-md-6">
              <div className="card shadow rounded-4 p-3 w-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="text-primary fw-bold m-0">Basic Info</h6>
                  <Link to="/dashboard/update-profile"
                    className="btn btn-sm btn-outline-secondary rounded-pill"
                    
                  >
                    Update Profile
                  </Link>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Full Name:</span>
                    <span className="fw-medium">{userInfo.userName}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Email:</span>
                    <span className="fw-medium">{userInfo.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Phone:</span>
                    <span className="fw-medium">{userInfo.phoneNumber}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Country:</span>
                    <span className="fw-medium">{userInfo.country}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Group:</span>
                    <span className="fw-medium">{userInfo.group?.name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Created:</span>
                    <span className="fw-medium">
                      {new Date(userInfo.creationDate).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" col-12 col-md-6">
              <div className="card shadow rounded-4 p-3">
                <h6 className="text-primary fw-bold mb-3">Account Status</h6>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Status:</span>
                  <span className={`badge rounded-pill ${userInfo.isActivated ? "bg-success" : "bg-danger"}`}>
                    {userInfo.isActivated ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="mb-1">Profile Completion</p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="mb-1">Engagement</p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
   </>
  );
}
