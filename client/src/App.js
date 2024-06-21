import React from "react";
import { LeagueProvider } from "./context/LeagueContext";
import LeagueList from "./components/LeagueList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <LeagueProvider>
      <div className="App">
        <LeagueList />
      </div>
    </LeagueProvider>
  );
}

export default App;
