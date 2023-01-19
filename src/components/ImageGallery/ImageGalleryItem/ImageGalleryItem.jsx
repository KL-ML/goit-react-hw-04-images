import React from 'react';
import { GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags, id }) => {
    
    return (
        <>
            <GalleryItemImage
                src={webformatURL}
                alt={tags}
                href={largeImageURL}
                loading="lazy"
                id={id}
            />
        </>
    );
};
