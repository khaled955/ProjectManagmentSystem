
import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye } from 'react-icons/bs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AUTHENTICATION_URL, baseURL } from '../../../../Services/URL';
import axiosInstance from '../../../../Services/AxiosInstance';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Components/Loading/Loading';
import NoData from '../../../Shared/Components/NoData/NoData';
import Pagination from '../../../Shared/Components/Pagination/Pagination';
import debounce from "lodash/debounce";
import type { User } from '../../../../Interfaces/Users.interface';
import UserDetails from '../UserDetails/UserDetails';
import avatar from "../../../../assets/images/th.jpeg";
import ConfirmModal from '../../../Shared/Components/ConfirmModal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useAuth } from '../../../../Hooks/useAuth';


export default function UsersList() {
  const [usersList, setUsersList] = useState<User[] | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [seletedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQueryByName, setSearchQueryByName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [btnText, setBtnText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [groupsValue, setGroupsValue] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();
  const { isEmployee } = useAuth();


  // fetch All users
  const fetchUsers = useCallback(async function () {
    try {
      const options = {
        url: AUTHENTICATION_URL.GET_ALL_USERS(5, currentPage, searchQueryByName, groupsValue),
        method: "GET",
      };
      const { data } = await axiosInstance.request(options);
      setUsersList(data.data);
      setTotalPageNumber(data.totalNumberOfPages);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || " Some thing go wrong!");
      }
    }
  }, [currentPage, searchQueryByName, groupsValue]);

  useEffect(() => {
    if (isEmployee) {
      navigate("/dashboard");
      return;
    } else {
      fetchUsers();
    }
  }, [currentPage, fetchUsers, isEmployee, navigate]);


// convert user into block and un block
  const toggleUser = useCallback(async function blockUser(userId: number) {
    setIsLoading(true);
    const toastId = toast.loading("Waiting ....");
    try {
      const options = {
        url: AUTHENTICATION_URL.TOGGLE_USER_BY_ID(userId),
        method: "PUT"
      };
      await axiosInstance.request(options);
      toast.success(successMsg);
      fetchUsers();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Some thing go wrong!");
      }
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  }, [fetchUsers, successMsg]);



  // filter by user name
  const debounceSearchByUserName = useMemo(() => {
    return debounce(() => {
      if (searchQueryByName) {
        fetchUsers();
      }
    }, 300);
  }, [fetchUsers, searchQueryByName]);

  function handleSearchQuertByName(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQueryByName(e.target.value);
    setCurrentPage(1);
    debounceSearchByUserName();
  }

  useEffect(() => {
    return () => debounceSearchByUserName.cancel();
  }, [debounceSearchByUserName]);



// filter by credential role

  const handlesetGroupValue = useCallback(function (e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setGroupsValue(+value);
  }, []);



  // sort function
 const handleSortUsersByName = useCallback(function () {
    const sortedUsers = [...(usersList) || []].sort((a: User, b: User) => a.userName.localeCompare(b.userName));
    setUsersList(sortedUsers);
    setIsSorted(true);
  }, [usersList]);


// revers sort function
  const handleReversUsersByNameToOriginal = useCallback(function () {
    const originalData = [...(usersList) || []].reverse();
    setUsersList(originalData);
    setIsSorted(false);
  }, [usersList]);


  function handleHideConfirmModal() {
    setShowConfirmModal(false);
  }

  function handleHideUserCard() {
    setShowUserDetails(false);
  }

 

  if (!usersList) return <Loading />;

  return (
    <main>
      <Helmet>
        <title>Users List | Admin Panel</title>
        <meta name="description" content="View and manage users including their status, group, and personal info." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {showUserDetails && currentUser && (
        <UserDetails currentUser={currentUser} handleHideUserCard={handleHideUserCard} />
      )}

      {showConfirmModal && seletedUserId && (
        <ConfirmModal
          onClose={handleHideConfirmModal}
          selectedId={seletedUserId}
          show={showConfirmModal}
          isLoading={isLoading}
          onConfirm={toggleUser}
          message={alertMessage}
          btnText={btnText}
        />
      )}

      <header className="project-header px-2 rounded-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h1>Users</h1>
      </header>

      <section className="filter-box my-4 position-relative row gap-3 justify-content-center align-items-center" aria-label="Filters">
        <div className="name-search position-relative col-md-8">
          <label htmlFor="search-name" className="visually-hidden">Search by name</label>
          <i className="fa-brands fa-searchengin position-absolute start-0 top-50 translate-middle-y ms-3" aria-hidden="true"></i>
          <input
            id="search-name"
            value={searchQueryByName}
            onChange={handleSearchQuertByName}
            className="form-control px-5"
            type="search"
            placeholder="Search By Name"
            aria-label="Search by user name"
          />
        </div>

        <div className="role-search position-relative col-md-2">
          <label htmlFor="role-filter" className="visually-hidden">Filter by role</label>
          <select
            id="role-filter"
            className='rounded-3 px-2 py-1 form-control'
            onChange={handlesetGroupValue}
            value={groupsValue}
            aria-label="Filter by user role"
          >
            <option value="0">All Credentials</option>
            <option value="1">Manager</option>
            <option value="2">Employee</option>
          </select>
        </div>
      </section>

      <section aria-labelledby="user-table-heading">
        <h2 id="user-table-heading" className="visually-hidden">Users Table</h2>
        <table className="table table-responsive text-center">
          <thead>
            <tr>
              <th className='d-flex align-items-center gap-1' style={{ backgroundColor: "#315951E5", color: "white" }}>
                <span>UserName</span>
                {isSorted ? (
                  <i onClick={handleReversUsersByNameToOriginal} style={{ cursor: "pointer" }} className="fa-solid fa-caret-up" aria-label="Sort descending"></i>
                ) : (
                  <i onClick={handleSortUsersByName} style={{ cursor: "pointer" }} className="fa-solid fa-caret-down" aria-label="Sort ascending"></i>
                )}
              </th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Status</th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Image</th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Phone Number</th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Email</th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Country</th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Created Date</th>
              <th style={{ backgroundColor: "#315951E5", color: "white" }}>Action</th>
            </tr>
          </thead>
          <tbody className='text-center align-middle'>
            {usersList.length > 0 ? usersList.map((user: User) => (
              <tr key={user.id}>
                <td className='text-capitalize'>{user.userName}</td>
                <td style={{ backgroundColor: "#315951E5", color: "white", borderRadius: 20 }}>
                  {user.isActivated ? "Active" : "Inactive"}
                </td>
                <td>
                  <img
                    className='rounded-circle'
                    width={40}
                    height={40}
                    src={user.imagePath ? `${baseURL}/${user.imagePath}` : avatar}
                    alt={`${user.userName}'s avatar`}
                  />
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{new Date(user.creationDate).toLocaleTimeString()}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      as="button"
                      className="btn btn-link p-0 border-0"
                      id={`dropdown-user-${user.id}`}
                      aria-label={`Actions for ${user.userName}`}
                    >
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-sm rounded-3">
                      <Dropdown.Item
                        onClick={() => {
                          setCurrentUser(user);
                          setShowUserDetails(true);
                        }}
                        aria-label={`View details of ${user.userName}`}
                      >
                        <BsEye className="me-2 text-success" />
                        View
                      </Dropdown.Item>

                      <Dropdown.Item
                        disabled={isLoading}
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setShowConfirmModal(true);
                          setAlertMessage(user.isActivated ? "Are You Want To Block The User" : "Are You Want To Unblock The User");
                          setBtnText(user.isActivated ? "Block" : "Unblock");
                          setSuccessMsg(user.isActivated ? "User Blocked Successfully ✅" : "User Unblocked Successfully 👌");
                        }}
                        aria-label={`${user.isActivated ? "Block" : "Unblock"} user ${user.userName}`}
                      >
                        {user.isActivated ? <i className="fa-solid fa-ban me-1"></i> : <i className="fa-solid fa-lock-open me-1"></i>}
                        {user.isActivated ? "Block" : "Unblock"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            )) : (
              <NoData message="No Users Found" />
            )}
          </tbody>
        </table>
      </section>

      {totalPageNumber > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPageNumber} onPageChange={setCurrentPage} />
      )}
    </main>
  );
}
