import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

 // Fetch the exchange rate data when the component mounts
  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate data", error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Update the converted amount when the exchange rate changes
  useEffect(() => {
    // If exchange rate is not null, calculate the converted amount
    if (exchangeRate !== null) {
      // Calculate the converted amount and set the state
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
    
  }, [amount, exchangeRate]);

  // Event handlers
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    // If the input is not a number, set the amount to 0
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount :</label>
            <input type="number" id="amt" value={amount} onChange={handleAmountChange} />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency :</label>
            <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="EUR">EUR - Euro</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="KRW">KRW - South Korean Won</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency :</label>
            <select id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="EUR">EUR - Euro</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="KRW">KRW - South Korean Won</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;