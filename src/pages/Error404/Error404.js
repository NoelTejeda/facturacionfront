import React from 'react'
import Error404Image from "../../assets/page404/404.svg";
import "./Error404.scss";

export default function Error404() {
    return (
    <div className="contenedor">
        <img src={Error404Image} alt="404" />
        <div className="centrado">ERROR 404...</div>
    </div>
    );
}