import React from "react";
import { Grid } from 'react-loader-spinner'
import { LoaderDiv } from './Loader.styled';

export const Loader = () => {
    return (
        <LoaderDiv>
            <Grid
                height="170"
                width="170"
                color="#3f51b5fe"
                ariaLabel="grid-loading"
                radius="10"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </LoaderDiv>
    );
};