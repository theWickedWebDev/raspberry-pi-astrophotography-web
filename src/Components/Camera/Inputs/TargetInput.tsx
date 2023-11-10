import { useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import catalogData from '../../../data/objects';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField';

type TargetInputProps = {} & CameraLcdItemProps;

type Row = {
    id: string;
    image?: string;
    c: string;
    name: string;
    obj: string;
    ra: string;
    dec: string;
    const?: string;
    d?: number;
    m?: number;
    v?: string;
    captured: boolean;
}

const messierRows: Row[] = catalogData.messier.map((m, i) => ({
    id: m.id,
    image: m.image,
    c: m.messier,
    name: m.name,
    obj: m.object,
    ra: m.ra,
    dec: m.dec,
    const: m.constellation?.name,
    d: m.distance,
    m: m.magnitude,
    v: m.visible.label,
    captured: i % 3 === 0
}));

const starRows: Row[] = catalogData.stars.filter(s => s.name).map((m, i) => ({
    id: m.id,
    c: m.bayerDesignation,
    name: m.name,
    obj: 'Star',
    ra: m.ra,
    dec: m.dec,
    v: m.visible.label,
    const: m.constellation?.name,
    captured: i % 3 === 0
}));

const targetOptions: Row[] = [...messierRows, ...starRows];

const TargetInput = (props: TargetInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { configuration } = camera;
    const [value, setValue] = useState<{ label: string, value: string } | null>();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleSetTarget = (t: typeof targetOptions[number]) => {
        setCamera({ ...camera, configuration: { ...configuration, target: t.name } });
        handleClose()
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const _currentValue = targetOptions.find((option) => option.name === value?.label);

    const currentValue = _currentValue ? {
        value: _currentValue.id,
        label: _currentValue.name + ` (${_currentValue.c})`
    } : undefined;

    return (
        <>
            <CameraLcdItem
                {...props}
                onClick={handleClick}
            >
                <Autocomplete
                    fullWidth
                    blurOnSelect
                    options={targetOptions.map(o => ({ label: o.name + ` (${o.c})`, value: o.id }))}
                    value={currentValue}
                    onChange={(_, v: { label: string; value: string; } | null) => setValue(v)}
                    isOptionEqualToValue={(option, value) =>
                        option === value
                    }
                    inputValue={value?.label}
                    autoHighlight
                    renderOption={(props, option) => (
                        <li key={option.value} {...props}>
                            {option.label}
                        </li>
                    )}
                    filterOptions={(o, { inputValue }) => o.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            key={params.id}
                            variant="standard"
                            label="Target"
                            name="Capture Target"
                            placeholder="Select a target"
                        />
                    )}
                />

            </CameraLcdItem>
        </>
    )
}

export default TargetInput;