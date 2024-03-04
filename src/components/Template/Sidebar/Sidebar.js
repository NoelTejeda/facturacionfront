import React from 'react'
import { Link } from "react-router-dom"
import Logo from "../../../assets/jpg/movilnetlogo.png"
import useAuth from "../../../hooks/useAuth"
import "./Sidebar.scss";

export default function Sidebar() {
    const auth = useAuth()
    const {authority} = auth.auth.rol[0]
    const rol = authority.split("_")[1]
    
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
              {/* Logo Interconexion */}
                <Link to="/" className="brand-link">
                    <img src={Logo} alt="Interconectados Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">Interconectados</span>
                </Link>
            
                {/* Sidebar */}
                <div className="sidebar">
                {/* Sidebar Panel de Usuarios  */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                
                            <li className="nav-item has-treeview">
                                <Link to="/" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>Panel de Control</p>
                                </Link>
                            </li>

                               {/*      <li className="nav-item">
                                        <Link to="/factura-comercial" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Factura Comercial</p>
                                        </Link>
                                    </li> */}

                          

                      {/*   ---ESTO SIRVE DE EJEMPLO POR SI SE QUIERE MODIFICAR LAS FACTURAS COMERCIALES, AGREGANDO 2 MODULOS EXTRAS QUE SERIAN: 1) PRE-FACTURAS Y FACTURAS APROBADAS---                
                      <li className="nav-item">
                                { rol === "SUPERADMIN" || rol === "ADMIN" || rol === "GER" || rol === "FACTC" || rol === "FACTE" || rol === "APROBADORFC" ? 
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-file-invoice" />
                                    <p>Facturas Comerciales</p>
                                    <i className="right fas fa-angle-left"></i>
                                </Link>
                                : 
                                    ""
                                }
                              
                                <ul className="nav nav-treeview ml-3">
                                <li className="nav-item">
                                        <Link to="/factura-comercial" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Pre-Facturas</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/factura-comercial" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Facturas Aprobadas</p>
                                        </Link>
                                    </li>
                                </ul>
                        </li>
                    */}







                            <li className="nav-item">
                                { rol === "SUPERADMIN" || rol === "ADMIN" || rol === "GER" || rol === "FACTC" || rol === "FACTE" ? 
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-file-invoice" />
                                    <p>Facturación</p>
                                    <i className="right fas fa-angle-left"></i>
                                </Link>
                                : 
                                    ""
                                }
                              
                                <ul className="nav nav-treeview ml-3">
                                     <li className="nav-item">
                                        <Link to="/facturas" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Factura Ix</p>
                                        </Link>
                                    </li> 
                                           <li className="nav-item">
                                    { rol === "SUPERADMIN" || rol === 'ADMIN' || rol === "FACTC" || rol === "FACTE" || rol === "APROBADORFC" ? 
                                        <Link to="/prefactura-comercial" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>PreFactura Comercial</p>
                                        </Link>:""}
                                 </li>


                                    <li className="nav-item">
                                    { rol === "SUPERADMIN" || rol === 'ADMIN' || rol === "FACTC" || rol === "FACTE" || rol === "APROBADORFC" ? 
                                        <Link to="/factura-comercial" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Factura Comercial</p>
                                        </Link>:""}
                                 </li>
                                    <li className="nav-item has-treeview">
                                        <Link to="/notadebito" className="nav-link">
                                            <i className="nav-icon fas fa-file-alt" />
                                            <p>Notas de Débito</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <Link to="/notacredito" className="nav-link">
                                            <i className="nav-icon fas fa-receipt" />
                                            <p>Notas de Crédito</p>
                                        </Link>
                                    </li>
                                   {/* <li className="nav-item">
                                        <Link to="/facturasTldi" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Facturas TLDI</p>
                                        </Link>
                                        </li>*/}
                               
                                </ul>
                            </li>

                            
                            <li className="nav-item has-treeview">
                                { rol === "SUPERADMIN" || rol === "ADMIN" || rol === "GER" ? 
                                <Link to="/operador" className="nav-link">
                                    <i className="nav-icon fas fa-phone-square" />
                                    <p>Operadores</p>
                                </Link>
                                : "" }

                            </li>
                            <li className="nav-item has-treeview">
                                { rol === "SUPERADMIN" || rol === "ADMIN" || rol === "GER" ? 
                                <Link to="/servicio" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>Servicios</p>
                                </Link>
                                : "" }
                            </li>


                            <li className="nav-item">
                                { rol === "SUPERADMIN" || rol === "ADMIN" || rol === "GER" || rol === "FACTC" || rol === "FACTE" ? 
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-file-invoice" />
                                    <p>Ctas por pagar Ix</p>
                                    <i className="right fas fa-angle-left"></i>
                                </Link>
                                : "" }
                                <ul className="nav nav-treeview ml-3">
                                    <li className="nav-item">
                                        <Link to="/facturas-operador" className="nav-link">
                                            <i className="nav-icon fas fa-file-invoice" />
                                            <p>Facturas</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <Link to="/notadebito-operador" className="nav-link">
                                            <i className="nav-icon fas fa-file-alt" />
                                            <p>Notas de Débito</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <Link to="/notacredito-operador" className="nav-link">
                                            <i className="nav-icon fas fa-receipt" />
                                            <p>Notas de Crédito</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item has-treeview" data-widget="pushmenu">
                                { rol === "SUPERADMIN" || rol === "COBC" || rol === "COBE" ? 
                                <Link to="/analisis-tf" className="nav-link" datawidget="pushmenu" >
                                    <i className="nav-icon fas fa-table" datawidget="pushmenu"/>
                                    <p>Analisis Técnico-Financiero</p>
                                </Link>
                                : "" }
                            </li>

                            <li className="nav-item has-treeview">
                                { rol === "SUPERADMIN" || rol === "ENRUTADOR" ?
                                <Link to="/rutas" className="nav-link">
                                    <i className="nav-icon fa fa-road" />
                                    <p>Rutas</p>
                                </Link> 
                                : "" }
                            </li>

                            <li className="nav-item has-treeview">
                                { rol === "SUPERADMIN" || rol === "SEG" ?
                                <Link to="/usuarios" className="nav-link">
                                    <i className="nav-icon fa fa-user" />
                                    <p>Usuarios</p>
                                </Link> 
                                : "" }
                            </li>
                        
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    )
}
