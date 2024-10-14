import React, { useState, useEffect } from "react";
import { auth, db, } from "../firebase";
import { onValue, ref } from "firebase/database";

const CryptoTransac=()=>{
    const [transacId, setTransacId] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `users/${user.uid}/transactions/`), (snapshot) => {
                    if (snapshot && snapshot.val()) {
                    setTransacId(snapshot.val());
                    }
                    else{}
                });
            }
        });
    }, []);
    const userRows = [];
    for (const [key, trans] of Object.entries(transacId)) {
        if (trans.type === "sell" || trans.type === "purchase") {
          const tdClassName = trans.type === "sell" ? "bg-green-200" : trans.type === "purchase" ? "bg-red-200" : "" ;
          userRows.push(
            <tr className="text-gray-700 " key={key}>
              <td className="px-4 py-4 text-md border-b"><h1 className={`${tdClassName} font-semibold w-fit px-4 py-1 rounded-md`}>{trans.type}</h1></td>
              <td className="px-4 py-4 text-md border-b">{trans.type === "sell" ? trans.razor_order_id : trans.razor_payment_id}</td>
              <td className="px-4 py-4 text-md border-b">{trans.coin}</td>
              <td className="px-4 py-4 text-md border-b">{trans.purchased_at}</td>
              <td className="px-4 py-4 text-md border-b">{trans.amount}</td>
              <td className="px-4 py-4 text-md border-b">{trans.quantity}</td>
            </tr>
          );
        }
      }
    return (
        <div className="overflow-y-auto h-1/2">
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
                <tbody className="text-sm">
                {userRows}
                </tbody>
            </table>
        </div>
    )
}
export default CryptoTransac