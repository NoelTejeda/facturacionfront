// Layouts
import LayoutTemplate from "../layouts/LayoutTemplate"
import LayoutTemplatePdf from "../layouts/LayoutTemplatePdf"

// Pages
import Home from '../pages/Home'
import Facturas from '../pages/Facturas'
import Error404 from '../pages/Error404'
import Servicio from '../pages/Servicio'
import Operador from '../pages/Operador'
import NotaDebito from '../pages/Facturas/NotaDebito'
import NotaCredito from '../pages/Facturas/NotaCredito'
import FacturaOperador from '../pages/FacturaOperador'
import NotaDebitoOperador from '../pages/FacturaOperador/NotaDebitoOperador'
import NotaCreditoOperador from '../pages/FacturaOperador/NotaCreditoOperador'
import AnalisisTecnicoFinanciero from '../pages/AnalisisTecnicoFinanciero'
import FacturaComercial from '../pages/FacturaComercial'
import PreFacturaComercial from '../pages/PreFacturaComercial'
import Pdf from '../pages/Pdf'
import Usuarios from "../pages/Usuarios"
import Rutas from "../pages/Rutas"

const routes = [
    {
        path: "/",
        layout: LayoutTemplate,
        component: Home,
        exact: true,
    },
    {
        path: "/facturas",
        layout: LayoutTemplate,
        component: Facturas,
        exact: true,
    },
    {
        path: "/notadebito",
        layout: LayoutTemplate,
        component: NotaDebito,
        exact: true,
    },
    {
        path: "/notacredito",
        layout: LayoutTemplate,
        component: NotaCredito,
        exact: true,
    },
    {
        path: "/servicio",
        layout: LayoutTemplate,
        component: Servicio,
        exact: true,
    },
    {
        path: "/operador",
        layout: LayoutTemplate,
        component: Operador,
        exact: true,
    },
    {
        path: "/facturas-operador",
        layout: LayoutTemplate,
        component: FacturaOperador,
        exact: true,
    },
    {
        path: "/notadebito-operador",
        layout: LayoutTemplate,
        component: NotaDebitoOperador,
        exact: true,
    },
    {
        path: "/notacredito-operador",
        layout: LayoutTemplate,
        component: NotaCreditoOperador,
        exact: true,
    },
    {
        path: "/factura-comercial",
        layout: LayoutTemplate,
        component: FacturaComercial,
        exact: true,
    },    
    {
        path: "/prefactura-comercial",
        layout: LayoutTemplate,
        component: PreFacturaComercial,
        exact: true,
    },    
    {
        path: "/usuarios",
        layout: LayoutTemplate,
        component: Usuarios,
        exact: true,
    },
    {
        path: "/rutas",
        layout: LayoutTemplate,
        component: Rutas,
        exact: true,
    },
    {
        path: "/analisis-tf",
        layout: LayoutTemplate,
        component: AnalisisTecnicoFinanciero,
        exact: true,
    },
    {
        path: "/pdf",
        layout: LayoutTemplatePdf,
        component: Pdf,
        exact: true,
    }, 
    {
        layout: LayoutTemplate,
        component: Error404,
    }
];

export default routes;