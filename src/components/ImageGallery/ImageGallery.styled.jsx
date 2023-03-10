import styled from "@emotion/styled";

export const ImageGalleryList = styled.ul`
    display: grid;
    max-width: calc(100vw - 48px);
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 16px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
`

export const ImageForModal = styled.img`
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
    border-radius: 3px;
`