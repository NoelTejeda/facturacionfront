import React from 'react';
import { Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/jpg/movilnetlogo.png";
import RightHeader from "./RightHeader";
import "./Header.scss";

export default function Header() {

    return (
        <div className="header">
            <Grid>
                <Grid.Column width={3} className="header__logo">
                    <Link to="/"> 
                        <Image src={Logo} alt="Interconectados Movilnet" />
                    </Link>
                </Grid.Column>
                <Grid.Column width={10}>
                    <p>Buscar</p>
                </Grid.Column>
                <Grid.Column width={3}>
                    <RightHeader />
                </Grid.Column>
            </Grid>
            
        </div>
    )
}
