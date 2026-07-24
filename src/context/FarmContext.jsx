import { createContext, useState } from "react";

export const FarmContext = createContext();


export function FarmProvider({ children }) {

  const [farmData, setFarmData] = useState({

    farmName: "",
    crop: "",
    area: "",

    zones: [],

    iotData: {},

    weather: {},

    analysis: {},

  });


  const updateFarmData = (data) => {

    setFarmData((previousData) => ({
      ...previousData,
      ...data,
    }));

  };


  return (

    <FarmContext.Provider
      value={{
        farmData,
        updateFarmData,
      }}
    >

      {children}

    </FarmContext.Provider>

  );

}``