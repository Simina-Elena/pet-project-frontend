import {
    Checkbox,
    FormControlLabel,
    Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from "@mui/material";
import {EnhancedTableToolbar} from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import {Link} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import capitalize from "@mui/utils/capitalize";

export default function MyPetsTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    console.log(props)

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
                                      searchEntity={props.handleSearch}
                                      deleteEntity={handleDelete}
                                      filteredEntity={props.setFiltered}
                                      tableName='Pets'
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
                                .map((pet, index) => {
                                    const isItemSelected = isSelected(pet.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={pet.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleClick(event, pet.id)}

                                                />
                                            </TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}><Link
                                                to={{
                                                    pathname: "/pet-details",
                                                    state: pet.id
                                                }}>{capitalize(pet.name)}</Link></TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}>{pet.gender}</TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}>{pet.age}</TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}>{pet.race}</TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}>{pet.color}</TableCell>
                                        </TableRow>
                                    );
                                }) : stableSort(props.filtered, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((pet, index) => {
                                    const isItemSelected = isSelected(pet.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={pet.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleClick(event, pet.id)}

                                                />
                                            </TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}><Link
                                                to={{
                                                    pathname: "/pet-details",
                                                    state: pet.id
                                                }}>{capitalize(pet.name)}</Link></TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}>{pet.gender}</TableCell>
                                            <TableCell sx={{paddingLeft: '40px'}}>{pet.age}</TableCell>
                                            <TableCell sx={{paddingLeft: '60px'}}>{pet.race}</TableCell>
                                            <TableCell sx={{paddingLeft: '60px'}}>{pet.color}</TableCell>
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
