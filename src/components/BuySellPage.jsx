import React from "react";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { auth, db } from "./firebase";
import { ref, set, update, onValue, push } from "firebase/database";
import { ThreeCircles} from 'react-loader-spinner'

const BuySellPage = (props) => {
  const [userId, setUserId] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [walletAmount, setWalletAmount] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [quantityConvert, setQuantityConvert] = useState("");
  const [amountConvert, setAmountConvert] = useState("");
  const [selectedOption, setSelectedOption] = useState("quantity");
  const [loading, setLoading] = useState(false);
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

  // auth data for userID
  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
      }
    });
  }, []);
  // firebase database data fetching of current (..available quantity..) and update to AvailableQuantity and (..wallet amount..) to walletAmount
  useEffect(() => {
    setInterval(() => {
      setLoading(true)
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
      setLoading(false)
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

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async (e) => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
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
    let walletUpdate = parseInt(walletAmount) - parseInt(cAmount)
    let quantityupdate;
    quantityupdate = parseInt(cquantity) + parseInt(availableQuantity)
    if (quantityConvert || amountConvert) {
      if (cAmount < walletAmount) {
        try {
          var options = {
            key: "rzp_test_TixgzEzxWCouVt", // Enter the Key ID generated from the Dashboard
            name: "Dark_Coder Payment Gateway",
            currency: "INR",
            amount: cAmount * 100,
            order_id: "",
            description: "Thankyou for your test donation",
            image: img,
            handler: function (response) {
              if (response.razorpay_payment_id) {
                update(ref(db, "users/" + userId + "/coins/" + type), {
                  quantity: cquantity,
                });

                push(ref(db, "users/" + userId + "/transactions/"
                ),
                  {
                    type: "purchase",
                    razor_payment_id: response.razorpay_payment_id,
                    amount: cAmount,
                    currency: "INR",
                    image:img,
                    coin: type,
                    quantity: cquantity,
                    purchased_at: date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds,
                  }
                );
                set(ref(db, "users/" + userId + "/transactions/walletAmount"),
                  {
                    amount: walletUpdate,
                  }
                );

                window.location.reload();
                // Add logic for successful payment
              } else {
                // Add logic for failed payment or cancelled payment
              }
            },
          };
        } catch (error) {
          setError(error)
        }

      }
      else {
        setError("Add funds and then try again.");
      }
    }
    else {
      setError("Enter the amount or quantity to proceed.");
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  
  return (
    <div className=" bg-white border rounded-2xl p-4">
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto items-center text-center">
          <h1 className="text-3xl font-bold  text-gray-800 my-8 items-center justify-center">Buy Cryptocurrency</h1>
          <div className="bg-gray-50 shadow-sm rounded-lg px-6 py-8  space-y-3">
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
                  <span className="ml-2 text-gray-700">Buy using Quantity</span>
                </label>
                <div className="flex items-center space-x-2">
                  {selectedOption === "amount" ? (
                    <input
                      type="text"
                      className=" px-5 border-2 border-slate-500 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                      placeholder=""
                      value={quantity}
                      disabled={selectedOption === "amount"}
                    />
                  ) : (
                    <input
                      type="text"
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
                  <span className="ml-2 text-gray-700">Buy using Amount</span>
                </label>
                <div className="flex items-center space-x-2">
                  <span>₹</span>
                  {selectedOption === "quantity" ? (
                    <input
                      type="text"
                      className="w-full px-5 border-2 border-slate-500 py-1 text-gray-700 bg-gray-100 rounded focus:outline-blue-500 focus:bg-white"
                      placeholder=""
                      value={amount}
                      onChange={(event) => {
                        setAmountConvert(event.target.value);
                      }}
                      disabled={selectedOption === "quantity"}
                    />
                  ) : (
                    <input
                      type="text"
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
            <div className="flex justify-center">
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
    </div>
  );
}

export default BuySellPage;
