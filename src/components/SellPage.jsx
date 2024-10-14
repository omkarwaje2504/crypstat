import React from "react";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { ref, set, push, update, onValue } from "firebase/database";
import logo from "../assets/logo.png";

const SellPage = (props) => {
  const [userId, setUserId] = useState("");
  const [quantityConvert, setQuantityConvert] = useState("");
  const [amountConvert, setAmountConvert] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [walletAmount, setWalletAmount] = useState("0");
  const [selectedOption, setSelectedOption] = useState("quantity");
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState(null);
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // January is 0
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  var type = props.cryptoId;
  var price = props.price;
  var img = props.image;



  const option = ['bitcoin', 'cardano', 'avalanche-2', 'binancecoin', 'decentraland', 'dogecoin', 'ethereum', 'ripple', 'solana', 'tether'];

  // auth data for userID
  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
      }
    });
  }, []);
  // firebase database data fetching of current available quantity and update to CurrentAmount and wallet amount to walletAmount
  useEffect(() => {
    const interval = setInterval(() => {
      onValue(ref(db, `users/${userId}/coins/${type}`), (snapshot) => {
        if (snapshot && snapshot.val() && snapshot.val().quantity > 0) {
          setAvailableQuantity(snapshot.val().quantity)
        } else {

        }
      })
      onValue(ref(db, `users/${userId}/transactions/walletAmount`), (snapshot) => {
        if (snapshot && snapshot.val() && snapshot.val().amount > 0) {
          setWalletAmount(snapshot.val().amount)
        } else {

        }
      });
    }, 100);


  })
  // input feild amount to quantity changes vise versa and update to amount and quantity
  useEffect(() => {
    var data1 = quantityConvert * price;
    setAmount(data1);

    var data2 = amountConvert / price;
    setQuantity(data2);
  });
  // option change controller
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // orderID generator
  useEffect(() => {
    const generateOrderId = () => {
      const randomString = Math.random().toString(36).substr(2, 9);
      const timestamp = Date.now().toString(36).substr(2, 9);
      return randomString + timestamp;
    }
    const orderId = generateOrderId();
    setOrderId(orderId);
  }, [])

  const makePayment = async (e) => {
    e.preventDefault();
    let cAmount;
    {
      selectedOption === "quantity"
        ? (cAmount = amount)
        : selectedOption === "amount"
          ? (cAmount = amountConvert)
          : "";
    }
    let cquantity;
    {
      selectedOption === "quantity"
        ? (cquantity = quantityConvert)
        : selectedOption === "amount"
          ? (cquantity = quantity)
          : "";
    }

    let quantityupdate;
    let walletUpdate;
    walletUpdate = parseInt(walletAmount) + parseInt(cAmount)
    quantityupdate = parseInt(availableQuantity) - parseInt(cquantity)
    if (quantityConvert || amountConvert) {
      if (cquantity < availableQuantity) {
        try {
          update(ref(db, "users/" + userId + "/coins/" + type), {
            quantity: quantityupdate,
          });

          push(ref(db, "users/" + userId + "/transactions"),
            {
              type: "sell",
              razor_order_id: orderId,
              amount: cAmount,
              currency: "INR",
              coin: type,
              image:img,
              quantity: cquantity,
              purchased_at: date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds,
            }
          );
          set(ref(db, "users/" + userId + "/transactions/walletAmount"),
            {
              amount: walletUpdate,
            }
          );
          // set(ref(db, "users/" + userId + "/walletTransaction/" + orderId),
          //   {
          //     amount: cAmount,
          //     particular: `${type} sell`,
          //     date: date + "/" + month + "/" + year,
          //     time: hours + "-" + minutes + "-" + seconds,
          //     status: "Credited"
          //   }
          // );
        } catch (error) {
          setError(error);
        }
        window.location.reload();
      } else {
        setError("Quantity exceed. Try with lower quantity.");
      }
    }
    else {
      setError("Enter the amount or quantity to proceed.");
    }
  };
  
  return (
    <div className=" bg-white border rounded-2xl p-4">
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto items-center text-center">
          <h1 className="text-3xl font-bold  text-gray-800 my-8 items-center justify-center">Sell Cryptocurrency</h1>
          <div className="bg-[#f7f7f7] rounded-lg px-6 py-8  space-y-3">
            {/* Heading show the crypto name and price */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <img
                  src={img}
                  alt="Bitcoin"
                  className="w-8 h-8 mr-4"
                />
                <span className="font-semibold text-xl capitalize">{type}</span>
              </div>
              <div className="text-xl font-bold text-red-600">
                <CurrencyFormat
                  value={price}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="₹ "
                />
              </div>
            </div>
            <div className="flex flex-col text-lg font-semibold">
              <div className="text-blue-700 flex flex-row"><p className="text-black">Wallet :&nbsp;</p> {walletAmount}</div>
              <div className="text-blue-700 flex flex-row"><p className="text-black">AvailableQuantity :</p> {availableQuantity}</div>
            </div>
            <hr className="bg-black border border-black" />
            <div className="font-base space-y-6">
              <h1 className="text-lg font-medium">Select payment method</h1>
              <div className="flex items-center justify-between space-x-6 mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="quantity"
                    checked={selectedOption === "quantity"}
                    onChange={handleOptionChange}
                    className="form-radio h-5 w-5 text-gray-600"
                  />
                  <span className="ml-2 text-gray-700">Sell using Quantity</span>
                </label>
                <div className="flex items-center space-x-2">
                  {selectedOption === "amount" ? (
                    <input
                      type="number"
                      className=" px-5 border-2 border-slate-500 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                      placeholder=""
                      value={quantity ? quantity : ""}
                      disabled={selectedOption === "amount"}
                    />
                  ) : (
                    <input
                      type="number"
                      className="w-full px-5 border-2 border-slate-500 py-1 text-gray-700 bg-gray-50 rounded focus:outline-blue-500 focus:bg-white"
                      placeholder=""
                      onChange={(event) => {
                        setQuantityConvert(event.target.value);
                      }}
                      disabled={selectedOption === "amount"}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="amount"
                    checked={selectedOption === "amount"}
                    onChange={handleOptionChange}
                    className="form-radio h-5 w-5 text-gray-600"
                  />
                  <span className="ml-2 text-gray-700">Sell using Amount</span>
                </label>
                <div className="flex items-center space-x-2">
                  <span>₹</span>
                  {selectedOption === "quantity" ? (
                    <input
                      type="number"
                      className="w-full px-5 border-2 border-slate-500 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                      placeholder=""
                      value={amount ? amount : ""}
                      onChange={(event) => {
                        setAmountConvert(event.target.value);
                      }}
                      disabled={selectedOption === "quantity"}
                    />
                  ) : (
                    <input
                      type="number"
                      className="w-full px-5 border-2 border-slate-500 py-1 text-gray-700 bg-gray-50 rounded focus:outline-blue-500 focus:bg-white"
                      placeholder=""
                      onChange={(event) => {
                        setAmountConvert(event.target.value);
                      }}
                      disabled={selectedOption === "quantity"}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col space-y-2">
              <p className="capitalize text-md text-red-500 ">{error}</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={makePayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellPage;
