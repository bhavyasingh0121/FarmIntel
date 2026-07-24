import { useState } from "react";

import Login from "./components/Login";
import CreateForm from "./components/CreateForm";
import ZoneUpload from "./components/ZoneUpload";
import IoTData from "./components/IoTData";
import Weather from "./components/Weather";
import Dashboard from "./components/Dashboard";
import AIAssistant from "./components/AIAssistant";

import { FarmProvider } from "./context/FarmContext";


function App() {

  const [page, setPage] = useState("login");


  return (

    <FarmProvider>

      <div>

        {page === "login" && (
          <Login onLogin={() => setPage("create")} /> )}


        {page === "create" && (
          <CreateForm onContinue={() =>setPage("zone")} /> )}


        {page === "zone" && (
          <ZoneUpload onAnalyze={() => setPage("iot")} />)}   


        {page === "iot" && (
          <IoTData onContinue={() =>setPage("weather")} /> )}


        {page === "weather" && (
          <Weather onContinue={() => setPage("dashboard")} /> )}

        {page === "dashboard" && (
          <Dashboard nContinue={() =>setPage("assistant")} /> )}


        {page === "assistant" && (
          <AIAssistant setPage={setPage} />
        )}

      </div>

    </FarmProvider>

  );

}


export default App;