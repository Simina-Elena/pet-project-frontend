import {
    Button,
    Checkbox,
    FormControlLabel,
    Paper, Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer, TablePagination,
    TableRow
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {EnhancedTableToolbar} from "../EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableHead from "../EnhancedTableHead/EnhancedTableHead";
import {Link} from "react-router-dom";
import capitalize from "@mui/utils/capitalize";
import axios from "axios";

export default function MyAdoptionsTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.entity.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.entity.length) : 0;

    const handleDelete = () => {
        props.delete(selected)
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    return (
        <div>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}
                                      searchPet={props.handleSearch}
                                      deletePet={handleDelete}
                                      filteredPets={props.setFiltered}
                                      tableName='Adoptions'
                />
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.entity.length}
                            headCells={props.headCells}
                        />

                        <TableBody>
                            {props.filtered.length === 0 ? stableSort(props.entity, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((adoption, index) => {
                                    const isItemSelected = isSelected(adoption.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={adoption.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleClick(event, adoption.id)}

                                                />
                                            </TableCell>
                                            <TableCell sx={{paddingLeft: '85px'}}>{adoption.adoptionStatus}</TableCell>
                                            <TableCell sx={{paddingLeft: '80px'}}><Link
                                                to={{
                                                    pathname: "/pet-details",
                                                    state: adoption.pet.id
                                                }}>{capitalize(adoption.pet.name)}</Link></TableCell>
                                            <TableCell><Stack justifyContent='center' direction='row'><Button color='secondary' disabled={adoption.adoptionStatus === 'ACCEPTED'} onClick={() => props.handleAccept(adoption.id)}>accept</Button><Button color='secondary' disabled={adoption.adoptionStatus === 'DECLINED'} onClick={() => props.handleDecline(adoption.id)}>decline</Button></Stack></TableCell>

                                        </TableRow>
                                    );
                                }) : stableSort(props.filtered, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((adoption, index) => {
                                    const isItemSelected = isSelected(adoption.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={adoption.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleClick(event, adoption.id)}

                                                />
                                            </TableCell>
                                            <TableCell sx={{paddingLeft: '85px'}}>{adoption.adoptionStatus}</TableCell>
                                            <TableCell sx={{paddingLeft: '80px'}}><Link
                                                to={{
                                                    pathname: "/pet-details",
                                                    state: adoption.pet.id
                                                }}>{capitalize(adoption.pet.name)}</Link></TableCell>
                                            <TableCell align="right"><Stack direction='row'><Button color='secondary' disabled={adoption.adoptionStatus === 'ACCEPTED'}>accept</Button><Button color='secondary' disabled={adoption.adoptionStatus === 'DECLINED'}>decline</Button></Stack></TableCell>

                                        </TableRow>
                                    );
                                })}

                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.entity.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </div>
    )
}