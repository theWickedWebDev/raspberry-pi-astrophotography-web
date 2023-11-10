import React, { CSSProperties } from 'react';
import { Chip, SxProps, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { TemplateSelectInput, IsoInput, ApertureInput, ShutterSpeedInput, ShootingModeInput, ImageFormatInput, CameraLcdItem, FrameCountInput, LensInput, FocalLengthInput, TargetInput } from './Inputs';
import { useRecoilState } from 'recoil';
import cameraState from '../../State/camera';
import queueState, { QueueType } from '../../State/queue';

const driveModeSx: SxProps = { position: "relative" }
const driveModeSxSec: CSSProperties = { position: 'absolute', bottom: '0', right: -7, fontWeight: 'bold' }
const hqStyle: CSSProperties = { display: 'inline-block' }
const iqStyle: CSSProperties = { display: 'inline-block', background: '#000', height: ' 24px', width: '18px', borderTopLeftRadius: '100%' }
const singleShootStyle: CSSProperties = { border: 'solid 3px #000', height: 26, width: 36, position: 'relative', background: '#e4e4e4' };
const singleShootStyleBase: CSSProperties = { position: 'relative', height: 26, width: 36 }
const continuousShootStyle: CSSProperties = { position: 'absolute', border: 'solid 3px #000', background: '#e4e4e4', height: 26, width: 36, };

const SingleShootingIcon = ({ continuous }: { continuous?: boolean }) => (continuous ? <div style={singleShootStyleBase}><div style={{ ...continuousShootStyle, top: 3, left: 3 }}></div><div style={{ ...continuousShootStyle, top: -1, left: -1 }}></div><div style={{ ...continuousShootStyle, top: -5, left: -5 }}></div></div> : <div style={singleShootStyle} />);
const SelfTimer2SecIcon = ({ continuous }: { continuous?: boolean }) => (<Typography sx={{ ...driveModeSx, display: 'inline-block' }}><TimerOutlinedIcon fontSize='large' /><span style={driveModeSxSec}>{continuous ? 'C' : 2}</span></Typography>)

const FrontPanel = () => {
    const [{ configuration }, setCamera] = useRecoilState(cameraState);
    const [queue, setQueue] = useRecoilState(queueState);
    const { target, lens, focalLength, aperture, shutterspeed, iso, imageformat, shootingmode, frames } = configuration;
    const canStartCapture = ![lens, focalLength, aperture, shutterspeed, iso, imageformat, shootingmode, frames].some(v => v === undefined);

    const addToQueue = () => {
        const newQueueItem = {
            start: new Date().toISOString(),
            framesRemaining: frames,
            configuration
        } as QueueType;
        setQueue([...queue, newQueueItem]);
    }

    if (queue.some(q => q.inProgress || q.complete)) { return null; }
    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={6}><LensInput /></Grid>
            <Grid xs={6}><FocalLengthInput /></Grid>
            <Grid xs={12}><TemplateSelectInput /></Grid>
            <Grid xs={4}><ShutterSpeedInput /></Grid>
            <Grid xs={4}><FrameCountInput /></Grid>
            <Grid xs={4}><ApertureInput /></Grid>
            <Grid xs={4}><ShootingModeInput /></Grid>
            <Grid xs={4}><IsoInput /></Grid>
            <Grid xs={4}><ImageFormatInput /></Grid>
            <Grid xs={12}><ImageFormatInput /></Grid>
            <Grid xs={12}><TargetInput /></Grid>
            <Grid xs={6}>
                <CameraLcdItem
                    label="Total Exposure:"
                    text={frames && shutterspeed ? (frames * parseInt(shutterspeed.replace('BULB ', '')) / 60).toFixed(2) + "m" : '---'}
                />
            </Grid>
            <Grid xs={3}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip disabled={!canStartCapture} onClick={addToQueue} label="Save template" color="secondary" variant="filled" />
                </div>
            </Grid>
            <Grid xs={3}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip disabled={!canStartCapture} onClick={addToQueue} label="Add to queue" color="primary" variant="filled" />
                </div>
            </Grid>
            {/* <Grid xs={6}><CameraLcdItem><img height="130px" src={process.env.PUBLIC_URL + "/images/hist-example.jpg"} /></CameraLcdItem></Grid>
            <Grid xs={6}><CameraLcdItem><SelfTimer2SecIcon /></CameraLcdItem></Grid>
            <Grid xs={12}><CameraLcdItem><Chip label="Capture in progress..." color="error" variant="filled" /></CameraLcdItem></Grid> */}
        </Grid >
    );
}

export default FrontPanel;
