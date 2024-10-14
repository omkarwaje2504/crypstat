import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import CurrencyFormat from "react-currency-format";

const ChartSection = (props) => {
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
  };

  const [Price, setPrice] = useState({
    options: {
      chart: {
        id: "area-datetime",
        foreColor: "black",
      },
      grid: {
        show: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 10,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100]
        },
      },
      title: {
        text: "Market Price Analytics",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "red",
        },
      },
      stroke: {
        width: 1,
        curve: "straight",
      },
      xaxis: {
        type: "datetime", 
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return  formatCash((val).toFixed(0));
          },
      }
    },
      colors: ["#F8526F"],
      selection: 1825,
    },
    series: [
      {
        name: "Market Price",
        data: [1645837250522, 39804.53519937617],
      },
    ],
  });
  const [Market_Cap, setMarket_Cap] = useState({
    options: {
      chart: {
        foreColor: "black",
      },
      grid: {
        show: false,
        
      },
      title: {
        text: "Market Cap",
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "blue",
        },
      },
     
      stroke: {
        width: 1,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
      },
      noData: {
        text: 'Loading...'
      },
      dataLabels: {
        enabled: false,
      },
   
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 10,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [50, 100, 50]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return  formatCash((val).toFixed(0));
          },
          
      }},
      colors: ["blue"],
      tooltip: {
        y: {
          formatter: (value) => {
            return value.toFixed(0);
          },
        },
      },
    },  
    series: [
      {
        name: "Market Cap",
        data: [[1645837250522, 39804.53519937617]],
      },
    ],
  });
  const [Tot_Vol, setTot_Vol] = useState({
    options: {
      chart: {
        foreColor: "black",
      },
      grid: {
        show: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 10,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [50, 100, 50]
        },
      },
      title: {
        text: "Market Volume",
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "blue",
        },
      },
      stroke: {
        width: 1,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return  formatCash((val).toFixed(0));
          },
          
      }},
      colors: ["blue"],
      tooltip: {
        y: {
          formatter: (value) => {
            return value.toFixed(2);
          },
        },
      },
    },
    series: [
      {
        name: "Market Volume",
        data: [[1645837250522, 39804.53519937617]],
      },
    ],
  });
  const [width, setWidth] = useState(400);
  let prevId = props.Id;

  const fetchData = async () => {
    let chartData = await fetch("https://api.coingecko.com/api/v3/coins/" + props.Id + "/market_chart?vs_currency=inr&days=" +Price.options.selection);
    let jsonChartData = await chartData.json();
    setPrice({
      options: Price.options,
      series: [{ name: "Market Price", data: jsonChartData.prices }],
    });
    setMarket_Cap({
      options: Market_Cap.options,
      series: [{ name: "Market Cap", data: jsonChartData.market_caps }],
    });
    setTot_Vol({
      options: Tot_Vol.options,
      series: [{ name: "Total Volume", data: jsonChartData.total_volumes }],
    });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 1000);
    return () => clearInterval(interval);
  }, [props.Id]);

  useEffect(() => {
    if (prevId !== props.Id) {
      prevId = props.Id;
      fetchData();
    }

  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth;

      switch(true) {
        case windowWidth > 1200:
          newWidth = 400;
          break;
        case windowWidth > 768:
          newWidth = 300;
          break;
          case windowWidth > 300:
            newWidth = 200;     
            break;
        default:
          newWidth = 300;
          break;
      }

      setWidth(newWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mx-auto">
        <div className="w-full space-y-4 ">
          <div className="w-full p-4 ">
            <div
              id="chart"
              className=" border flex border-1 rounded-lg bg-white  md:p-6 py-3  inner-shadow-[0_35px_90px_-15px_rgba(250,0,200,0.25)]"
            >
              <Chart
                className="w-full"
                options={Price.options}
                series={Price.series}
                type="area"
                height={width}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col w-full">
            <div className="flex border rounded-lg bg-white md:p-6 py-3 inner-shadow-[0_35px_90px_-15px_rgba(250,0,200,0.25)] md:w-1/2 m-4 ">
              <Chart
                options={Market_Cap.options}
                series={Market_Cap.series}
                type="area"
                height={width}
                className="w-full"
              />
            </div>
            <div className="border rounded-lg bg-white md:p-6 py-3  inner-shadow-[0_35px_90px_-15px_rgba(250,0,200,0.25)] md:w-1/2 m-4">
              <Chart
                options={Tot_Vol.options}
                series={Tot_Vol.series}
                type="area"
                height={width}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
