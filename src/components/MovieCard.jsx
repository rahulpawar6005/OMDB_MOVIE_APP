import React from 'react';

const MovieCard = ({ movie, isInWatchlist, toggleWatchlist }) => {
  return (
    <div className='overflow-hidden relative h-[50vh] w-[225px] my-3 bg-cover bg-center rounded-md cursor-pointer hover:scale-110' style={{ backgroundImage: `url(${movie.Poster})` }}>
      <div className='text-end p-2 text-xl shadow-md' onClick={() => toggleWatchlist(movie)}>
        {isInWatchlist ? '❌' : '😍'}
      </div>
      <div className='overflow-hidden text-white rounded-md absolute bottom-0 text-center w-full text-[14px] py-2 bg-gray-900/55 bg-cover bg-center'>
        <h3>{movie.Title} ({movie.Year})</h3>
      </div>
    </div>
  );
};

export default MovieCard;
