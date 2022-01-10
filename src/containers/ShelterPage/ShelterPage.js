import AuthService from "../../services/auth.service";
import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import {
    alpha,
    Box,
    Button, Checkbox,
    Container,
    CssBaseline, FormControl, FormControlLabel, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Modal,
    Paper, Select,
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
import {Link, useHistory} from "react-router-dom";
import PetDetails from "../PetDetails/PetDetails";


export default function ShelterPage() {
    const [user, setUser] = useState({})
    const [pets, setPets] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //Pet modal variables
    const [open, setOpen] = useState(false);
    let [gender, setGender] = useState();
    const [values, setValues] = useState({
        name: '',
        age: '',
        race: '',
        color: '',
        description: '',
    });
    const genders = [
        {
            value: 'FEMALE',
            label: 'female',
        },
        {
            value: 'MALE',
            label: 'male',
        },

    ];
    const photos = [
        {
            img: 'https://www.peggyadams.org/sites/default/files/images/How%20to%20Help/Capital%20Campaign/lobby.jpg',
            title: 'Shelter1',
        },
        {
            img: 'https://www.careermatch.com/job-prep/wp-content/uploads/sites/2/2017/11/Animal_Shelter_Worker_Profile_Image.jpg',
            title: 'Shelter2',
        },]

    const getShelter = async () => {
        const data = await axios.get(`http://localhost:8080/api/shelter/profile/${AuthService.getCurrentUser().username}`,
            {headers: authHeader()})
        const resp = await data.data
        console.log(resp)
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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = pets.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        console.log(selectedIndex)
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
        console.log(selected)
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pets.length) : 0;

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        gender = ''
        values.race = ''
        values.age = ''
        values.name = ''
        values.description = ''
        values.color = ''
        setOpen(false)
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
        console.log(gender)
    };

    const onSubmitAddPet = async (e) => {
        e.preventDefault()
        console.log(values)
        let name = values.name
        let age = values.age
        let color = values.color
        let race = values.race
        let description = values.description
        await axios.post(`http://localhost:8080/api/pet/add/${AuthService.getCurrentUser().id}`,
            {
                name,
                gender,
                age,
                color,
                race,
                description
            })
        handleClose()
        await getPets()
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
            numeric: true,
            disablePadding: false,
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
                                'aria-label': 'select all pets',
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

        const handleDeletePet = async () => {
            selected.forEach((petId) => axios.delete(`http://localhost:8080/api/pet/delete/${petId}`))
            await getPets()
            setSelected([])
        }

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
                        <IconButton onClick={handleDeletePet}>
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

    return (
        <div>
            <Container maxWidth="md">
                <ImageList sx={{width: 'auto', height: 250, padding: '10px'}} cols={2} rowHeight={350}>
                    {photos.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={item.img}
                                srcSet={item.img}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Box sx={{padding: '10px'}}>
                    <Typography variant="h3" align="center"
                                bgcolor='#F0E6EF' fontFamily='Lora'
                                fontWeight='400'>{AuthService.getCurrentUser().username}</Typography>
                    <Stack direction="row" spacing={2} padding='10px'>
                        <Button color="secondary" variant="contained" sx={{fontFamily: 'Lora', fontWeight: '600'}}
                                onClick={handleOpen}>Add pet</Button>
                        {/*AddPet modal start*/}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <img width='30px' className="mr-2" src="/assets/gender.png" align='left'/>
                                <Typography id="modal-modal-title" variant="h6" component="h2" mb='10px'
                                            fontFamily='Lora' fontWeight='600'>
                                    Add pet
                                </Typography>
                                <Box onSubmit={onSubmitAddPet} component="form"
                                     sx={{display: 'table', textAlign: 'center'}}>
                                    <TextField
                                        label="name"
                                        id="name"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                    />
                                    <FormControl>
                                        <InputLabel color="secondary" id="select-gender">gender</InputLabel>
                                        <Select
                                            color="secondary"
                                            sx={{width: '21ch'}}
                                            labelId="select-gender"
                                            id="gender"
                                            value={gender}
                                            label="gender"
                                            onChange={handleChangeGender}>
                                            {genders.map((gender) => (
                                                <MenuItem key={gender.value} value={gender.value}>
                                                    {gender.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                    <TextField
                                        label="description"
                                        id="description"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.description}
                                        onChange={handleChange('description')}
                                    />
                                    <Button sx={{
                                        margin: 'auto', mt: '20px', display: 'table-cell', verticalAlign: 'bottom',
                                        fontFamily: 'Lora', fontWeight: '600'
                                    }}
                                            type="submit"
                                            color="secondary" variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                        {/*AddPet modal end*/}
                        <Button color="secondary" variant="contained"
                                sx={{fontFamily: 'Lora', fontWeight: '600'}}>Add activity</Button>
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
                                    rowCount={pets.length}
                                />
                                <TableBody>

                                    {stableSort(pets, getComparator(order, orderBy))
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
                                                    <TableCell align="right"><Link
                                                        to={{pathname: "/pet-details", state: pet.id}}>{pet.name}</Link></TableCell>
                                                    <TableCell align="right">{pet.gender}</TableCell>
                                                    <TableCell align="right">{pet.age}</TableCell>
                                                    <TableCell align="right">{pet.race}</TableCell>
                                                    <TableCell align="right">{pet.color}</TableCell>
                                                </TableRow>
                                            );
                                            //end return
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
                            count={pets.length}
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