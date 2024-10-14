// import React, { Component, useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import Popup from "reactjs-popup";
import BuySellPage from "./BuySellPage";
import SellPage from "./SellPage";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

const CardSection = (props) => {
  var userId = props.user;
  const [image,setImage] = useState("https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579")
  const [sellControl, setSellControl] = useState(false);
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " Thousand";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " Milloins";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " Billions";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + " Trillions";
  };

  useEffect(() => {

    onValue(ref(db, `users/${userId}/coins/${props.coinName}`), (snapshot) => {
      if (snapshot && snapshot.val()) {
        if (snapshot.val().quantity === 0) {
          setSellControl(false)
        }
        else {
          setSellControl(true)
        }

      } else {
        setSellControl(false)
      }
    })
  }, [props.coinName])

  const images = [
    "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
    "https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860",
    "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
    "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850",
    "https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png?1550108745",
    "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
    "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
    "https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422",
    "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
  ];

  useEffect(() => {
    switch (props.coinName) {
      case "bitcoin":
        setImage("https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579")
        break;
      case "cardano":
        setImage("https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860")
        break;
      case "avalanche-2":
        setImage( "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574")
        break;
      case "binancecoin":
        setImage("https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850")
        break;
      case "decentraland":
        setImage( "https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png?1550108745")
        break;
      case "dogecoin":
        setImage("https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256")
        break;
        case "ethereum":
        setImage("https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880")
        break;
        case "ripple":
        setImage("https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731")
        break;
        case "solana":
        setImage("https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422")
        break;
        case "tether":
          setImage("https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663")
          break;


      default:
        break;
    }

  });


  return (
    <div className="w-full mx-auto container">
      <div className="items-center justify-center space-y-4 md:space-y-0 space-x-6 p-2 w-full capitalize flex flex-wrap px-6">
        <div className="items-center flex-row justify-self-center flex text-blue-800  text-2xl font-bold">
          <div className="text-red-500 flex items-center ">
            <img src={image} alt="coinImg" /> &nbsp;{props.coinName}{" "}
            &nbsp;
          </div>
          <CurrencyFormat
            value={props.currentPrice}
            displayType="text"
            thousandSeparator={true}
            prefix="₹ "
          />
        </div>
        {/* buy and sell dailogue box */}
        <div className="space-x-4 text-md flex flex-row">
          <Popup
            trigger={(open) => (
              <button
                className="bg-red-500 text-white py-2 hover:bg-red-600 px-6 rounded "
                type="button"
                onClick={props.buy}
              >
                Buy
              </button>
            )}
            position="bottom"
          >
            <div>{<BuySellPage cryptoId={props.coinName} price={props.currentPrice} image={image}/>}</div>
          </Popup>
          {sellControl ? <Popup
            trigger={(open) => (
              <button
                className="bg-green-500 text-white py-2 hover:bg-green-600 px-6 rounded "
                type="button"
                onClick={props.sell}
              >
                Sell
              </button>
            )}
            position="bottom"
          >
            <div>{<SellPage cryptoId={props.coinName} price={props.currentPrice} image={image} />}</div>
          </Popup> : ""}

        </div>
      </div>
      <section className="grid md:grid-cols-6 grid-cols-2 gap-2 justify-between p-4">
        
        <div className=" bg-white shadow-sm border md:px-4 px-2 rounded-lg text-center text-slate-900 font-semibold  py-1">
          <div className="text-md">
            <h6 className="font-base">Market Cap 24Hrs</h6>
            <p className="font-base text-md text-blue-800 ">
              {props.mCap24} %
            </p>
          </div>
        </div>

        <div className=" bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <div className="text-md">
            <h6 className="font-base">All Time High</h6>
            <p className="font-base text-md text-blue-800 ">
              <CurrencyFormat
                value={props.ath}
                displayType="text"
                thousandSeparator={true}
                prefix="₹ "
              />
            </p>
          </div>
        </div>

        <div className=" bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <div className="text-md">
            <h6 className="font-base">All Time Low</h6>
            <p className="font-base text-md text-blue-800 ">
              <CurrencyFormat
                value={props.atl}
                displayType="text"
                thousandSeparator={true}
                prefix="₹ "
              />
            </p>
          </div>
        </div>

        <div className=" bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <div className="text-md">
            <h6 className="font-base">Positive Sentiments </h6>
            <p className="font-base text-md text-blue-800 ">
              {props.sentiment} %
            </p>
          </div>
        </div>

        <div className=" bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <div className="text-md">
            <h6 className="font-base"> High 24Hrs </h6>
            <p className="font-base text-md text-green-500">
              <CurrencyFormat
                value={props.high24}
                displayType="text"
                thousandSeparator={true}
                prefix="₹ "
              />
            </p>
          </div>
        </div>

        <div className=" bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <div className="text-md">
            <h6 className="font-base"> Low 24Hrs </h6>
            <p className="font-base text-md text-red-500">
              <CurrencyFormat
                value={props.low24}
                displayType="text"
                thousandSeparator={true}
                prefix="₹ "
              />
            </p>
          </div>
        </div>

        <div className="bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <h6 className="text-md"> Market Cap </h6>
          <p className=" font-base text-md text-blue-800 ">
            <CurrencyFormat
              value={props.MarketCap}
              displayType="text"
              thousandSeparator={true}
              prefix="₹ "
            />
          </p>
        </div>

        <div className="bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <h6 className="text-md"> Total Volume </h6>
          <p className=" font-base text-md text-blue-800 ">
            {formatCash(props.TotVol)}

          </p>
        </div>

        <div className="bg-white shadow-sm border md:px-4 rounded-lg px-2 text-center text-slate-900 font-semibold  py-1">
          <h6 className="text-md"> Circulating Supply</h6>
          <p className=" font-base text-md text-blue-800 ">
            {formatCash(props.Circulating)}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CardSection;
