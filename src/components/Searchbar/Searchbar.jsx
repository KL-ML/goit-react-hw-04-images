import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SearchForm, SearchbarHeader, SearchFormButton, SearchFormInput } from './Searchbar.styled';
import { RiSearch2Line } from 'react-icons/ri';
import { IconContext } from "react-icons";

export const Searchbar = ({ onSubmit }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = e => {
        setSearchValue(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (searchValue.trim() === '') {
            toast.error("Enter search value !");
            return;
        }
        
        onSubmit(searchValue);
        setSearchValue('');
    };

    return (
        <SearchbarHeader>
            <SearchForm onSubmit={handleSubmit}>
                <IconContext.Provider value={{ size: '2em' }}>
                    <SearchFormButton type="submit">
                        <RiSearch2Line />
                    </SearchFormButton>
                </IconContext.Provider>

                <SearchFormInput
                    type="text"
                    name="searchValue"
                    value={searchValue}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </SearchForm>
        </SearchbarHeader>
    );
};