import React, { useState } from 'react';
import axios from 'axios';

function App() {

    const [ data, setData ] = useState({});
    const [ location, setLocation ] = useState('');

    // privide your own API key
    const apiKey = process.env.REACT_APP_WEATHER_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data)
            });
            setLocation('');
        }

    }

    return (
        <div className="App">
            {/* Search Box of the App */}
            <div className="search">
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder='Enter Location'
                    onKeyPress={searchLocation}
                    type="text" />
            </div>

            {/* Container Part of the App */}
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>

                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                    </div>

                    <div className="description">
                        {data.weather ? <p>{data.weather[ 0 ].main}</p> : null}
                    </div>
                </div>

                {/* Bottom Part of the App */}
                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                            <p>Feels Like</p>
                        </div>

                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>

                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}mph</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;