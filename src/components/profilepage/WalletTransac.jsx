import React, { useState, useEffect } from "react";
import { auth, db, } from "../firebase";
import { onValue, ref } from "firebase/database";

const WalletTransac = () => {
    const [transacId, setTransacId] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `users/${user.uid}/transactions/`), (snapshot) => {             
                    if(snapshot && snapshot.val()){
                    setTransacId(snapshot.val());
                
                    }
                    else{}
                });
            }
        });
    }, []);
    const transactionData = transacId;
    const transactionRows = Object.entries(transactionData).map(([key,values]) =>{
        if(values.type === "wallet_withdraw"){
            return (<tr className="border-b border-opacity-20 text-center border-gray-700 ">
            <td className="p-3  w-1/4">
                <p>{values ? values.razor_payment_id : ""}</p>
            </td>
            <td className="p-3 ">
                <p >{values.type ? values.type : ""}</p>
            </td>
            <td className="p-3 ">
                <p className="">{values.purchased_at ? values.purchased_at : ""}</p>
            </td>
            <td className="p-3 ">
                <p className="font-bold">Rs {values.amount ? values.amount : ""}</p>
            </td>
        </tr>)
        }
        if(values.type === "wallet_add"){
            return (<tr className="border-b border-opacity-20 text-center border-gray-700 ">
            <td className="p-3  w-1/4">
                <p>{values ? values.razor_payment_id : ""}</p>
            </td>
            <td className="p-3 ">
                <p >{values.type ? values.type : ""}</p>
            </td>
            <td className="p-3 ">
                <p className="">{values.purchased_at ? values.purchased_at : ""}</p>
            </td>
            <td className="p-3 ">
                <p className="font-bold">Rs {values.amount ? values.amount : ""}</p>
            </td>
        </tr>)
        }
    }  
    );
    
    return (
        <div className="overflow-y-auto h-1/2">
            <table className="w-full">
                <thead className="bg-blue-200">
                    <tr className="text-base">
                        <th className="p-3 w-1/4">Transaction Id</th>
                        <th className="p-3 w-1/4">Particular</th>
                        <th className="p-3">Date</th>
                        <th className="p-3 ">Amount</th>
                    </tr>
                </thead>
                <tbody>
                {transactionRows}
                </tbody>
            </table>
        </div>
    )
}
export default WalletTransac