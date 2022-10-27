import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export let CurrencyContext = createContext([]);
export function CurrencyContextProvider(props) {

    ////////////////////////////////////////USESTATES//////////////////////////////////////
    let [query, setQuery] = useState({
        amount: null,
        from: '',
        to: ''
    });
    //api Key variable change it after subscribtion
    let apiKey="f7qjx5PRntxRjQ5OXtIaVUHp2zVY50dJ";
    let [result, setResult] = useState(0);
    let [rate, setRate] = useState(0);
    const [loading, setloading] = useState(false);
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentParams, setcurrentParams] = useState({});
    const [title, settitle] = useState('');
    const [dropDownItems, setdropDownItems] = useState([]);
    const [dataRates, setdataRates] = useState([]);
    const [historicalRates, setHistoricalRates] = useState([]);

    let currencyRateObjs = []
    let rates = [];
    let historicalMonths = ['July2021', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July2022']

//////////////////////////////////////////////////////////////////////////////////// USE EFFECTS/////////////////////////////////////////////////////////////////////////
    
//////////////////////////////////////////////////USEeFFEVT TO GET THE CURRENT PARAMS AFTER CHANGING THE URL/////////////////////////////////////////////////////////////////
useEffect(() => {

        setcurrentParams(Object.fromEntries([...searchParams]));
    }, [searchParams]);


    useEffect(() => {
        getDropDownItems()
    }, [])


///////////////////////////////////////////////////////////////// USE EFFECT OF EXTRACT THE RATES OF CURRENCIES EXCHANGE INTO SEPERATED ARRAY///////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {

        if (dataRates.length === 0)
            return;
        let { "2021-07-31": July2021, "2021-08-31": August, "2021-09-30": September, "2021-10-31": October, "2021-11-30": November, "2021-12-31": December, "2022-01-31": January, "2022-02-28": February, "2022-03-31": March, "2022-04-30": April, "2022-05-31": May, "2022-06-30": June, "2022-07-31": July2022 } = dataRates;
        currencyRateObjs.push(July2021, August, September, October, November, December, January, February, March, April, May, June, July2022)
        rates.push(currencyRateObjs.map((currencyRateObject) => currencyRateObject[currentParams.to]))
        setHistoricalRates(rates[0]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataRates]);

    ///////////////////////////////////////////////////////////////////FUNCTIONS//////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////GET THE QUERY OF THE SELECTED CURRENCIED AND THE ENTERED AMOUNT////////////////////////////////////////// 
    function getQuery() {
        query.amount = document.getElementById("amount").value;
        query.from = document.getElementById("from").value;
        query.to = document.getElementById("to").value;
        if (query.amount === "" || query.amount === 0) {

            document.getElementById('alert').classList.remove("d-none");
            document.getElementById("submit").classList.add("disabled", "cursorNotAllowed");
            document.getElementById("submit").setAttribute("disabled", "");
            document.getElementById("to").classList.add("disabled", "cursorNotAllowed");
            document.getElementById("to").setAttribute("disabled", "");
            if (document.getElementById("swapHome") || document.getElementsByClassName("fromHome")[0]) {
                document.getElementById("swapHome").setAttribute("disabled", "");
                document.getElementById("swapHome").classList.add("disabled", "cursorNotAllowed");
                document.getElementsByClassName("fromHome")[0].classList.add("disabled", "cursorNotAllowed");
                document.getElementsByClassName("fromHome")[0].setAttribute("disabled", "");
            }

        }
        else {
            document.getElementById('alert').classList.add("d-none");
            document.getElementById("to").classList.remove("disabled", "cursorNotAllowed");
            document.getElementById("to").removeAttribute("disabled", "");
            document.getElementById("submit").classList.remove("disabled", "cursorNotAllowed");
            document.getElementById("submit").removeAttribute("disabled", "");
            if (document.getElementById("swapHome") || document.getElementsByClassName("fromHome")[0]) {
                document.getElementById("swapHome").removeAttribute("disabled", "");
                document.getElementById("swapHome").classList.remove("disabled", "cursorNotAllowed");
                document.getElementsByClassName("fromHome")[0].classList.remove("disabled", "cursorNotAllowed");
                document.getElementsByClassName("fromHome")[0].removeAttribute("disabled", "")
            }

        }


    }



    function convert() {
        getQuery();
        convertToCurrencies(query.to, query.from, query.amount, setResult);

    }
////////////////////////////////////////////////////////////// CONVERTING BETWEEN THE SELECTED CURRENCIES ///////////////////////////////////////////////////////////

    async function convertToCurrencies(to, from, amount, callback) {

        setloading(true);
        let { data } = await axios.get(`https://api.apilayer.com/fixer/convert?apikey=${apiKey}&to=${to}&from=${from}&amount=${amount}`)
        callback(data.result);
        if (callback === setResult) { setRate(data.info.rate); }
        if (document.getElementById("theLastRow")) { document.getElementById("theLastRow").classList.add("d-none"); }


        if (data.success === true) {
            setloading(false);
            if (document.getElementById("topCurrenciesDivs")) { document.getElementById("topCurrenciesDivs").classList.remove("d-none"); }
            if (document.getElementById("theLastRow")) { document.getElementById("theLastRow").classList.remove("d-none"); }
        }

    }

//////////////////////////////////////////////////////////////////// GO TO DETAILS PAGE FUNCTION ////////////////////////////////////////////////////////////////////////
    function goToDetails(from, to, amount) {

        setHistoricalRates([]);
        navigate(
            {
                pathname: "/details",
                search: `?from=${from}&to=${to}&amount=${amount}`,
            }

        );
        getDropDownItems(from)
        if (amount === "" || amount === 0)

            return;
        else {

            convertToCurrencies(to, from, amount, setResult);
            getHistoricalRates(from, to)
            query.to = to;
            query.from = from;
            query.amount = amount;

        }
    }


 ///////////////////////////////////////////////////////////// GET TITLE OF DETAILS PAGE  FUNCTION///////////////////////////////////////////////////////////

////////////////////////////////////////////////////// GETTING ALL THE CURRENCIES THAT AVAILABLE AT THE API ///////////////////////////////////////////////////////////
    async function getDropDownItems(x) {
        let { data } = await axios.get(`https://api.apilayer.com/fixer/symbols?apikey=${apiKey}`);
        let { symbols } = data;
        setdropDownItems(Object.getOwnPropertyNames(symbols));
        settitle(symbols[x])
    }

////////////////////////////////////////////// GET THE HISTORICAL RATE OF EXCHANGE BETWEEN THE SELECTED TWO CURRENCIES ///////////////////////////////////////////////////////////
    async function getHistoricalRates(from, to) {
        let { data } = await axios.get(`https://api.apilayer.com/fixer/timeseries?apikey=${apiKey}&start_date=2021-07-31&end_date=2022-07-31&base=${from}&symbols=${to}`)
        setdataRates(data.rates);


    }



    return <CurrencyContext.Provider value={{ query, result, rate, getQuery, convert, convertToCurrencies, loading, currentParams, goToDetails, title, dropDownItems, rates, historicalRates, historicalMonths }}>
        {props.children}
    </CurrencyContext.Provider>

}
