import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db,storage } from "./firebase";
import {ref as sRef,getDownloadURL} from "firebase/storage"
import { onValue, ref } from "firebase/database";



const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, "users/" + user.uid + "/profile"), (snapshot) => {
          if (snapshot.exists()) {
            setName(snapshot.val().firstName);
            setImageUrl(snapshot.val().imageUrl)
          }
          else {
            setName("user")
          }
        });
      }
    })
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen ? <div onClick={toggleDropdown} className="w-full h-screen fixed top-0 bg-gray-800 opacity-80 z-50">lll</div> : <div className="hidden"></div>}
      
    <nav className="bg-white fixed top-0 w-full z-50  ">
      
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 shadow-sm shadow-gray-200">
        
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center px-2 sm:items-stretch justify-between">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold uppercase flex  flex-row"
              >
                Cryp<h1 className="text-blue-500">stat</h1>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 items-center">
                <Link
                  to="/"
                  className="text-gray-900 hover:bg-slate-200 hover:text-slate-700 px-3 py-2 rounded-md md:text-base text-sm  "
                >
                  Home
                </Link>
                {name ? <Link to="dashboard" className="text-gray-900 hover:bg-slate-200 hover:text-slate-700 px-3 py-2 rounded-md md:text-base text-sm  ">
                  Dashboard
                </Link> : <Link to="login" className="text-gray-900 hover:bg-slate-200 hover:text-slate-700 px-3 py-2 rounded-md md:text-base text-sm  ">
                  Dashboard
                </Link>}
                <Link
                  to="/Blog"
                  className="text-gray-900 hover:bg-slate-200 hover:text-slate-700 px-3 py-2 rounded-md md:text-base text-sm  "
                >
                  Blog
                </Link>
                
                <Link
                  to="/contact"
                  className="text-gray-900 hover:bg-slate-200 hover:text-slate-700 px-3 py-2 rounded-md md:text-base text-sm  "
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="relative inline-block text-left">
              <div>
                {name ? <div className="flex "><div>
                  <h1 className="px-4 py-2 text-sm  capitalize  ">Welcome! {name}</h1>
                </div>
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={imageUrl ? imageUrl : ""}
                      alt="User"
                    />
                  </button></div> : <div className="flex space-x-4"><Link to="login" className="text-gray-900  hover:bg-slate-200 px-3 py-2 rounded-md text-sm ">
                    Login
                  </Link>
                  <Link to="register" className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-sm ">
                    Register
                  </Link></div>}

              </div>
              <div
                className={`${isOpen ? "block bg-black w-full" : "hidden"
                  } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10`}
              >

                <div className="py-1 bg-white rounded-md shadow-xs">
                  <Link
                    to="/" onClick={() => setIsOpen(!isOpen)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  <Link
                    to="/dashboard" onClick={() => setIsOpen(!isOpen)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/Blog" onClick={() => setIsOpen(!isOpen)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
                  >
                    Blog
                  </Link>
                  
                  <Link
                    to="/contact" onClick={() => setIsOpen(!isOpen)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
                  >
                    Contact
                  </Link>

                  <hr />


                  {!name ? (
                    <>
                      {" "}
                      <Link to="login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
                        Login
                      </Link>
                      <Link to="register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
                        Register
                      </Link>
                    </>
                  ) : (
                    <span className="flex flex-col">
                      <Link
                        to="profile" onClick={() => setIsOpen(!isOpen)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Profile
                      </Link>

                      <p
                        onClick={() => {
                          props.logout(); setIsOpen(!isOpen)
                        }}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Sign out
                      </p>
                    </span>
                  )}



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
    </div>
  );
};

export default Header;
