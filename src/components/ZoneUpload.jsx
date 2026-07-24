import { useContext, useState } from "react";
import { FarmContext } from "../context/FarmContext";


function ZoneUpload({ onAnalyze }) {

  const { updateFarmData } = useContext(FarmContext);


  const [zones, setZones] = useState([
    null,
    null,
    null,
    null
  ]);


  const handleFileChange = (index, file) => {

    const updatedZones = [...zones];

    updatedZones[index] = file;

    setZones(updatedZones);

  };


  const handleAnalyze = () => {

    const allUploaded = zones.every(
      (zone) => zone !== null
    );


    if (!allUploaded) {
      alert("Please upload images for all 4 zones");
      return;
    }


    updateFarmData({
      zones: zones
    });


    onAnalyze();

  };


  return (
    <div className="app">

      <div className="card">

        <h1>📷 Upload Zone Images</h1>


        <p><b>Zone 1</b></p>
        <input
          type="file"
          onChange={(e) =>
            handleFileChange(0, e.target.files[0])
          }
        />


        <p><b>Zone 2</b></p>
        <input
          type="file"
          onChange={(e) =>
            handleFileChange(1, e.target.files[0])
          }
        />


        <p><b>Zone 3</b></p>
        <input
          type="file"
          onChange={(e) =>
            handleFileChange(2, e.target.files[0])
          }
        />


        <p><b>Zone 4</b></p>
        <input
          type="file"
          onChange={(e) =>
            handleFileChange(3, e.target.files[0])
          }
        />


        <button onClick={handleAnalyze}>
          Analyze Farm
        </button>


      </div>

    </div>
  );
}


export default ZoneUpload;