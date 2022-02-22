import axios from "axios";
import {authHeader, AuthService} from "pet-project-frontend-sharedcomponents";
import {useEffect, useState} from "react";
import MyPetsTable from "./MyPetsTable";
import MyAdoptionsTable from "./MyAdoptionsTable";

export default function Adoptions() {
    const [loading, setLoading] = useState(true)
    const [adoptions, setAdoptions] = useState([])
    const [filteredAdoptions, setFilteredAdoptions] = useState([])

    const headCells = [
        {
            id: 'status',
            numeric: true,
            disablePadding: false,
            label: 'Status'
        },
        {
            id: 'pet name',
            numeric: true,
            disablePadding: false,
            label: 'Pet name'
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Action'
        }
    ]

    const getAdoptions = async () => {
        const data = await axios.get(`http://localhost:8080/api/adoptions?shelterId=${AuthService.getCurrentUser().id}`,
            {headers: authHeader()})
        const res = await data.data
        console.log(res)
        setAdoptions(res)

    }

    const capitalize = (petName) => {
        return petName.charAt(0).toUpperCase() + petName.slice(1)
    }


    const handleSearchAdoption = (e) => {
        console.log(e.target.value)
        if (e.key === 'Enter')
            setFilteredAdoptions(adoptions.filter(pet => capitalize(pet.name).includes(e.target.value)))
    }

    const handleDeleteAdoption = () => {

    }

    useEffect(() => {
        getAdoptions()
    }, [])

    return (
        <div>
            <MyAdoptionsTable
                entity={adoptions}
                handleSearch={handleSearchAdoption}
                handleDelete={handleDeleteAdoption}
                setFiltered={setFilteredAdoptions}
                filtered={filteredAdoptions}
                delete={handleDeleteAdoption}
                headCells={headCells}
            />
        </div>
    )
}