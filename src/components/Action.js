import {makeStyles} from "@mui/styles";
import ImageCard from "./ImageCard";
import {useHistory} from "react-router-dom";
import actions from "../static/actions";
import useWindowPosition from "../hook/useWindowPosition";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
    }}))
export default function Action() {
    const classes = useStyles()
    const history = useHistory();
    return (
        <div className={classes.root} id="action">

        </div>
    )
}