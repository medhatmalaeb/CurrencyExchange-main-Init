import { useContext, useState, useEffect } from "react";
import { CurrencyContext } from "../../CurrencyContext";
import styles from "./Home.module.css";

export default function Home() {
  ////////////////////////////////////////////////// USE CONTEXT //////////////////////////////////////////////////////
  const { query, getQuery, rate, convert, result, convertToCurrencies, loading, goToDetails, dropDownItems } = useContext(CurrencyContext);
  
  ///////////////////////////////////////////////////// USEsTATES /////////////////////////////////////////////////////////////
  const [ResultUSD, setResultUSD] = useState(0);
  const [ResultEUR, setResultEUR] = useState(0);
  const [ResultJPY, setResultJPY] = useState(0);
  const [ResultGBP, setResultGBP] = useState(0);
  const [ResultAUD, setResultAUD] = useState(0);
  const [ResultCAD, setResultCAD] = useState(0);
  const [ResultCHF, setResultCHF] = useState(0);
  const [ResultNZD, setResultNZD] = useState(0);
  const [ResultHKD, setResultHKD] = useState(0);

  /////////////////////////////////////////////// THIS USEeFFECT MAKING THE FIELDS DISABLED WHEN THE AMOUNT = 0 //////////////////////////////////////////////////////
  useEffect(() => {
    
    if (query.amount === 0 || query.amount === "") {
      document.getElementById('alert').classList.remove("d-none")
      document.getElementsByClassName("fromHome")[0].classList.add("disabled", "cursorNotAllowed");
      document.getElementsByClassName("fromHome")[0].setAttribute("disabled", "")
      document.getElementById("to").classList.add("disabled", "cursorNotAllowed");
      document.getElementById("to").setAttribute("disabled", "");
      document.getElementById("submit").classList.add("disabled", "cursorNotAllowed");
      document.getElementById("submit").setAttribute("disabled", "");
      document.getElementById("swapHome").setAttribute("disabled", "");
      document.getElementById("swapHome").classList.add("disabled", "cursorNotAllowed");


    }
    else {
      document.getElementById('alert').classList.add("d-none")
      document.getElementsByClassName("fromHome")[0].classList.remove("disabled", "cursorNotAllowed");
      document.getElementsByClassName("fromHome")[0].removeAttribute("disabled", "")
      document.getElementById("to").classList.remove("disabled", "cursorNotAllowed");
      document.getElementById("to").removeAttribute("disabled", "");
      document.getElementById("submit").classList.remove("disabled", "cursorNotAllowed");
      document.getElementById("submit").removeAttribute("disabled", "");
      document.getElementById("swapHome").removeAttribute("disabled", "");
      document.getElementById("swapHome").classList.remove("disabled", "cursorNotAllowed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //////////////////////////////////////// FUNCTION OF SWAP BTN //////////////////////////////////////////////////////
  function swapBtn(e) {
    e.preventDefault();
    let toInp = document.getElementById("to").value
    let FromInp = document.getElementById("from").value;
    document.getElementById("to").value = FromInp;
    document.getElementById("from").value = toInp;

  }

  return (
    <>
      <h1 className="my-3">Currency Exchanger</h1>
      <div className="row">

        {/***************************************************************  SUBMITTING THE FORM ********************************/}
        <form onSubmit={function (e) {
          e.preventDefault();
          convert();
          convertToCurrencies("USD", query.from, query.amount, setResultUSD);
          convertToCurrencies("EUR", query.from, query.amount, setResultEUR);
          convertToCurrencies("JPY", query.from, query.amount, setResultJPY);
          convertToCurrencies("GBP", query.from, query.amount, setResultGBP);
          convertToCurrencies("AUD", query.from, query.amount, setResultAUD);
          convertToCurrencies("CAD", query.from, query.amount, setResultCAD);
          convertToCurrencies("CHF", query.from, query.amount, setResultCHF);
          convertToCurrencies("NZD", query.from, query.amount, setResultNZD);
          convertToCurrencies("HKD", query.from, query.amount, setResultHKD);
        }} className='border py-3'>
          <div className='container'>
            <div id="alert" className="my-3 text-danger d-flex align-items-center"><i className="fa-solid fa-circle-exclamation xxl me-2"></i>please Enter the number you would like to exchange</div>
            <div className='row' >
              <div className='col-md-4'>
                <div>
                  <label htmlFor='number'>Amount :</label>
                  <input defaultValue={query.amount} id='amount' onChange={getQuery} type="number" className='text-center form-control my-3' name='amount' placeholder='enter the amount you want to exchange' />


                </div>

              </div>
              <div className='col-md-8'>
                <div className="row">
                  <div className='col-md-5'>
                    <label htmlFor='text'>From :</label>
                    <select defaultValue={query.from} id="from" type="text" className='fromHome rounded border py-2 text-white w-100 my-3 bg-transparent' name='from'  >
                      {dropDownItems.map((item, index) => <option className='text-dark text-center py-3 bg-transparent' key={index}>{item}</option>)}

                    </select>
                  </div>
                  <div className='col-md-2 mt-4 d-flex justify-content-center align-items-center'>

                    <button id="swapHome" onClick={swapBtn} className="btn btn-outline-light w-100 p-0"><i className="fa-solid fa-left-right"></i></button>

                  </div>
                  <div className='col-md-5'>
                    <label htmlFor='number'>To :</label>
                    <select defaultValue={query.to} id="to" type="number" className='rounded border py-2 text-white w-100  my-3 bg-transparent' name='to' >
                      {dropDownItems.map((item, index) => <option className='text-dark text-center py-3 bg-transparent' key={index}>{item}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 '></div>
              <div className='col-md-8'>
                <div className='row'>
                  <div className='px-2 w-100'>
                    <button id="submit" className='bg-teal  w-100 text-light text-center py-2 cursorPointer ' type='submit' >{loading ? <i className='fas fa-spinner fa-spin'></i> : "Convert"}</button>
                  </div>


                </div>
              </div>
            </div>
            <div className='row align-items-center d-none' id='theLastRow'>
              <div className='col-md-4'>
                <div id="rateHome" className='rounded border py-1 text-white w-100 my-3 bg-transparent text-center'   >{`1.00 ${query.from} = ${rate} ${query.to}`}</div>

              </div>
              <div className='col-md-8'>
                <div className='row align-items-center'>
                  <div className='col-md-7'>
                    <div className='w-100 form-control text-center my-3 py-3 xxl' >{`${result} ${query.to}`}</div>

                  </div>
                  <div className='col-md-5'>
                    <div className=' w-100'>
                      <button onClick={() => goToDetails(query.from, query.to, query.amount)} className='bg-teal mx-1 w-100 text-light text-center py-1 cursorPointer'>more details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>

        {/* dIV OF 3*3 GRID TO with converted value of the entered amount to the 9 most popular currencies */}
        <div id="topCurrenciesDivs" className="px-0 d-none">
          <div className='row py-4'>
            <div className={`col-md-4 pe-5  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultUSD}   USD`}</div>
            </div>
            <div className={`col-md-4 pe-5  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultEUR}   EUR`}</div>
            </div>
            <div className={`col-md-4  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultJPY}   JPY`}</div>
            </div>
          </div>

          <div className='row py-4'>
            <div className={`col-md-4 pe-5  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultGBP}   GBP`}</div>
            </div>
            <div className={`col-md-4 pe-5  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultAUD}    AUD`}</div>
            </div>
            <div className={`col-md-4  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultCAD}    CAD`}</div>
            </div>
          </div>

          <div className='row py-4'>
            <div className={`col-md-4 pe-5  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultCHF}    CHF`}</div>
            </div>
            <div className={`col-md-4 pe-5  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultNZD}    NZD`}</div>
            </div>
            <div className={`col-md-4  `}>
              <div className={` border rounded ${styles.topCurrencies}`}>{`${ResultHKD}    HKD`}</div>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}
