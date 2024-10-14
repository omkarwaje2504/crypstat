import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onValue, ref } from "firebase/database";

function AdminLogin() {
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    useEffect(() => {
        onValue(ref(db, `admin`), (snapshot) => {
            setUser(snapshot.val().username);
            setPass(snapshot.val().pass);

        })
    }, [])
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            if (email === user & password === pass) {
                window.location.href = "/admin/dashboard";
            }
            else{
                setError("Not a valid admin credentials")
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}

                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className=" w-full flex justify-center py-2 px-4 border  text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600  focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AdminLogin
