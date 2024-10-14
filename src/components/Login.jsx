import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import pc from "../assets/pc.png";
import { ThreeCircles } from 'react-loader-spinner'
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password
    if (username === "") {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
    if (password === "") {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }

    // Perform login if there are no errors
    if (username && password) {
      setLoading(true);
      await signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          let timerInterval
          Swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            didOpen: () => {
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result) {
              navigate("/");
            }
          })

        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              setError("please Signup first");
              break;
            case "auth/wrong-password":
              setError("check your password");
              break;
          }
        });
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {loading ? <div className="absolute z-50 w-full h-screen items-center justify-center flex opacity-50 bg-black">
        <ThreeCircles
          height="100"
          width="100"
          color="#03EFFF"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        /></div> :
        ""}
      <div className="bg-gradient-to-r from-green-300 to-purple-400 basis-4/5 md:flex hidden">
        <img src={pc} alt="pc element" className="h-3/5 absolute bottom-7" />
      </div>

      <div className="container mx-auto h-full flex md:basis-2/5 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <div
              className="m-4 md:p-10 p-6  space-y-6"
            ><div className="flex flex-col items-center ">
                <Link
                  to="/"
                  className="text-4xl font-bold uppercase flex dark:text-black flex-row"
                >
                  Cryp<h1 className="text-blue-500">stat</h1>
                </Link>
                <p className=" text-slate-900  text-center text-md ">
                  Welcome! Happy to see you back again.
                </p>
              </div>
              <p className=" text-slate-900 font-medium text-center text-lg uppercase">
                Login
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">Username</label>
                  <input
                    className={"w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white ${usernameError ? 'border-red-500' : ''}"}
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && (
                    <p className="text-red-500 text-xs mt-1">{usernameError}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
                  <input
                    className={"w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white ${passwordError ? 'border-red-500' : ''}"}
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
                  <Link to="/forgetPassword" className="text-blue-500 hover:text-blue-600 font-semibold" >Forgot Password?</Link>
                </div>
              </form>
              <p className="bg-red-100 block px-2 text-red-500">{error}</p>
            </div>

            <div className="pt-6 text-center">
              <p className="text-center text-lg font-light ">
                Don't have an account?
              </p>
              <Link
                to="/Register"
                className="text-blue-500 hover:bg-blue-50 mt-8 hover:text-blue-700 px-3 py-2 rounded-md md:text-base text-sm font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
