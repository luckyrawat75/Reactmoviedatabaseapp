import React, { useContext, useEffect, useState } from "react";
import "./Movie.css";

const API_URL = `http://www.omdbapi.com/?apikey=a3a1f29&s=`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]); 
  const [isError, setIsError] = useState({ show: false, msg: " " });
  const [query, setQuery] = useState("titanic");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("API Response:", data);

      if (data.Response === "True") {
        setMovies(data.Search);
        setIsError({ show: false, msg: "" });
      } else {
        setMovies([]);
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      setIsError({ show: true, msg: "Something went wrong" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}${query}`);
    }, 500);
    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    <AppContext.Provider
      value={{ isLoading, isError, movies, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
