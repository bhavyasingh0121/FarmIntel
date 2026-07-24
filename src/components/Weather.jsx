import { useContext, useState } from "react";
import { FarmContext } from "../context/FarmContext";


function Weather({ onContinue }) {

  const { farmData, updateFarmData } = useContext(FarmContext);


  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);


  const getWeather = async () => {

    if (!location) {
      alert("Please enter farm location");
      return;
    }


    try {

      setLoading(true);


      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`
      );


      const geoData = await geoResponse.json();


      if (!geoData.results) {
        alert("Location not found");
        return;
      }


      const latitude = geoData.results[0].latitude;
      const longitude = geoData.results[0].longitude;


      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain`
      );


      const data = await weatherResponse.json();


      const liveWeather = {

        temperature: data.current.temperature_2m,

        humidity: data.current.relative_humidity_2m,

        rain: data.current.rain,

        wind: data.current.wind_speed_10m,

        condition: "Live Weather Data"

      };


      setWeather(liveWeather);
      alert("IoT Data:");
alert(JSON.stringify(farmData.iotData));

      updateFarmData({
        weather: liveWeather
      });


    } catch (error) {

      alert("Weather fetching failed");

    }


    setLoading(false);

  };


  const generateAnalysis = () => {


    let healthScore = 100;

    let irrigation =
      "All zones have balanced moisture.";

    let diseaseRisk = "Low";

    let weatherImpact =
      "Weather conditions are normal.";



    if (farmData.iotData) {


      const zones =
        Object.values(farmData.iotData);



      const lowMoisture =
        zones.some(
          zone => Number(zone.moisture) < 30
        );



      const highHumidity =
        zones.some(
          zone => Number(zone.humidity) > 75
        );



      if (lowMoisture) {

        healthScore -= 10;

        irrigation =
        "Some zones need irrigation due to low soil moisture.";

      }



      if (highHumidity) {

        healthScore -= 10;

        diseaseRisk = "Medium";

      }

    }



    if (weather) {


      if (weather.temperature > 35) {

        healthScore -= 5;

        weatherImpact =
        "High temperature detected. Monitor crop stress.";

      }


    }
     alert(JSON.stringify(farmData.iotData));

    updateFarmData({

      analysis: {

        healthScore,

        irrigation,

        diseaseRisk,

        weatherImpact

      }

    });


    onContinue();

  };



  return (

    <div className="app">

      <div className="card">


        <h1>🌦 Weather Intelligence</h1>


        <input

          type="text"

          placeholder="Enter Farm Location"

          value={location}

          onChange={(e)=>setLocation(e.target.value)}

        />


        <button onClick={getWeather}>

          {loading ? "Fetching..." : "Get Weather Intelligence"}

        </button>



        {weather && (

          <div style={{textAlign:"left"}}>

            <p>🌡 Temperature: {weather.temperature}°C</p>

            <p>💧 Humidity: {weather.humidity}%</p>

            <p>🌧 Rain: {weather.rain} mm</p>

            <p>💨 Wind: {weather.wind} km/h</p>

            <p>☁ Condition: {weather.condition}</p>

          </div>

        )}



        <button

          onClick={generateAnalysis}

          disabled={!weather}

        >

          Generate AI Analysis

        </button>


      </div>

    </div>

  );

}


export default Weather;