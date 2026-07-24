import { useContext } from "react";
import { FarmContext } from "../context/FarmContext";


function Dashboard({ onContinue }) {

  const { farmData } = useContext(FarmContext);


  const analysis = farmData.analysis || {};
  const zones = farmData.iotData || {};


  const getZoneStatus = (data) => {

    let status = "✅ Healthy";
    let recommendation = "No action required";
    let score = 90;


    const moisture = Number(data.moisture);
    const humidity = Number(data.humidity);
    const ph = Number(data.ph);


    if (moisture < 30) {

      status = "⚠ Low Moisture";
      recommendation = "Irrigate this zone";
      score -= 15;

    }


    if (humidity > 75) {

      status = "🔴 Disease Risk";
      recommendation = "Monitor crop stress";
      score -= 15;

    }


    if (ph < 5.5 || ph > 7.5) {

      status = "⚠ Soil pH Issue";
      recommendation = "Check soil quality";
      score -= 10;

    }


    return {
      status,
      recommendation,
      score
    };

  };


  return (

    <div className="app">

      <div className="card">


        <h1>📊 Farm Health Dashboard</h1>


        <div style={{ textAlign: "left" }}>


          <h3>🌾 Farm Details</h3>

          <p>
            <b>Farm Name:</b> {farmData.farmName}
          </p>

          <p>
            <b>Crop:</b> {farmData.crop}
          </p>

          <p>
            <b>Area:</b> {farmData.area} Acres
          </p>



          <hr />


          <h2>🤖 AI Analysis</h2>


          <p>
            🌱 <b>Farm Health Score:</b>{" "}
            {analysis.healthScore || 80}/100
          </p>


          <p>
            🦠 <b>Disease Risk:</b>{" "}
            {analysis.diseaseRisk || "Low"}
          </p>


          <p>
            💧 <b>Irrigation:</b>{" "}
            {analysis.irrigation || "Normal"}
          </p>


          <p>
            🌦 <b>Weather Impact:</b>{" "}
            {analysis.weatherImpact || "Normal"}
          </p>



          <hr />


          <h2>📍 Zone Analysis</h2>



          {Object.entries(zones).map(
            ([zone, data], index) => {

              const result = getZoneStatus(data);


              return (

                <div key={zone}>


                  <h3>
                    📍 Zone {index + 1}
                  </h3>


                  <p>
                    <b>Status:</b> {result.status}
                  </p>


                  <p>
                    <b>Health Score:</b> {result.score}/100
                  </p>


                  <p>
                    <b>Soil Moisture:</b> {data.moisture}%
                  </p>


                  <p>
                    <b>Temperature:</b> {data.temperature}°C
                  </p>


                  <p>
                    <b>Humidity:</b> {data.humidity}%
                  </p>


                  <p>
                    <b>Soil pH:</b> {data.ph}
                  </p>


                  <p>
                    <b>Recommendation:</b>{" "}
                    {result.recommendation}
                  </p>


                  <hr />

                </div>

              );

            }

          )}


        </div>



        <button onClick={onContinue}>
          🤖 Open AI Assistant
        </button>



      </div>


    </div>

  );

}


export default Dashboard;