// eslint-disable-next-line no-unused-vars
import { Chart as Chartjs } from 'chart.js/auto';
import React from 'react'
import { useContext, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from "../../CurrencyContext";
import style from './Details.module.css';
export default function Details() {
    const { query, rate, result, getQuery, loading, currentParams, goToDetails, title, dropDownItems, historicalRates, historicalMonths } = useContext(CurrencyContext);
    let navigate = useNavigate();

    const chartData = {
        labels: historicalMonths,
        datasets: [{
            label: `Historical Rates of Exchange from: ${currentParams.from} to: ${currentParams.to}`,
            data: historicalRates,
            backgroundColor: 'teal',
            borderColor: "#084de0"
        }]
    }


/////////////////////////////////////////////// THIS USEeFFECT MAKING THE FIELDS DISABLED WHEN THE AMOUNT = 0 //////////////////////////////////////////////////////

    useEffect(() => {

        if (query.amount === 0 || query.amount === "") {
            document.getElementById('alert').classList.remove("d-none")
            document.getElementById("to").classList.add("disabled", "cursorNotAllowed");
            document.getElementById("to").setAttribute("disabled", "");
            document.getElementById("submit").classList.add("disabled", "cursorNotAllowed");
            document.getElementById("submit").setAttribute("disabled", "");
            document.getElementById("myChart").classList.add("d-none")



        }
        else {
            document.getElementById('alert').classList.add("d-none")
            document.getElementById("to").classList.remove("disabled", "cursorNotAllowed");
            document.getElementById("to").removeAttribute("disabled", "");
            document.getElementById("submit").classList.remove("disabled", "cursorNotAllowed");
            document.getElementById("submit").removeAttribute("disabled", "");
            document.getElementById("myChart").classList.remove("d-none")

        }
    },[query.amount])

    function goHome(e) {
        e.preventDefault();
        navigate('/home')
    }

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
            <button onClick={goHome} className={` bg-teal py-2 px-4  text-center text-light ${style.goHome}`}>Back to home</button>

            <h2 className="my-3">{`${currentParams.from} - `}<span>{title}</span></h2>
            <div className="row">


        {/***************************************************************  SUBMITTING THE FORM ********************************/}
                <form onSubmit={function (e) {
                    e.preventDefault(); goToDetails(query.from, query.to, query.amount);

                }} className='border py-3'>
                    <div className='container'>
                        <div id="alert" className="my-3 text-danger d-flex align-items-center"><i className="fa-solid fa-circle-exclamation xxl me-2"></i>please Enter the number you would like to exchange</div>

                        <div className='row' >
                            <div className='col-md-4'>
                                <div>
                                    <label htmlFor='number'>Amount :</label>
                                    <input defaultValue={currentParams.amount} id='amount' onChange={getQuery} type="number" className='text-center form-control my-3' name='amount' placeholder='enter the amount you want to exchange' />


                                </div>

                            </div>
                            <div className='col-md-8'>
                                <div className="row">
                                    <div className='col-md-5'>
                                        <label htmlFor='text'>From :</label>
                                        <select disabled="disabled" id="from" onChange={getQuery} type="text" className='rounded border py-2 w-100 my-3 disabled cursorNotAllowed' name='from'  >
                                            <option>{currentParams.from}</option>
                                        </select>
                                    </div>
                                    <div className='col-md-2 mt-4 d-flex justify-content-center align-items-center'>

                                        <button id="swap" disabled="disabled" onClick={swapBtn} className="btn btn-outline-light w-100 p-0 disabled cursorNotAllowed"><i className="fa-solid fa-left-right"></i></button>


                                    </div>
                                    <div className='col-md-5'>
                                        <label htmlFor='number'>To :</label>
                                        <select id="to" onChange={getQuery} type="number" className='rounded border py-2 text-white w-100  my-3 bg-transparent' name='to' >
                                            <option className='text-dark text-center py-3 bg-transparent' >{currentParams.to}</option>
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
                                        <button id='submit' className='bg-teal  w-100 text-light text-center py-2 cursorPointer ' type='submit' >{loading ? <i className='fas fa-spinner fa-spin'></i> : "Convert"}</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className='row align-items-center d-none' id='theLastRow'>
                            <div className='col-md-4'>
                                <div className='rounded border py-1 text-white w-100 my-3 bg-transparent text-center'   >{`1.00 ${currentParams.from} = ${rate} ${currentParams.to}`}</div>

                            </div>
                            <div className='col-md-8'>
                                <div className='row align-items-center'>
                                    <div className='w-100'>
                                        <div className='w-100 form-control text-center my-3 py-3 xxl' >{`${result} ${currentParams.to}`}</div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </form>



            </div>
            
            {/* ****************************************Chart To show the historical rates of the exchange between two currencies********************************************** */}
            <div id="myChart" className={`px-0 my-5 mx-0 border rounded row w-100 $`}>
                {historicalRates.length !== 0 ? <Line data={chartData} /> : <div className='h-200 d-flex justify-content-center align-items-center w-100'><i className='fas fa-spinner fa-spin xxl'></i></div>}


            </div>
        </>
    )
}
