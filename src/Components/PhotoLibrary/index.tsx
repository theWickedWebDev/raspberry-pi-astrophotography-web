import React, { useEffect, useState, } from 'react';
import './Styles.scss';
import ImageList from '@mui/material/ImageList/ImageList';
import ImageListItem from '@mui/material/ImageListItem/ImageListItem';
import Modal from '@mui/material/Modal/Modal';
import Fade from '@mui/material/Fade/Fade';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import { getExif } from '../../lib/exif';
import { Tags } from 'exifreader';
import Box from '@mui/material/Box/Box';
import Chip from '@mui/material/Chip/Chip';
import IsoIcon from '@mui/icons-material/Iso';
import CameraIcon from '@mui/icons-material/Camera';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconProps, IconTypeMap, Typography } from '@mui/material';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

type Image = { src: string; title: string; }

const itemData = [
    {
        src: process.env.PUBLIC_URL + "/images/andromeda-sub.jpg",
        title: 'Andromeda',
    },
    {
        src: process.env.PUBLIC_URL + "/images/sample.jpg",
        title: 'Orion',
    },
    {
        src: process.env.PUBLIC_URL + "/images/andromeda-08-21-23-short-stack.jpg",
        title: 'Andromeda',
    },
    {
        src: process.env.PUBLIC_URL + "/images/jupiter-gimp2-6se-11-03-23.jpg",
        title: 'Jupiter',
    },
    {
        src: process.env.PUBLIC_URL + "/images/orion-multi.jpg",
        title: 'Orion',
    },
    {
        src: process.env.PUBLIC_URL + "/images/orion-nebula-300mm-10-05-2023.jpg",
        title: 'Orion',
    },
    {
        src: process.env.PUBLIC_URL + "/images/orion-nebula-take3.jpg",
        title: 'Orion',
    },
    {
        src: process.env.PUBLIC_URL + "/images/perseid-composite.jpg",
        title: 'Perseid',
    },
    {
        src: process.env.PUBLIC_URL + "/images/pleiades-10-08-2023.jpg",
        title: 'Pleiades',
    },
    {
        src: process.env.PUBLIC_URL + "/images/moon.jpg",
        title: 'Moon',
    },
    {
        src: process.env.PUBLIC_URL + "/images/sun.jpg",
        title: 'Sun',
    },
] as Image[]


export default function ImageLibrary() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<Image | undefined>();

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
                    <ImageListItem key={item.src}>
                        <img
                            src={item.src}
                            alt={item.title}
                            loading="lazy"
                            onClick={() => handleImage(item)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            {open && image && <ImageDetail image={image} open={open} onClose={handleClose} />}
        </React.Fragment>
    );
}

const ImageDetail = (props: { image: Image, open: boolean, onClose: () => void }) => {
    const { image, open, onClose } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<Tags>();

    useEffect(() => {
        const run = async () => {
            const data = await getExif(image.src);
            setTags(data)
            setLoading(false);
        }

        if (image.src && !loading) {
            setLoading(true);
            run().catch(e => {
                setLoading(false);
                console.error(e);
            })
        }
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => onClose()}
            closeAfterTransition
            classes={{ root: "ImageModalContent" }}
            slots={{ backdrop: Backdrop }}
        >
            <Fade in={open} timeout={500}>
                <Box style={{ zIndex: 10, background: '#fff' }}>
                    <List role="presentation" orientation="horizontal">
                        <ListItem><Typography variant='h5'>{image.title}</Typography></ListItem>
                        <ListItem style={{ position: 'absolute', right: '0' }}><ImageMetaTag outline tags={tags} tag="DateTime" icon={<CalendarMonthIcon />} /></ListItem>
                    </List>
                    <img src={image.src} alt={image.title} style={{ maxHeight: "90vh", maxWidth: "90vw" }} />

                    <List role="presentation" orientation="horizontal">
                        <ListItem><ImageMetaTag tags={tags} tag="Model" icon={<CameraAltIcon />} /></ListItem>
                        <ListItem><ImageMetaTag tags={tags} tag="FocalLength" icon={<FilterCenterFocusIcon />} /></ListItem>
                        <ListItem><ImageMetaTag tags={tags} tag="ISOSpeedRatings" icon={<IsoIcon />} /></ListItem>
                        <ListItem><ImageMetaTag tags={tags} tag="ApertureValue" icon={<CameraIcon />} /></ListItem>
                        <ListItem><ImageMetaTag tags={tags} tag="ShutterSpeedValue" icon={<ShutterSpeedIcon />} /></ListItem>
                    </List>
                </Box>
            </Fade>
        </Modal >
    )
}

const ImageMetaTag = (props: { tags: Tags | undefined, tag: keyof Tags, icon: any, outline?: boolean }) => {
    const { tags, tag, icon, outline } = props;

    if (tags && tags[tag]?.description) {
        return (
            <Chip color='primary' variant={outline ? "outlined" : "filled"} label={<React.Fragment>{icon}{tags[tag].description}</React.Fragment>} />)
    }
    return null;
}