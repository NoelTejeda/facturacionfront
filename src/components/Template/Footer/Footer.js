import React from 'react'
import "./Footer.scss";

export default function Footer() {
    return (
        <div>
            <footer className="main-footer">
                <strong>Copyright © 2023 Telecomunicaciones Movilnet.</strong>
                    Todos los Derechos Reservados.
                <div className="float-right d-none d-sm-inline-block">
                    <b> Version</b> 1.0.0
                </div>
            </footer>
        </div>
    )
}
