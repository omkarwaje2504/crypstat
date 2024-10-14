import { useState } from "react";
// import { Link, } from "react-router-dom";
// import { ref, set } from "firebase/database";
// import { db, storage } from "./firebase";
import ProfileDetail from "./profilepage/ProfileDetail";
import UpdatePass from "./profilepage/UpdatePass";
import { useContext } from "react";
import { UserContext } from "../App";
import Transaction from "./profilepage/Transaction";


const Profile = () => {
  const value = useContext(UserContext).userId;
  const [data, setData] = useState(<ProfileDetail />);

  const changeData = (index) => {
    if (index == 0) {
      setData(<ProfileDetail />);
    }
    if (index == 1) {
      setData(<UpdatePass />);
    }
    if (index == 2) {
      setData(<Transaction user={value} />);
    }
  };

  return (
    <section className="grid  md:grid-cols-7 mt-0">
      <aside className="self-start md:sticky top-0 md:flex md:h-screen md:col-spans-2  shadow-sm border text-slate-900 bg-white ">
        <div className="space-y-6 pt-20 pl-4 md:pt-24 w-full">
          <ul className="capitalize  text-xs items-center md:text-base flex md:block font-semibold md:space-y-2 pb-3 md:pb-0 justify-center md:text-left text-center md:space-x-0 space-x-8">
            <li
              onClick={() => changeData(0)}
              className=" capitalize items-center py-2 md:pl-6 hover:bg-gray-100 flex  hover:cursor-pointer"
            ><img src="https://img.icons8.com/ios-filled/50/null/gender-neutral-user.png" className="w-10 pr-3" />
              personal Detail
            </li>
            <li
              onClick={() => changeData(1)}
              className=" capitalize items-center py-2 md:pl-6 hover:bg-gray-100 flex  hover:cursor-pointer"
            ><img src="https://img.icons8.com/ios-filled/50/null/re-enter-pincode.png" className="w-10 pr-3" />
              Password Update
            </li>
            <li
              onClick={() => changeData(2)}
              className=" capitalize items-center py-2 md:pl-6 hover:bg-gray-100 flex  hover:cursor-pointer"
            ><img src="https://img.icons8.com/ios-filled/50/null/split-transaction.png" className="w-10 pr-3" />
              Transaction Details
            </li>
          </ul>
        </div>
      </aside>
      <main className="md:col-span-6 md:pt-24  overflow-y-scroll no-scrollbar">
        {data}
      </main>
    </section>
  );
};
export default Profile;
