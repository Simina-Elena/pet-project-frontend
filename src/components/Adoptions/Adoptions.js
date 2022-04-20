import axios from "axios";
import {authHeader, AuthService} from "pet-project-frontend-sharedcomponents";
import {useEffect, useState} from "react";
import MyAdoptionsTable from "../MyAdoptionsTable/MyAdoptionsTable";
import {useToasts} from "react-toast-notifications";

export default function Adoptions(props) {
    const [loading, setLoading] = useState(true);
    const [adoptions, setAdoptions] = useState([]);
    const [filteredAdoptions, setFilteredAdoptions] = useState([]);
    const {addToast} = useToasts();

    const headCells = [
        {
            id: 'status',
            label: 'Status'
        },
        {
            id: 'pet name',
            label: 'Pet name'
        },
        {
            id: 'action',
            label: 'Action'
        }
    ]

    const getAdoptions = async () => {
        const data = await axios.get(`http://localhost:8080/api/adoptions/byShelter?shelterId=${AuthService.getCurrentUser().id}`,
            {headers: authHeader()})
        const res = await data.data
        console.log(res)
        setAdoptions(res)
        props.updatePets()
        setLoading(false)
    }

    const capitalize = (petName) => {
        return petName.charAt(0).toUpperCase() + petName.slice(1)
    }

    const handleSearchAdoption = (e) => {
        console.log(e.target.value)
        if (e.key === 'Enter')
            setFilteredAdoptions(adoptions.filter(pet => capitalize(pet.name).includes(e.target.value)))
    }

    const handleAccept = async (id) => {
        const {error} = await axios.patch(`http://localhost:8080/api/adoptions/accept-adoption?adoptionId=${id}`, {}, {headers: authHeader()})
        if (error) {
            addToast(error.message, {appearance: 'error', autoDismiss: true});
        } else {
            addToast('Adoption accepted', {appearance: 'success', autoDismiss: true})
        }
        await getAdoptions()
    }

    const handleDecline = async (id) => {
        await axios.patch(`http://localhost:8080/api/adoptions/decline-adoption?adoptionId=${id}`, {}, {headers: authHeader()})

        await getAdoptions()
    }

    const handleDeleteAdoption = () => {

    }

    useEffect(() => {
        getAdoptions()
    }, [])

    if (loading)
        return (<div>loading...</div>)
    else
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
                    handleAccept={handleAccept}
                    handleDecline={handleDecline}
                />
            </div>
        )
}