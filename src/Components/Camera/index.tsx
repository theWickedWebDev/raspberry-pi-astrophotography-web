import Setup from './Setup';
import Queue from './Queue';

export default function Camera() {
    return (
        <>
            <Setup />
            <Queue />
        </>
    );
}

/*
{settings.lens &&
    <FormControl disabled={!settings.lens} sx={{ m: 1, minWidth: 80 }}>
        <InputLabel>White Balence</InputLabel>
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={settings.whitebalance || c.whiteBalences[0].index}
            onChange={handleChange}
            name='whitebalance'
            autoWidth
            label="White Balence"
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {c.whiteBalences.map(f => <MenuItem value={f.index}>{f.value}</MenuItem>)}
        </Select>
    </FormControl>
*/