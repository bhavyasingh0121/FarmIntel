import { useContext, useState } from "react";
import { FarmContext } from "../context/FarmContext";


function CreateFarm({ onContinue }) {

  const { updateFarmData } = useContext(FarmContext);


  const [farmName, setFarmName] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");


  const handleContinue = () => {

    if (!farmName || !crop || !area) {
      alert("Please fill all farm details");
      return;
    }


    updateFarmData({
      farmName: farmName,
      crop: crop,
      area: area,
    });


    onContinue();

  };


  return (
    <div className="app">

      <div className="card">

        <h1>🌾 Create Farm</h1>


        <input
          type="text"
          placeholder="Farm Name"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
        />


        <input
          type="text"
          placeholder="Crop Type"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />


        <input
          type="text"
          placeholder="Farm Area (Acres)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />


        <button onClick={handleContinue}>
          Continue
        </button>


      </div>

    </div>
  );
}


export default CreateFarm;