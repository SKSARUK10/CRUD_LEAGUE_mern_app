import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LeagueContext = createContext();

export const LeagueProvider = ({ children }) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const res = await axios.get(`http://localhost:5000/api/leagues`);
      setLeagues(res.data);
    };
    fetchLeagues();
  }, []);

  const addLeague = async (league) => {
    const res = await axios.post(`http://localhost:5000/api/leagues`, league);
    setLeagues([...leagues, res.data]);
  };

  const updateLeague = async (league) => {
    const res = await axios.put(
      `http://localhost:5000/api/leagues/${league._id}`,
      league
    );
    setLeagues(leagues.map((l) => (l._id === league._id ? res.data : l)));
  };

  const deleteLeague = async (id) => {
    await axios.delete(`http://localhost:5000/api/leagues/${id}`);
    setLeagues(leagues.filter((l) => l._id !== id));
  };

  const inviteFriend = async (id, email) => {
    const res = await axios.post(
      `$http://localhost:5000/api/leagues/${id}/invite`,
      {
        email,
      }
    );
    setLeagues(leagues.map((l) => (l._id === id ? res.data : l)));
  };

  return (
    <LeagueContext.Provider
      value={{ leagues, addLeague, updateLeague, deleteLeague, inviteFriend }}
    >
      {children}
    </LeagueContext.Provider>
  );
};
