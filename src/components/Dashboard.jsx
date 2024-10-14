import React, { useState, useEffect } from 'react';
import CardSection from "./CardSection";
import ChartSection from "./ChartSection";

const Dashboard = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [coinId, setCoinId] = useState("bitcoin");
  const [selectedOption, setSelectedOption] = useState('');
  const [coinData, setCoinData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response.json();
      setCoinData(data);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [coinId]);

  const handleClick2 = (item) => {
    setSelectedOption(item);
    setCoinId(item)
  };

  const option = [
    "bitcoin",
    "cardano",
    "avalanche-2",
    "binancecoin",
    "decentraland",
    "dogecoin",
    "ethereum",
    "ripple",
    "solana",
    "tether",
  ];
  const color = ["text-yellow-500", "text-blue-700", "text-red-700", "text-yellow-700", "text-red-700", "text-yellow-700", "text-indigo-700", "text-gray-700", "text-purple-700", "text-green-700",];
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

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="grid md:grid-cols-7 h-screen bg-gray-50 ">
      {/* menu icon */}
      <button className=" absolute top-20 left-2 bg-white  text-gray-900 rounded-lg shadow-sm z-50 w-10 h-10 md:hidden flex justify-center items-center focus:outline-none" onClick={toggleSidebar}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* sidebar */}
      <div onClick={() => setShowSidebar(!showSidebar)} className={`bg-black absolute h-screen opacity-20 z-10 w-full top-0 md:hidden ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}></div>
      <div className={`self-start top-0 absolute md:relative md:z-auto z-50 md:pt-20 md:flex md:flex-col bg-white border h-screen md:col-spans-1   text-gray-800 transition-all duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>

        <h1 className="text-xl font-bold place-self-start text-slate-800 p-4">Coins</h1>
        <ul className="capitalize pl-8 pr-12 text-base font-semibold space-y-1">
          {option.map((item, index) => {
            let im = images[index];
            let col = selectedOption === item ? color[index] : '';
            return (
              <li
                key={index}
                onClick={() => { handleClick2(item)}}
                className={` py-2  hover:cursor-pointer ${col}`}
              >
                <img src={im} alt="*" className="w-6 h-6 inline-block mr-2" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      {/* content */}
      <div className=" pt-28  md:pt-20 md:col-span-6 overflow-y-scroll no-scrollbar">
        <main className="">
          <CardSection
            user={props.user}
            coinName={coinId}
            currentPrice={
              coinData.market_data
                ? coinData.market_data.current_price["inr"]
                : ""
            }
            mCap24={
              coinData.market_data
                ? coinData.market_data.market_cap_change_percentage_24h
                : ""
            }
            ath={coinData.market_data ? coinData.market_data.ath.inr : ""}
            atl={coinData.market_data ? coinData.market_data.atl.inr : ""}
            sentiment={coinData.sentiment_votes_up_percentage}
            high24={
              coinData.market_data ? coinData.market_data.high_24h["inr"] : ""
            }
            low24={
              coinData.market_data ? coinData.market_data.low_24h["inr"] : ""
            }
            TotVol={
              coinData.market_data ? coinData.market_data.total_volume.inr : ""
            }
            Circulating={
              coinData.market_data
                ? coinData.market_data["circulating_supply"]
                : ""
            }
            priceChange24={
              coinData.market_data
                ? coinData.market_data.price_change_24h_in_currency.inr
                : ""
            }
            MarketCap={
              coinData.market_data
                ? coinData.market_data.market_cap_change_percentage_24h
                : ""
            }
            buy={handleClick}
            open={isOpen}
          />

          <ChartSection Id={coinId} />
        </main>
      </div>


    </div>
  );
}

export default Dashboard;
