import queueState from '../../../State/queue';
import { useRecoilState } from 'recoil';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import Chip from '@mui/material/Chip/Chip';
import { Box, Button, IconButton } from '@mui/material';
import { ISOIcon } from '../Inputs/IsoInput';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { CSSProperties } from 'react';

type QueueProps = {};

const thumbnailStyle = {
    backgroundColor: '#000',
    width: '100px',
    height: '100px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundImage: `url("${process.env.PUBLIC_URL + "/images/andromeda-sub.jpg"}")`
} as CSSProperties;

const ExampleThumbnailStrip = () => (
    <div style={thumbnailStyle} />
)

const Queue = (props: QueueProps) => {
    const [queue, setQueue] = useRecoilState(queueState);

    const canStartCapture = queue.length > 0;

    const cancelled = queue.some(q => q.cancelled);
    const inProgress = queue.some(q => q.inProgress);
    const complete = queue.some(q => q.complete);
    const started = inProgress || complete;

    const startCapture = () => {
        const [first, ...rest] = queue;
        setQueue([{ ...first, inProgress: true }, ...rest])
    }

    const cancelCapture = () => {
        setQueue(queue.map(q => ({ ...q, cancelled: true, inProgress: false })))
    }

    if (started || queue.length > 0 || cancelled) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ paddingBottom: 0 }}>Queue</Typography>
                <Typography variant="body2" sx={{ width: '100%', paddingBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} marginTop={0} paddingTop={0}>
                    {inProgress && <span>Capture in progress...</span>}
                    {inProgress && <Button variant="contained" size="small" color="error" onClick={cancelCapture} sx={{ fontWeight: 'normal' }}>
                        <CancelOutlinedIcon fontSize="small" />&nbsp;Cancel Capture
                    </Button>}
                    {!inProgress && <div />}
                    {!started && <Button variant="contained" size="small" color="error" onClick={startCapture} sx={{ fontWeight: 'normal' }}>
                        <PlayCircleFilledOutlinedIcon fontSize="small" />&nbsp;Start Capture
                    </Button>}
                </Typography>
                <Grid container sx={{ alignItems: 'center' }} rowSpacing={2}>
                    {queue.map((q, i) => {
                        return (
                            <>
                                <Grid item xs={1}>
                                    {
                                        q.complete
                                            ? <CheckOutlinedIcon color="success" />
                                            : q.inProgress
                                                ? <>
                                                    <RefreshOutlinedIcon color="secondary" className="Rotate InProgressIcon" />
                                                    <PauseOutlinedIcon color="error" className="PauseIcon" />
                                                </>
                                                : <Chip
                                                    label={i + 1}
                                                    variant={'filled'}
                                                />
                                    }
                                </Grid>
                                <Grid item xs={11}>
                                    <Grid container columnSpacing={2} sx={{ alignItems: 'center' }}>
                                        <Grid item sx={{ width: '100%', whiteSpace: 'nowrap' }}>
                                            <Typography variant="caption">{new Date(q.start).toLocaleString()}</Typography>
                                        </Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap' }}><ISOIcon />{q.configuration.iso}</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap' }}>ƒ/{q.configuration.aperture}</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap' }}>{q.configuration.shutterspeed}s</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap' }}>{q.configuration.iso}</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap' }}>{q.configuration.shootingmode === 'M' ? 'Manual' : q.configuration.shootingmode === 'Av' ? 'Aperture Priority' : ''}</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap' }}>{`Frames: ${q.framesRemaining}/${q.configuration.frames}`}</Grid>
                                        {(q.inProgress || q.complete) &&

                                            <Grid item xs={12} direction="column" sx={{ gap: 1, display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                                                {
                                                    new Array(q.inProgress ? 2 : 10)
                                                        .fill('')
                                                        .map((_, i) => (
                                                            <Grid key={i} item xs={1}>
                                                                <ExampleThumbnailStrip />
                                                            </Grid>
                                                        ))
                                                }
                                            </Grid>
                                        }
                                        {(q.inProgress || q.complete) &&
                                            <Grid item xs={12}>
                                                <Grid container gap={2} marginTop={1}>
                                                    <Grid item>
                                                        <Typography variant="caption">
                                                            <Button size="small" variant="outlined">
                                                                <CameraAltOutlinedIcon />&nbsp;
                                                                View all photos
                                                            </Button>
                                                        </Typography>
                                                    </Grid>
                                                    {q.complete && <Grid item>
                                                        <Typography variant="caption">
                                                            <Button size="small" variant="outlined">
                                                                <CameraAltOutlinedIcon />&nbsp;
                                                                Stack photos
                                                            </Button>
                                                        </Typography>
                                                    </Grid>}
                                                </Grid>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </>
                        )
                    })}
                </Grid>
            </Box >
        )
    } else {
        return null;
    }
}

export default Queue;