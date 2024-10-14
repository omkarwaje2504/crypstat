import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { useEffect, useState,createContext } from "react";
import { auth} from "./components/firebase";
import Blog from "./components/blog/Blog";
import { signOut } from "firebase/auth";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import BuySellPage from "./components/BuySellPage";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPanel from "./components/Admin/AdminPanel";
import Page from "./components/blog/Page";
import Contact from "./components/Contact";
export const UserContext = createContext();

const App = () => {
  const [userId, setUserId] = useState("");
  const userContext = createContext();
  const navigate=useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("./")
      }
    });
  },[]);
  const signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Swal.fire({
          icon: 'success',
          title: 'SignOut Successful',
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result) {
            navigate("/");
            window.location.reload();
          }
        })
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="font-mont">
      <UserContext.Provider value={{userId}}>
      {location.pathname !== "/admin/dashboard" ? <Header  logout={signout} /> : "" }
      <Routes>
        {/* <Route path="/*" element={<Home user={userId}/>} /> */}
        <Route path="/" element={<Home user={userId}/>} />
        <Route path="dashboard" element={<Dashboard user={userId}/>} />
        <Route path="profile" element={<Profile  />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> 
        <Route path="buypage" element={<BuySellPage />} /> 
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blogPage" element={<Page />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminPanel />} />
      </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;