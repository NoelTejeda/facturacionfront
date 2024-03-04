import React, { useState } from 'react'
import { Icon, Image } from "semantic-ui-react"
import { Link } from "react-router-dom";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarDefault from "../../../assets/avatar_default/avatar.png";
import "./RightHeader.scss";

export default function RightHeader() {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className="right-header">
            <Link to="/">
                <Icon name="home" />
            </Link>
            <Link to="/">
                <Image src={AvatarDefault} avatar  onClick={() => setShowModal(true)} />
            </Link>
            <ModalBasic show={showModal} setShow={setShowModal} title="Opciones de Perfil">
                    <p>Perfil.....</p>
                    <p>Perfil.....</p>
                    <p>Perfil.....</p>
            </ModalBasic>
        </div>
    )
}
