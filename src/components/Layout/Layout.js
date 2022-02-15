import Navbar from "../Navbar/Navbar";
import {Footer} from "pet-project-frontend-sharedcomponents";

export default function Layout(props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow bg-background">{props.children}</main>
            <Footer/>
        </div>
    )
}