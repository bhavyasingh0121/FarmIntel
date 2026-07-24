import { useContext, useState } from "react";
import { FarmContext } from "../context/FarmContext";


function IoTData({ onContinue }) {

  const { updateFarmData } = useContext(FarmContext);


  const [sensorData, setSensorData] = useState({
    zone1: {
      moisture: "",
      temperature: "",
      humidity: "",
      ph: ""
    },
    zone2: {
      moisture: "",
      temperature: "",
      humidity: "",
      ph: ""
    },
    zone3: {
      moisture: "",
      temperature: "",
      humidity: "",
      ph: ""
    },
    zone4: {
      moisture: "",
      temperature: "",
      humidity: "",
      ph: ""
    }
  });


  const handleChange = (zone, field, value) => {

    setSensorData((previous) => ({
      ...previous,
      [zone]: {
        ...previous[zone],
        [field]: value
      }
    }));

  };


  const handleContinue = () => {

    const allFilled = Object.values(sensorData).every(
      (zone) =>
        zone.moisture &&
        zone.temperature &&
        zone.humidity &&
        zone.ph
    );


    if (!allFilled) {
      alert("Please fill all IoT sensor values");
      return;
    }
    alert(JSON.stringify(sensorData));
console.log(sensorData);

    updateFarmData({
  iotData: { ...sensorData }
});

    setTimeout(() => {
  onContinue();
}, 200);

  };


  return (
    <div className="app">

      <div className="card">

        <h1>🌱 IoT Sensor Data</h1>


        {["zone1", "zone2", "zone3", "zone4"].map(
          (zone, index) => (

          <div key={zone}>

            <h3>📍 Zone {index + 1}</h3>

            <input
              type="number"
              placeholder="Soil Moisture (%)"
              value={sensorData[zone].moisture}
              onChange={(e) =>
                handleChange(zone, "moisture", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Temperature (°C)"
              value={sensorData[zone].temperature}
              onChange={(e) =>
                handleChange(zone, "temperature", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Humidity (%)"
              value={sensorData[zone].humidity}
              onChange={(e) =>
                handleChange(zone, "humidity", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Soil pH"
              value={sensorData[zone].ph}
              onChange={(e) =>
                handleChange(zone, "ph", e.target.value)
              }
            />

          </div>

        ))}


        <button onClick={handleContinue}>
          Continue to Weather
        </button>


      </div>

    </div>
  );
}


export default IoTData;