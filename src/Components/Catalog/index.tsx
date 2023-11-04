import React, { useMemo, useState } from 'react';
import catalogData from '../../data/objects';
import type { Constellation } from '../../data/objects';
import Paper from '@mui/material/Paper/Paper';
import Table from '@mui/material/Table/Table';
import TableHead from '@mui/material/TableHead/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import TableCell from '@mui/material/TableCell/TableCell';
import TableBody from '@mui/material/TableBody/TableBody';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import './Styles.scss';
import Chip from '@mui/material/Chip/Chip';
import Box from '@mui/material/Box/Box';
import TableSortLabel from '@mui/material/TableSortLabel';


// type Header = 'Image' | 'M' | "Name" | 'Object' | 'RA' | 'DEC' | 'Constellation' | 'Distance' | 'Magnitude';

type Order = 'asc' | 'desc' | undefined;
type OrderBy = keyof HeaderCell;

type HeaderCell = {
    id: keyof Row;
    label: string;
    isNumeric?: boolean;
    sortable: boolean;
}

type Row = {
    id: string;
    image: string;
    messier: string;
    name: string;
    obj: string;
    ra: string;
    dec: string;
    const?: Constellation;
    d: number;
    m: number;
}


const HeaderCells: HeaderCell[] = [
    { id: 'image', label: 'Image', sortable: false },
    { id: 'messier', label: 'M', sortable: true },
    { id: 'name', label: "Name", sortable: true },
    { id: 'obj', label: 'Object', sortable: true },
    { id: 'ra', label: 'RA', sortable: true },
    { id: 'dec', label: 'DEC', sortable: true },
    { id: 'const', label: 'Constellation', sortable: true },
    { id: 'd', label: 'Distance', isNumeric: true, sortable: true },
    { id: 'm', label: 'Magnitude', isNumeric: true, sortable: true },
];

const rows: Row[] = catalogData.messier.map(m => ({
    id: m.id,
    image: m.image,
    messier: m.messier,
    name: m.name,
    obj: m.object,
    ra: m.ra,
    dec: m.dec,
    const: m.constellation,
    d: m.distance,
    m: m.magnitude
}))

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const sort = (rows: Row[], order: Order, orderBy: keyof Row) => {
    if (order === 'desc') {
        return rows.sort((a, b) => descendingComparator(a, b, orderBy))
    } else if (order === 'asc') {
        return rows.sort((a, b) => -descendingComparator(a, b, orderBy))
    }
    return rows
}

export default function () {
    const [order, setOrder] = useState<Order>()
    const [orderBy, setOrderBy] = useState<keyof Row>('messier')

    const handleRequestSort = (property: keyof Row) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () => sort(rows, order, orderBy),
        [order, orderBy],
    );

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        {HeaderCells.map((cell) => (
                            <TableCell key={cell.id}>
                                {
                                    !cell.sortable
                                        ? cell.label
                                        : <TableSortLabel
                                            active={orderBy === cell.id}
                                            direction={orderBy === cell.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(cell.id)}
                                        >
                                            {cell.label}
                                            {orderBy === cell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <div className="ThumbnailImage" style={{ backgroundImage: `url("${row.image}")` }}></div>
                            </TableCell>
                            <TableCell>
                                <Chip size="small" color="primary" label={row.messier} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.obj}</TableCell>
                            <TableCell>{row.ra}</TableCell>
                            <TableCell>{row.dec}</TableCell>
                            <TableCell>{row.const?.name}</TableCell>
                            <TableCell>{row.d}</TableCell>
                            <TableCell>{row.m}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
