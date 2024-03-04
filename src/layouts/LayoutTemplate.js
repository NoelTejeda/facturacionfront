import React from "react";
//import { Container} from "semantic-ui-react";
//import SideBar from "../components/SideBar";
//import Header from "../components/Header";
import Header from "../components/Template/Header";
import Footer from "../components/Template/Footer";
import Sidebar from "../components/Template/Sidebar";
import "./LayoutTemplate.scss";

export default function LayoutTemplate(props) {
    const { children } = props;

    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            {children}
                        </div>
                    </section>
                </div>
                <Sidebar />
                <Footer />
            </div>

        </>
    );
}