import React from "react";
import pc from "../assets/pc.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onValue, ref } from "firebase/database";
import shield from "../assets/shield.png";
import transac from "../assets/transac.png";
import design from "../assets/design.png";

const Home = (props) => {
  const [name, setName] = useState("")

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, "users/" + user.uid + "/profile"), (snapshot) => {
          if (snapshot.exists()) {
            setName(snapshot.val().name);
          }
          else {
            setName("user")
          }
        });
      }
    })
  }, [name])
  return (
    <div className="bg-gradient-to-r from-teal-300 to-yellow-100 h-screen text-white">

      {/* Hero section */}
      <section className="2xl:pt-52 md:pt-40 pt-28 md:px-32 px-6 2xl:px-0 h-screen md:h-[90vh] 2xl:h-[80vh] relative overflow-hidden mx-auto items-left flex flex-col container">
        <p className="text-gray-900 md:text-lg">Dark_Coder</p>
        <div className="md:text-6xl text-5xl  font-bold flex flex-wrap mb-5  bg-gradient-to-r w-fit from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">Welcome to&nbsp;<div
          className=" flex text-slate-800 flex-row"
        >Cryp<h1 className="text-blue-500">stat</h1>
        </div></div>
        <p className="md:text-lg mb-4 text-slate-800 md:mb-10 ">
          Be the super hero of the crypto world. Get market price, market caps
        </p>
        {props.user ? <Link to="dashboard" className="bg-blue-500 text-xl w-fit py-3 px-6 rounded-full hover:bg-yellow-600">
          Dashboard
        </Link> : <Link to="login" className="bg-blue-500 w-fit py-2 px-4 rounded-full hover:bg-yellow-600">
          Join Us
        </Link>}

        <img src={pc} alt="image" className="2xl:w-2/3 md:w-3/5 w-full absolute md:right-12 2xl:right-0 bottom-0 mx-auto -z-48" />
      </section>

      {/* Features section */}
      <section className="bg-indigo-50 py-20 text-slate-800">
        <div className="container mx-auto md:px-32 px-6 2xl:px-0">
          <div className="text-4xl flex text-slate-900 font-bold mb-20">Why&nbsp;<p
            className=" flex  flex-row"
          >Cryp<h1 className="text-blue-500">stat</h1>
          </p>&nbsp;?</div>
          <div className="grid md:grid-row-0 md:grid-cols-3 md:gap-20 items-center space-y-12 md:space-y-0">
            <div className="flex flex-col items-center">
              <img src={shield} alt="shield" className="w-32 2xl:w-48 mb-6" />
              <div className="text-xl font-bold mb-3">Secure</div>
              <div className="2xl:text-lg text-sm text-center">
                We’ve left no stone unturned to make Crypstat India’s most secure exchange. We’re investing in regular security audits to ensure a highly secured trading platform for India.
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={transac} alt="transac" className="w-32 2xl:w-48 mb-6" />
              <div className="text-xl font-bold mb-3">Fast Transaction</div>
              <div className="2xl:text-lg text-sm text-center">
                CrypStat can handle Millions of transactions. Our system infrastructure can scale up in a few seconds to match surging demand.
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={design} alt="design" className="w-32 2xl:w-48 mb-6" />
              <div className="text-xl font-bold mb-3">Simple and Efficient design</div>
              <div className="2xl:text-lg text-sm text-center">
                Trading on the CrypStat platform is a super fast experience you’ll fall in love with!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <footer className="bg-gray-900 text-white md:px-32 px-6 py-3 2xl:px-0">
        <div className="container mx-auto flex flex-col md:flex-row space-y-2 justify-between items-center">
          <p className="text-sm">&copy; 2023 Dark Coder</p>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-500">About</a></li>
            <li><a href="#" className="hover:text-gray-500">Contact</a></li>
            <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
export default Home;
