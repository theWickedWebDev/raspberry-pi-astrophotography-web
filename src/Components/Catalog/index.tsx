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
import Checkbox from '@mui/material/Checkbox/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Order = 'asc' | 'desc' | undefined;
type OrderBy = keyof HeaderCell;

type HeaderCell = {
    id: keyof Row;
    label: string;
    sortable: boolean;
}

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


const HeaderCells: HeaderCell[] = [
    { id: 'image', label: 'Image', sortable: false },
    { id: 'c', label: 'ID', sortable: true },
    { id: 'name', label: "Name", sortable: true },
    { id: 'obj', label: 'Object', sortable: true },
    { id: 'ra', label: 'RA', sortable: true },
    { id: 'dec', label: 'DEC', sortable: true },
    { id: 'const', label: 'Constellation', sortable: true },
    { id: 'd', label: 'Distance', sortable: true },
    { id: 'm', label: 'Magnitude', sortable: true },
    { id: 'v', label: 'Visible', sortable: true },
    { id: 'captured', label: 'Captured', sortable: true },
];

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

const rows: Row[] = [...messierRows, ...starRows];

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
    console.log(order, orderBy)
    if (order === 'desc') {
        return rows.sort((a, b) => descendingComparator(a, b, orderBy))
    } else if (order === 'asc') {
        return rows.sort((a, b) => -descendingComparator(a, b, orderBy))
    }
    return rows
}

export default function () {
    const [order, setOrder] = useState<Order>()
    const [orderBy, setOrderBy] = useState<keyof Row>('c')

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
                                {row.image ?
                                    <div className="ThumbnailImage" style={{ backgroundImage: `url("${row.image}")` }}></div>
                                    : <StarIcon />}
                            </TableCell>
                            <TableCell>
                                <Chip size="small" color="primary" label={row.c} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.obj}</TableCell>
                            <TableCell>{row.ra}</TableCell>
                            <TableCell>{row.dec}</TableCell>
                            <TableCell>{row.const}</TableCell>
                            <TableCell>{row.d}</TableCell>
                            <TableCell>{row.m}</TableCell>
                            <TableCell>
                                {row.v === 'Always Visible' && <VisibilityIcon color="info" />}
                                {row.v === 'Sometimes Visible' && <VisibilityOffIcon color="warning" />}
                                {row.v === 'Never Visible' && <VisibilityOffIcon color="error" />}
                            </TableCell>
                            <TableCell> <Checkbox checked={row.captured} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
