import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const Movie = ({ watchlist, toggleWatchlist }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const API_KEY = '5c3bdce2';
  const DEFAULT_QUERY = 'Avengers';

  const fetchMovies = async (query, page) => {
    setLoading(true);
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`);
    const data = await response.json();

    if (data.Response === "True") {
      // Fetch individual movie details to get the imdbRating
      const moviesWithDetails = await Promise.all(data.Search.map(async (movie) => {
        const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        const movieDetails = await movieDetailsResponse.json();
        return { ...movie, imdbRating: movieDetails.imdbRating };
      }));

      setMovies(moviesWithDetails);
      setTotalResults(data.totalResults);
    } else {
      setMovies([]);
      setTotalResults(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(DEFAULT_QUERY, 1);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchMovies(searchQuery, 1);
      setCurrentPage(1);
    } else {
      fetchMovies(DEFAULT_QUERY, 1);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (searchQuery.trim() !== '') {
      fetchMovies(searchQuery, newPage);
    } else {
      fetchMovies(DEFAULT_QUERY, newPage);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);
  const maxVisiblePages = 10;

  const getVisiblePages = () => {
    const pages = [];
    const halfMax = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, currentPage + halfMax);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div>
      <h2 className='text-center p-3 text-xl font-semibold'>Trending Movies</h2>
      <div className='text-center'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border rounded'
          placeholder='Enter movie name'
        />
        <button
          className='ml-2 p-2 bg-blue-600 text-white rounded'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <div className='flex flex-wrap items-center justify-around'>
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isInWatchlist={watchlist.some(m => m.imdbID === movie.imdbID)}
            toggleWatchlist={toggleWatchlist}
          />
        ))}
      </div>
      <div className='flex justify-center my-8'>
        {currentPage > 1 && (
          <button
            className='mx-2 p-2 bg-blue-600 text-white rounded'
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {getVisiblePages().map(page => (
          <button
            key={page}
            className={`mx-1 p-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            className='mx-2 p-2 bg-blue-600 text-white rounded'
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Movie;
