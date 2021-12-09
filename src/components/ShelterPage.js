import AuthService from "../services/auth.service";
import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import {
    alpha,
    Box,
    Button, Checkbox,
    Container,
    CssBaseline, FormControlLabel, IconButton, Modal,
    Paper,
    Stack, Switch,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import {visuallyHidden} from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import * as React from "react";


function createData(name, gender, age, race, color) {
    return {
        name,
        gender,
        age,
        race,
        color,
    };
}

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'gender',
        numeric: true,
        disablePadding: false,
        label: 'Gender',
    },
    {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: 'Age',
    },
    {
        id: 'race',
        numeric: true,
        disablePadding: false,
        label: 'Race',
    },
    {
        id: 'color',
        numeric: true,
        disablePadding: false,
        label: 'Color',
    },
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Pets
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

//AddPet modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': {m: 1, width: '25ch'}
};

export default function ShelterPage() {
    const [user, setUser] = useState({})
    const username = AuthService.getCurrentUser().username
    const [pets, setPets] = useState([])
    let rows = []


    const getShelter = async () => {
        const data = await axios.get(`http://localhost:8080/api/shelter/profile/${username}`,
            {headers: authHeader()})
        const resp = await data.data
        console.log(resp)
        console.log(username)
        setUser(resp)
    }

    const getPets = async () => {
        await getShelter()
        const data = await axios.get(`http://localhost:8080/api/pet/list/${AuthService.getCurrentUser().id}`,
            {headers: authHeader()})
        const res = await data.data
        console.log(res)
        setPets(res)
    }

    useEffect(() => {
        getPets()

    }, [])

    pets.forEach((pet) => {
        rows.push(createData(pet.name, pet.gender, pet.age, pet.race, pet.color))
    })

    //table variables
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    //Pet modal variables
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [gender, setGender] = useState();

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };
    const genders = [
        {
            value: 'FEMALE',
            label: 'F',
        },
        {
            value: 'MALE',
            label: 'M',
        },
        {
            value: 'OTHER',
            label: 'OTHER',
        },
    ];
    const [values, setValues] = useState({
        name: '',
        gender: '',
        age: '',
        race: '',
        color: '',
        description: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    return (
        <div>
            <CssBaseline/>
            <Container maxWidth="md">
                <img
                    src={"https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"}
                    alt={"https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"}
                />
                <Box sx={{height: '90vh'}}>
                    <Typography variant="h2" align="center" bgcolor='#F0E6EF'>{username}</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color="secondary" variant="contained" onClick={handleOpen}>Add pet</Button>
                        {/*AddPet modal start*/}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add pet
                                </Typography>
                                <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                                    <TextField
                                        label="name"
                                        id="name"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                    />
                                    <TextField
                                        id="select-gender"
                                        select
                                        label="gender"
                                        value={gender}
                                        onChange={handleChangeGender}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        color="secondary"
                                    >
                                        {genders.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                    <TextField
                                        label="age"
                                        id="age"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.age}
                                        onChange={handleChange('age')}
                                    />
                                    <TextField
                                        label="race"
                                        id="race"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.race}
                                        onChange={handleChange('race')}
                                    />
                                    <TextField
                                        label="color"
                                        id="color"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.color}
                                        onChange={handleChange('color')}
                                    />
                                    <Button sx={{margin: 'auto', width: 'min-content', m: 1}}
                                            type="submit"
                                            color="secondary" variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                        {/*AddPet modal end*/}
                        <Button color="secondary" variant="contained">Add activity</Button>
                    </Stack>
                    <Paper sx={{width: '100%', mb: 2}}>
                        <EnhancedTableToolbar numSelected={selected.length}/>
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
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row.name)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.gender}</TableCell>
                                                    <TableCell align="right">{row.age}</TableCell>
                                                    <TableCell align="right">{row.race}</TableCell>
                                                    <TableCell align="right">{row.color}</TableCell>
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
                            count={rows.length}
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
                </Box>

            </Container>
        </div>
    )
}