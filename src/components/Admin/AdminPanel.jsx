import React, { useState, useEffect } from "react";
import User from "./User";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
import Transac from "./Transac";
import BlogWriter from "./BlogWriter";


function AdminPanel() {
  const [showEditPage, setShowEditPage] = useState(false);
  const [showTransacPage, setShowTransacPage] = useState(false);
  const [showBlogPage, setShowBlogPage] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState([]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditPage(true);
  };

  const handleTransacPage = () => {
    setShowEditPage(false);
    setShowBlogPage(false);
    setShowTransacPage(true)
  }
  const handleBlogPage = () => {
    setShowEditPage(false);
    setShowTransacPage(false)
    setShowBlogPage(true);
  }
  const handleBackClick = () => {
    setShowTransacPage(false)
    setShowBlogPage(false)
    setShowEditPage(false);
    setSelectedUser(null);
  };
  useEffect(() => {
    onValue(ref(db, `users/`), (snapshot) => {
      if (snapshot && snapshot.val()) {
        setUserData(snapshot.val());

      }
      else { }
    });
  }, []);

  const handleDeleteUser = async (key) => {

  };


  const userRows = [];
  for (const [key, user] of Object.entries(userData)) {
    userRows.push(
      <tr className="text-gray-700 ">
        <td className="px-4 py-4 border-b">
          <div className="flex items-center text-sm">
            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
              <img className="object-cover w-full h-full rounded-full" src={user.profile.imageUrl ? user.profile.imageUrl : "https://img.icons8.com/ios-filled/50/null/gender-neutral-user.png"} alt="" loading="lazy" />
              <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
            </div>
            <div>
              <p className="font-semibold text-lg capitalize text-black">{user.profile.firstName ? user.profile.firstName : ""} {user.profile.lastName ? user.profile.lastName : ""}</p>
              <p className="text-sm text-gray-600">{user.profile.email ? user.profile.email : ""}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 text-ms border-b">{user.profile.city ? user.profile.city : ""}</td>
        <td className="px-4 py-4 text-md border-b">
          <span className="px-2 py-1  leading-tight   rounded-sm"> {user.profile.gender ? user.profile.gender : ""} </span>
        </td>
        <td className="px-4 py-4 text-md border-b">{user.profile.contact ? user.profile.contact : ""}</td>
        <td className="justify-center py-4 text-md border-b  "><div>
          <button className="bg-green-100 rounded-md px-4 font-semibold py-1 " onClick={() => handleEditClick(user)}>View</button>
          {/* <button className="bg-red-100 rounded-md px-4 font-semibold py-1 ml-4" onClick={() => handleDeleteUser(key)} >Delete</button> */}
        </div></td>
      </tr>
    );
  }

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-slate-600 text-2xl py-6 ">Welcome Admin!</h1>
        <h1 className="text-md font-semibold text-blue-800">Logout</h1>
      </div>
      <nav id="header" className="bg-gray-50  w-full z-10 shadow">
        <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pb-3 md:pb-0">
          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-gray-50 z-20" id="nav-content">
            <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
              <li className="mr-6 my-2 md:my-0">
                <p className="block cursor-pointer py-1 md:py-3 pl-1   ">
                  <button onClick={handleBackClick}>Users</button>
                </p>
              </li>
              <li className="mr-6 my-2 md:my-0">
                <p className="block cursor-pointer py-1 md:py-3 pl-1">
                  <button onClick={handleTransacPage}>Transactions</button>
                </p>
              </li>
              <li className="mr-6 my-2 md:my-0">
                <p className="block cursor-pointer py-1 md:py-3 pl-1">
                <button onClick={handleBlogPage}>Blog</button>
                </p>
              </li>
            </ul>
          </div>

        </div>
      </nav>
      <div className="w-full container mx-auto mt-20">

        {showEditPage ? (
          <User user={selectedUser} onBackClick={handleBackClick} />
        ) :
          showTransacPage ? (<Transac />) :
          showBlogPage ? (<BlogWriter />) :
            (
              <table className="w-full">
                <thead>
                  <tr className="text-sm shadow-md  text-left text-slate-700 bg-blue-100 uppercase">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {userRows}
                </tbody>
              </table>
            )}
      </div>
    </div>
  );
}

export default AdminPanel;
