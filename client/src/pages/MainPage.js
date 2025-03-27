import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MainPage() {

    
  // the states for the fields
  const [date, Setdate] = useState();
  const [sourceCurrency, setsourceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  const [sourceCurrencyName, setsourceCurrencyName] = useState("");
  const [targetCurrencyName, settargetCurrencyName] = useState("");
  const [currencyNames, setcurrencyNames] = useState([]);

   // handle the submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/convertCurrency", {
            params:{
                date,
                sourceCurrency,
                targetCurrency,
                amountInSourceCurrency,
            }    
               
            });

            setamountInTargetCurrency(response.data);

        }catch(err){
            console.error(err);
       
        }
    }

  //get all the currencies
  useEffect(() => {
    const getTheCurrencies = async () => {
      try {
        const responce = await axios.get("http://localhost:4000/getCurrencies"
        );
        setcurrencyNames(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTheCurrencies();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32  text-5xl font-black flex items-center justify-normal text-green-500">
        Convert Your Currencies Today
      </h1>
      <p className="lg:mx-32 font-sm opacity-40 py-6">
      “Welcome to XChangePro, your ultimate currency conversion companion! 
        Effortlessly convert currencies in real-time with accurate exchange rates from around the world. 
        Whether you’re traveling, shopping online, or managing finances, XChangePro ensures seamless and reliable conversions at your fingertips. 
        Stay updated, make informed decisions, and experience hassle-free currency exchange like never before!”
     
      </p>
      <div className=" mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit="handleSubmit">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="date" >
                Date
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => Setdate(e.target.value)}
                type="date"
                name="date"
                id="date"
                placeholder="date.."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="sourceCurrency" >
                Source Currency
              </label>

              <select value={sourceCurrency} onChange={(e) => setsourceCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                name="sourceCurrency"
                id="sourceCurrency">

                    <option value="">Select source currency</option>{" "}
                        {/* Default empty option */}
                        {Object.keys(currencyNames).map((currency) => (
                            <option className=" p-1" key={currency} value={currency}>
                              {currencyNames[currency]}
                            </option>
                    ))}
              </select>
            </div>

            <div className="mb-4">

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="targetCurrency">
                Target Currency
              </label>

              <select
                value={targetCurrency} // Set the selected value
                onChange={(e) => settargetCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                name="targetCurrency"
                id="targetCurrency">

                <option value="">Select target currency</option>{" "}
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="amountInSourceCurrency">
                Amount in source currency
              </label>

              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => setamountInSourceCurrency(e.target.value)}
                type="number"
                name="amountInSourceCurrency"
                id="amountInSourceCurrency"
                placeholder="Amount in source currency..."
              />
            </div>

            <button onSubmit={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Get the target Currency
            </button>
          </form>
        </section>
      </div>
        <section className="mt-5 flex items-center justify-center flex-col lg:mx-32 text-center">
        {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to{" "}
       <span className='text-green-500 font-bold'>{amountInTargetCurrency} </span> {currencyNames[targetCurrency]} on {date}
        </section>
    </div>
  );

}

