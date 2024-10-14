import React, { useState, useEffect } from "react";
import User from "./User";
import { onValue, ref } from "firebase/database";
import { db} from "../firebase";


function Transac() {

  const [userData, setUserData] = useState([]);


  useEffect(() => {
    onValue(ref(db, `users/`), (snapshot) => {
      if (snapshot && snapshot.val()) {
        setUserData(snapshot.val());
      }
      else { }
    });
  }, []);

 

  const userRows = [];
  for (const [key, trans] of Object.entries(userData)) {
    if(trans.transactions){ 
        for (const [key, val] of Object.entries(trans.transactions)) {
    if (val.type === "sell" || val.type === "purchase") {
        
      const tdClassName = val.type === "sell" ? "bg-green-200" : val.type === "purchase" ? "bg-red-200" : "" ;
      userRows.push(
        <tr className="text-gray-700 " key={key ? key : ""}>
          <td className="px-4 py-4 text-md border-b"><h1 className={`${tdClassName} font-semibold w-fit px-4 py-1 rounded-md`}>{val.type ? val.type : ""}</h1></td>
          <td className="px-4 py-4 text-md border-b">{val.type === "sell" ? val.razor_order_id : val.razor_payment_id ? val.razor_payment_id : ""}</td>
          <td className="px-4 py-4 text-md border-b "><div className="flex space-x-4 items-center capitalize font-bold"><img className="w-10 h-10" src={val.image ? val.image : ""} alt=""></img><h1>{val.coin ? val.coin :""}</h1></div></td>
          <td className="px-4 py-4 text-md border-b">{val.purchased_at ? val.purchased_at : ""}</td>
          <td className="px-4 py-4 text-md border-b">{val.amount ? val.amount :""}</td>
          <td className="px-4 py-4 text-md border-b">{val.quantity ? val.quantity : ""}</td>
        </tr>
      );
    }
}
  }
  else{}
  }

  return (
    <div>
<table className="w-full">
            <thead>
            <tr className="text-sm shadow-md  text-left text-slate-700 bg-blue-100 uppercase">
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Transaction Id</th>
                <th className="px-4 py-3">Coin Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Quantity</th>
              </tr>
            </thead>
            <tbody className="">
              {userRows}
            </tbody>
          </table>
    </div>
  );
}

export default Transac;
