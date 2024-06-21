// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const LeagueContext = createContext();

// export const LeagueProvider = ({ children }) => {
//   const [leagues, setLeagues] = useState([]);

//   useEffect(() => {
//     const fetchLeagues = async () => {
//       const res = await axios.get(`http://localhost:5000/api/leagues`);
//       setLeagues(res.data);
//     };
//     fetchLeagues();
//   }, []);

//   const addLeague = async (league) => {
//     const res = await axios.post(`http://localhost:5000/api/leagues`, league);
//     setLeagues([...leagues, res.data]);
//   };

//   const updateLeague = async (league) => {
//     const res = await axios.put(
//       `http://localhost:5000/api/leagues/${league._id}`,
//       league
//     );
//     setLeagues(leagues.map((l) => (l._id === league._id ? res.data : l)));
//   };

//   const deleteLeague = async (id) => {
//     await axios.delete(`http://localhost:5000/api/leagues/${id}`);
//     setLeagues(leagues.filter((l) => l._id !== id));
//   };

//   const inviteFriend = async (id, email) => {
//     const res = await axios.post(
//       `http://localhost:5000/api/leagues/${id}/invite`,
//       {
//         email,
//       }
//     );
//     setLeagues(leagues.map((l) => (l._id === id ? res.data : l)));
//   };

//   return (
//     <LeagueContext.Provider
//       value={{ leagues, addLeague, updateLeague, deleteLeague, inviteFriend }}
//     >
//       {children}
//     </LeagueContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LeagueContext = createContext();

export const LeagueProvider = ({ children }) => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/leagues`);
        setLeagues(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  const addLeague = async (league) => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/api/leagues`, league);
      setLeagues([...leagues, res.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLeague = async (league) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/leagues/${league._id}`,
        league
      );
      setLeagues(leagues.map((l) => (l._id === league._id ? res.data : l)));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteLeague = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/leagues/${id}`);
      setLeagues(leagues.filter((l) => l._id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inviteFriend = async (id, email) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/leagues/${id}/invite`,
        {
          email,
        }
      );
      setLeagues(leagues.map((l) => (l._id === id ? res.data : l)));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeagueContext.Provider
      value={{
        leagues,
        loading,
        error,
        addLeague,
        updateLeague,
        deleteLeague,
        inviteFriend,
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
};
