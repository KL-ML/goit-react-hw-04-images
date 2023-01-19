import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from "./Searchbar";
import { Box } from "./Box";

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
  }
  
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr"
      gridGap="16px"
      pb="24px"
    >
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2000} position="top-right" theme="light" />
      <ImageGallery searchValue={searchValue} />
    </Box>
  );
};