/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { CurrencyContext } from '../../CurrencyContext';
import logo from '../images/currency.png';


export default function Navbar() {
    const { query, goToDetails } = useContext(CurrencyContext);

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
            <div className="container-fluid">
                <div className='imgDiv'><img className='w-100' src={logo} alt='currency Exchange logo'/></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <button id='navButton' className=" btn btn-outline-light me-3 " onClick={() =>goToDetails('EUR', "USD", query.amount)}>EUR-USD Details</button>
                        </li>
                        <li className="nav-item">
                            <button className=" btn btn-outline-light " onClick={() =>goToDetails('EUR', "GBP", query.amount)}>EUR-GBP Details</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
