import React, { useState } from 'react';

const WatchList = ({ watchlist, toggleWatchlist }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'popularity', direction: 'descending' });

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    if (sortConfig.key === 'popularity') {
      return sortConfig.direction === 'ascending' ? a.imdbRating - b.imdbRating : b.imdbRating - a.imdbRating;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Watchlist</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2" onClick={() => handleSort('title')}>Title</th>
            <th className="py-2">Image</th>
            <th className="py-2" onClick={() => handleSort('year')}>Year</th>
            <th className="py-2" onClick={() => handleSort('popularity')}>Popularity</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedWatchlist.map((movie) => (
            <tr key={movie.imdbID}>
              <td className="py-2 px-4 ">{movie.Title}</td>
              <td className="py-2 px-4 "> <img className='inline-block ml-4' src={movie.Poster} alt="movieCard" width={100} /></td>
              <td className="py-2 px-4">{movie.Year}</td>
              <td className="py-2 px-4">{movie.imdbRating}</td>
              <td className="py-2 px-4">
                <button
                  className="p-2 bg-red-600 text-white rounded"
                  onClick={() => toggleWatchlist(movie)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
