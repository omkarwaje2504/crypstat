import React from "react";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { db } from "../firebase";
import CryptoTransac from "./CryptoTransac";
import WalletTransac from "./WalletTransac";


const Transaction = (props) => {
	const userId = props.user
	const [pop, setPop] = useState(false);
	const [inputAmount, setInputAmount] = useState("");
	const [walletAmount, setWalletAmount] = useState("0");
	const [inputUpi, setInputUpi] = useState("");
	const [orderId, setOrderId] = useState("");
	const [walletError, setWalletError] = useState("");
	const [transac, setTransac] = useState(true);
	const today = new Date();
	const date = today.getDate();
	const month = today.getMonth() + 1; // January is 0
	const year = today.getFullYear();
	const hours = today.getHours();
	const minutes = today.getMinutes();
	const seconds = today.getSeconds();

	const handlePop = () => {
		setPop(!pop);
	}
	useEffect(() => {
		if (userId) {
			onValue(ref(db, `users/${userId}/transactions/walletAmount`), (snapshot) => {
				if (snapshot && snapshot.val()) {
					setWalletAmount(snapshot.val().amount)
				}
				else { }
			});
		}
		const generateOrderId = () => {
			const randomString = Math.random().toString(36).substr(2, 9);
			const timestamp = Date.now().toString(36).substr(2, 9);
			return randomString + timestamp;
		}
		const orderId = generateOrderId();
		setOrderId(orderId);

		setInputAmount("");
	}, []);

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
		var options = {
			key: "rzp_test_TixgzEzxWCouVt", // Enter the Key ID generated from the Dashboard
			name: "Dark_Coder Payment Gateway",
			currency: "INR",
			amount: inputAmount * 100,
			description: "Thankyou for your test donation",
			// image: logo,
			handler: function (response) {

				const currentAmount = parseInt(inputAmount) + parseInt(walletAmount);
				if (response.razorpay_payment_id && response.razorpay_payment_id !== '') {
					set(ref(db, "users/" + userId + "/transactions/walletAmount"
					),
						{
							amount: currentAmount,
						}
					);
					push(ref(db, "users/" + userId + "/transactions/"
					),
						{
							type: "wallet_add",
							razor_payment_id: response.razorpay_payment_id,
							amount: inputAmount,
							currency: "INR",
							purchased_at: date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds,
						}
					);
					setInputAmount("");
				}
				else {
				
				}

			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	const withdrawPayment = async (e) => {
		setWalletError(null)
		e.preventDefault();
		if (inputAmount && inputUpi) {
			if (inputAmount < walletAmount) {
				const currentAmount = parseInt(walletAmount) - parseInt(inputAmount);
				set(ref(db, "users/" + userId + "/transactions/walletAmount"),
					{
						amount: currentAmount,
					}
				);
				push(ref(db, "users/" + userId + "/transactions/"
				),
					{
						type: "wallet_withdraw",
						upiId: inputUpi,
						razor_payment_id: orderId,
						amount: inputAmount,
						currency: "INR",
						purchased_at: date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds,
					}
				);
				setWalletError("Amount is being tranfer too your account");
			}
			else {
				setWalletError("Enter the lower amount to withdraw")
			}
		}
		else {
			setWalletError("Enter the required detail to proceed")

		}
	}



	return (
		<div className="container p-2 mx-auto sm:p-4 w-full h-screen text-slate-700">
			<div>
				<div className="container mx-auto py-6 sm:px-6 lg:px-8">
					<h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
						My Wallet
					</h1>
				</div>
				<div className="container mx-auto pb-6 sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
						<div className="p-6 sm:px-20 bg-white flex items-center flex-row justify-between border-b border-gray-200">
							<div className="flex flex-col">
								<h2 className="md:text-2xl text-lg font-semibold text-gray-700 mb-2">
									CryptoWallet Id
								</h2>
								<p className="text-gray-500 text-xs">
									{props.user}
								</p>
							</div>
							<div className="flex flex-col mt-4 justify-center items-center">
								<h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
									Balance
								</h2>

								<p className="text-xl md:text-3xl text-blue-500 font-bold">{!walletAmount ? "" : walletAmount}</p>
							</div>
						</div>
						<div className="bg-blue-50 px-6 py-4 sm:px-20 sm:py-6">
							<div className="flex flex-row items-center space-x-6 md:justify-start justify-center">
								{/* Add money button */}
								<Popup
									trigger={(open) => (
										<button
											className="bg-green-500 text-sm md:text-lg hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full "
											type="button"
											onClick={handlePop}
										>
											Add Funds
										</button>
									)}
									position="bottom"
								>
									<div className="bg-white p-4 drop-shadow-lg space-y-6 text-center text-lg ">
										<h1 className="text-xl font-semibold">Enter the <span className="text-red-500">Amount</span> to proceed</h1>
										<div className="space-x-3"><label>
											Amount :
										</label>
											<input type="number" onChange={(e) => { setInputAmount(e.target.value) }} className=" px-5 py-1 text-gray-700 bg-gray-100 rounded border focus:outline-blue-500 focus:bg-white" /></div>
										<button type="button" onClick={makePayment} className="bg-green-500 md:text-sm text-xs hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ">Add Money</button>
									</div>
								</Popup>
								{/* withdraw money button */}
								<Popup
									trigger={(open) => (
										<button
											className="bg-blue-500 hover:bg-blue-600 text-sm md:text-lg text-white font-bold py-2 px-4 rounded-full "
											type="button"
											onClick={handlePop}
										>
											Withdraw Funds
										</button>
									)}
									position="bottom"
								>
									<div className="bg-white p-6 px-12 drop-shadow-lg space-y-6 text-center text-lg ">
										<div><h1 className="text-xl font-semibold">Enter the <span className="text-red-500">Amount</span> to proceed</h1>
											<p className="text-red-500 text-sm bg-red-50 mt-4 py-2">Only upi payment is available</p> </div>
										<div className=" space-y-1 flex flex-col text-left text-base"><label>
											Amount :
										</label>
											<input type="number" onChange={(e) => { setInputAmount(e.target.value) }} className=" px-5 py-1 text-gray-700 bg-gray-100 rounded border focus:outline-blue-500 focus:bg-white" />
											<label>
												Upi Id :
											</label>
											<input type="text" onChange={(e) => { setInputUpi(e.target.value) }} className=" px-5 py-1 text-gray-700 bg-gray-100 rounded border focus:outline-blue-500 focus:bg-white" />
										</div>
										<p className="text-red-500 text-sm">{walletError}</p>
										<button type="button" onClick={withdrawPayment} className="bg-green-500 text-sm hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ">Withdraw Money</button>
									</div>
								</Popup>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-4 container mx-auto">
				<div className="space-x-4 items-center flex md:justify-start justify-center">
					<button onClick={() => { setTransac(true) }} className="mb-4 transac text-sm md:text-xl font-semibold leading-tight drop-shadow-xs border-b-2  hover:bg-blue-50 bg-white px-4 py-2 rounded-xl">Crypto Transaction</button>
					<button onClick={() => { setTransac(false) }} className="mb-4 text-sm md:text-xl font-semibold leading-tight drop-shadow-xs border-b-2  hover:bg-blue-50 bg-white px-4 py-2 rounded-xl">Wallet Transaction</button>
				</div>
				<hr className="my-4 border-1 border-gray-500" />
				{transac ? <CryptoTransac /> : < WalletTransac />}
			</div>
		</div>
	)
}
export default Transaction;