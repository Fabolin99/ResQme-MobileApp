import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const useFavoriteContext = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (pet) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((p) => p.name === pet.name)
        ? prevFavorites.filter((p) => p.name !== pet.name)
        : [...prevFavorites, pet]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
