import React, { useState, } from 'react';
import './Styles.scss';
import ImageList from '@mui/material/ImageList/ImageList';
import ImageListItem from '@mui/material/ImageListItem/ImageListItem';
import Modal from '@mui/material/Modal/Modal';
import Fade from '@mui/material/Fade/Fade';
import Backdrop from '@mui/material/Backdrop/Backdrop';

const itemData = [
    {
        img: process.env.PUBLIC_URL + "/images/andromeda-08-21-23-short-stack.jpg",
        title: 'Andromeda',
    },
    {
        img: process.env.PUBLIC_URL + "/images/jupiter-gimp2-6se-11-03-23.jpg",
        title: 'Jupiter',
    },
    {
        img: process.env.PUBLIC_URL + "/images/orion-multi.jpg",
        title: 'Orion',
    },
    {
        img: process.env.PUBLIC_URL + "/images/orion-nebula-300mm-10-05-2023.jpg",
        title: 'Orion',
    },
    {
        img: process.env.PUBLIC_URL + "/images/orion-nebula-take3.jpg",
        title: 'Orion',
    },
    {
        img: process.env.PUBLIC_URL + "/images/perseid-composite.jpg",
        title: 'Perseid',
    },
    {
        img: process.env.PUBLIC_URL + "/images/pleiades-10-08-2023.jpg",
        title: 'Pleiades',
    },
    {
        img: process.env.PUBLIC_URL + "/images/moon.jpg",
        title: 'Moon',
    },
    {
        img: process.env.PUBLIC_URL + "/images/sun.jpg",
        title: 'Sun',
    },
]


export default function ImageLibrary() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("false");

    const handleClose = () => {
        setOpen(false);
    };

    const handleImage = (value: any) => {
        setImage(value);
        setOpen(true);
    };

    return (
        <React.Fragment>
            <ImageList cols={3} >
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            onClick={() => handleImage(item.img)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                classes={{ root: "ImageModalContent" }}
                slots={{ backdrop: Backdrop }}
            >
                <Fade in={open} timeout={500}>
                    <img src={image} style={{ maxHeight: "90vh", maxWidth: "90vw", zIndex: 1 }} />
                </Fade>
            </Modal>
        </React.Fragment>
    );
}
