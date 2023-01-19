import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem } from "./ImageGalleryItem";
import imagesApi from '../../api/image-searcher-api';
import { Modal } from '../Modal';
import { ImageGalleryList } from "./ImageGallery.styled";
import { Loader } from "components/Loader";
import { Button } from "components/Button";

export const ImageGallery = ({ searchValue }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);

    const [currentLargeImg, setCurrentLargeImg] = useState('');
    const [currentAlt, setCurrentAlt] = useState(''); 

    useEffect(() => {
            setError(null);
            setLoading(false);
            setShowModal(false);
            setValue(searchValue);
            setImages([]);
            setPage(1);
            setTotalHits(0);
    }, [searchValue]);

    useEffect(() => {
        if (!value) {
            setValue(searchValue);
            return;
        }
        setLoading(true);
        imagesApi.fetchImages(value, page)
            .then(({ hits, totalHits }) => {
                if (!hits.length) {
                    return Promise.reject(
                        toast.error(`No photos for search query: ${value}`)
                    )
                };
                const imagesForLoadMore = hits.map(
                    ({ id, tags, webformatURL, largeImageURL }) => ({
                        id,
                        tags,
                        webformatURL,
                        largeImageURL,
                    })
                );
                setImages(prevImgs => ([...prevImgs, ...imagesForLoadMore]));
                setTotalHits(totalHits);     
            })
            .catch(error => {
                setError(error);
                setTotalHits(0);
            })
            .finally(() => setLoading(false));
    }, [page, value]);

    const onImgClick = (e) => {
        setCurrentLargeImg(e.target.attributes[2].nodeValue);
        setCurrentAlt(e.target.attributes[1].nodeValue);
        toggleModal();
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    };    

    const onLoadMoreBtnClick = () => {
        setPage(prev => (prev + 1 ));
    }

    return (<>
        {!error && (
            <ImageGalleryList onClick={onImgClick}>
                {images.map(({ id, tags, webformatURL, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        id={id}
                        tags={tags}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                    />
                ))}
            </ImageGalleryList>)}
        {loading && (<Loader />)}
        {images.length < totalHits && (
            <Button onClick={onLoadMoreBtnClick}>LoadMore</Button>
        )}
                
        {showModal && <Modal onClose={toggleModal} >
            {/* <p>Here is your image</p> */}
            <img src={currentLargeImg} alt={currentAlt}/>
        </Modal>}
    </>
    );
};