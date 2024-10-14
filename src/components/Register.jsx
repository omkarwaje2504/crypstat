import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { ref, update } from "firebase/database";
import pc from "../assets/pc.png";
import { ThreeCircles } from "react-loader-spinner";
import Swal from 'sweetalert2';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("password must be at least 8 characters");
    } else {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          update(ref(db, "users/" + user.uid + "/profile"), {
            firstName: name,
            emailId: email,
            lastName: "",
            birthdate: "",
            city: "",
            state: "",
            pincode: "",
            contact: "",
            address: "",
            gender: "",
          });
          Swal.fire({
            icon: 'success',
            title: 'Register Successfully',
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result) {
              navigate("/profile");
            }
          })
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setError("User already exist");
              break;
          }
        });
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      {loading ? (
        <div className="absolute z-50 w-full h-screen items-center justify-center flex opacity-50 bg-black">
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
          />
        </div>
      ) : (
        ""
      )}
      <div className="bg-gradient-to-r from-green-300 to-purple-400 basis-4/5 md:flex hidden">
        <img src={pc} alt="pc element" className="h-3/5 absolute bottom-7" />
      </div>

      <div className="container mx-auto h-full flex md:basis-2/5 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <div className="m-4 md:p-10 p-4  space-y-6">
              <div className="flex flex-col items-center ">
                <Link
                  to="/"
                  className="text-4xl font-bold uppercase flex dark:text-black flex-row"
                >
                  Cryp<h1 className="text-blue-500">stat</h1>
                </Link>
                <p className=" text-slate-900  text-center text-md ">
                  Get your Crypto Journey start eith us!
                </p>
              </div>
              <p className=" text-slate-900 font-medium text-center text-lg ">
                REGISTER
              </p>
              <form onSubmit={submit} className="w-full my-4 space-y-2">
                <div className=" space-y-1">
                  <label className="block  font-semibold text-gray-800">
                    Name
                  </label>
                  <input
                  pattern="^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$"
                    type="text"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                    required
                  />
                </div>
                <div className=" space-y-1">
                  <label className="block  font-semibold text-gray-800">
                    E-mail
                  </label>
                  <input
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                    required
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <label className="block font-semibold text-gray-800">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div className="mt-4  flex flex-col ">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 w-fit text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    lets start
                  </button>{" "}
                  <p className="text-red-500 p-2">{error}</p>
                </div>
                <div className="pt-4 text-center">
                  <p className="text-center text-lg font-light ">
                    Already have an account?
                  </p>
                  <Link
                    to="/login"
                    className="text-blue-500 hover:bg-blue-50 mt-8 hover:text-blue-700 px-3 py-2 rounded-md md:text-base text-sm font-medium"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
