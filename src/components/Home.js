import React, { useState, useEffect } from 'react'
import CurrentLocation from './currentLocation/CurrentLocation';
import Header from './header/Header';
import SearchCity from './searchCity/SearchCity';
import image from '../assets/backGroundImage/image1.jpg';
import './Home.css'



function Home() {

    const apiKey = process.env.REACT_APP_API_KEY



    // `${currentLocationApi}?lat=${lat}&lon=${lng}&appid=${apiKey}`



    return (
        <div className="main-container">
            <div>
                <Header />
            </div>

            <div className="search-container">
                <SearchCity />
            </div>

            <div className="container">

                <div className="current-container">
                    <CurrentLocation />
                </div>



            </div>



        </div>
    )
}

export default Home
