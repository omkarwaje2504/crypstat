import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword, signOut
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const UpdatePass = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    setError("");
    setConfirmPass("");
    event.preventDefault();
    if (newPassword === confirmPassword) {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        password
      )
      const result = reauthenticateWithCredential(
        user,
        credential
      )

      result.then(() => {
        return updatePassword(user, newPassword);
      })
        .then(() => {
          setPassword("");
          setNewPassword("");
          setError(null);
          setConfirmPass("Password changed successfully!");
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              navigate("/login")
            })
            .catch((error) => {
              // An error happened.
            });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/internal-error":
              setError("please enter old password");
              break;
            case "auth/wrong-password":
              setError("check your previous password");
              break;
          }
        });
    } else {
      setConfirmPass("Password & confirm password do not match");
    }
  };


  return (
    <div class="flex flex-col justify-center ">
      <div class="flex justify-center mx-auto md:w-2/3 my-8 md:mt-20 px-6 ">
        <div class="w-full lg:w-1/2 bg-white p-5 border rounded-lg lg:rounded-l-none">
          <div class="px-8 mb-12 text-center">
            <h3 class="pt-4 mb-2 text-blue-500 text-2xl">Change Your Password?</h3>
            <p class="mb-4 text-md text-gray-700">
              We get it, stuff happens. Just enter your detail below and we'll update your password!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full my-4 space-y-4 ">
            <div className="mt-2">
              <h1 className="block text-gray-700 font-semibold mb-2">Old password</h1>
              <input
                type="text"
                placeholder="Old Password"
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-8 py-3 text-gray-700  border border-gray-200  rounded-full focus:outline-blue-500 focus:bg-white"
              />
            </div>
            {error ? <h1>{error}</h1> : ""}
            <div className="mt-2">
              <h1 className="block text-gray-700 font-semibold mb-2">New password</h1>
              <input
                type="password"
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter new Password"
                className="w-full px-8 py-3 text-gray-700  border border-gray-200  rounded-full focus:outline-blue-500 focus:bg-white"
              />
            </div>
            <div className="my-2">
              <h1 className="block text-gray-700 font-semibold mb-2">
                Confirm Password
              </h1>
              <input
                type="password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                className="w-full px-8 py-3 text-gray-700  border border-gray-200  rounded-full focus:outline-blue-500 focus:bg-white"
              />
            </div>
            <h1 className="text-red-500 font-semibold text-md">{confirmPass}</h1>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-fit text-white font-semibold py-2 px-5 rounded-full"
            >
              {" "}
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default UpdatePass;
