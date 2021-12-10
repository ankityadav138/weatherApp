import React, { useState, useEffect } from 'react';
import './searchCity.css'



function SearchCity() {

    const apiKey = process.env.REACT_APP_API_KEY;

    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState([]);

    const [temperature, setTemperature] = useState("")
    const [loading, setLoading] = useState(false)
    const [pressure, setPressure] = useState("")
    const [humidity, setHumidity] = useState("")
    const [main, setMain] = useState("");

    //getting weather forcast by searching city name



    //useEffect


    const getWeather = async () => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=25.5940947&lon=85.1375645&appid=1b3dfd9e7b7166bb0ad5fa79b2329ba3`)
            .then(res => res.json())
            .then((response) => {
                setCity(response)
                console.log(city)

                if (response) {
                    console.log(response)
                    setLoading(false)
                } else {
                    setLoading(true)
                }
            }).catch((err) => {
                console.log(err)
            })
    }




    return (


        <div className="container">

            {loading ?
                <h1>Loading...</h1> :

                <div>



                    <div style={{ flexDirection: "column" }}>

                        <input
                            placeholder="Search City Name"
                            type="search"
                            className="searchBox"
                            onChange={(event) => setSearchCity(event.target.value)}
                        />

                        <button className="button" onClick={getWeather()}>Search</button>
                    </div>

                    <div className="basic-Info">
                        <div style={{ marginRight: "470px", position: "relative", }}>
                            <h1 >{temperature}   C</h1>
                        </div>
                    </div>


                    <h1></h1>

                </div>
            }


        </div>
    )
}

export default SearchCity;
