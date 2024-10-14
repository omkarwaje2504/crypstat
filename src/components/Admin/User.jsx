import React from "react";

const User = ({ user, onBackClick }) => {

  const userRows = [];
  if(user.transactions){
  for (const [key, trans] of Object.entries(user.transactions)) {
    if(trans.type && trans){
    if (trans.type === "sell" || trans.type === "purchase") {
      const tdClassName = trans.type === "sell" ? "bg-green-200" : trans.type === "purchase" ? "bg-red-200" : "" ;
      userRows.push(
        <tr className="text-gray-700 " key={key ? key : ""}>
          <td className="px-4 py-4 text-md border-b"><h1 className={`${tdClassName} font-semibold w-fit px-4 py-1 rounded-md`}>{trans.type ? trans.type : ""}</h1></td>
          <td className="px-4 py-4 text-md border-b">{trans.type === "sell" ? trans.razor_order_id : trans.razor_payment_id ? trans.razor_payment_id : ""}</td>
          <td className="px-4 py-4 text-md border-b "><div className="flex space-x-4 items-center capitalize font-bold"><img className="w-10 h-10" src={trans.image ? trans.image : ""} alt=""></img><h1>{trans.coin ? trans.coin :""}</h1></div></td>
          <td className="px-4 py-4 text-md border-b">{trans.purchased_at ? trans.purchased_at : ""}</td>
          <td className="px-4 py-4 text-md border-b">{trans.amount ? trans.amount :""}</td>
          <td className="px-4 py-4 text-md border-b">{trans.quantity ? trans.quantity : ""}</td>
        </tr>
      );
    }
  }
  else{}
  }
}

  return (
    <div className="w-full space-y-6">
      <button className="py-4 font-medium text-blue-900 text-md underline" onClick={onBackClick}>Back to User Table</button>
      <div className="w-full">
        <div className="flex w-full">   
          <div className="w-2/12 border space-y-4 p-4 rounded-lg capitalize items-center justify-center flex flex-col">
            <img src={user.profile.imageUrl ? user.profile.imageUrl : ""} alt="user" className="w-32 h-32 rounded-full object-cover " />
            <h1 className="text-xl font-bold">{user.profile.firstName ? user.profile.firstName : ""} {user.profile.lastName ? user.profile.lastName : ""}</h1>
          </div>
          <div className="px-8 w-full">
            <div>
              <p className="font-semibold text-md text-slate-500">Contact details</p>
              <hr />
              <div className="flex flex-row justify-between pt-2 pb-4">
                <h1 className="font-semibold text-md text-slate-800">Contact No. : <span className=" font-medium text-slate-600">{user.profile.contact ? user.profile.contact : ""}</span></h1>
                <h1 className="font-semibold text-md text-slate-800">Email Id. : <span className=" font-medium text-slate-600">{user.profile.emailId ? user.profile.emailId : ""}</span></h1>
              </div>
            </div>
            <div className="">
              <p className="font-semibold text-md text-slate-500">General details</p>
              <hr />
              <div className="grid grid-cols-3 gap-2 pt-2 pb-4">
                <h1 className="font-semibold text-md text-slate-800">Gender : <span className=" font-medium text-slate-600">{user.profile.gender ? user.profile.gender : ""}</span></h1>
                <h1 className="font-semibold text-md text-slate-800">Birthdate : <span className=" font-medium text-slate-600">{user.profile.birthdate ? user.profile.birthdate : ""}</span></h1>
                <h1 className="font-semibold text-md text-slate-800">State : <span className=" font-medium text-slate-600">{user.profile.state ? user.profile.state : ""}</span></h1>
                <h1 className="font-semibold text-md text-slate-800">City : <span className=" font-medium text-slate-600">{user.profile.city ? user.profile.city : ""}</span></h1>
                <h1 className="font-semibold text-md text-slate-800">Address : <span className=" font-medium text-slate-600">{user.profile.address ? user.profile.address : ""}</span></h1>
                <h1 className="font-semibold text-md text-slate-800">Pincode : <span className=" font-medium text-slate-600">{user.profile.pincode ? user.profile.pincode : ""}</span></h1>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <p className="font-semibold text-slate-700 text-lg pb-2">Transactions</p>
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
      </div>
    </div>
  );
}

export default User;
