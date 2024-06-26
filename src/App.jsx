import { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import Movie from './components/Movie';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList';
import { Routes, Route } from "react-router-dom";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  function toggleWatchlist(movie) {
    setWatchlist(prevList => {
      if (prevList.some(m => m.imdbID === movie.imdbID)) {
        return prevList.filter(m => m.imdbID !== movie.imdbID);
      } else {
        return [...prevList, movie];
      }
    });
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Movie watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
          </>
        } />
        <Route path="/watchlist" element={<WatchList watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
      </Routes>
    </>
  );
}

export default App;
