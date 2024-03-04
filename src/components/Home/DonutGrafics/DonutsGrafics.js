import React from 'react'
import PieChart from './DonaG'
import LineChart from '../AreaGrafics'
import "./DonutsGrafics.scss"

export default function DonutsGrafics() {
  
    return (
        <>
            {/* Main Donuts Chart */}
            <div className="row">
            {/* Left col */}
            <section className="col-lg-12 connectedSortable">
                {/* Custom tabs (Charts with tabs)*/}
                <div className="card">
                
                <div className="card-header">
                    <h3 className="card-title">
                    <i className="fas fa-chart-pie m-1" />
                    Facturación
                    </h3>
                    <div className="card-tools">
                    <ul className="nav nav-pills ml-auto">
                        <li className="nav-item">
                        <a className="nav-link active" href="#sales-chart" data-toggle="tab">Dona</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#revenue-chart" data-toggle="tab">Area</a>
                        </li>
                        
                    </ul>
                    </div>
                </div>{/* /.card-header */}
                <div className="card-body">
                    <div className="tab-content p-0">
                    {/* Morris chart - Sales */}
                        <div className="chart tab-pane active" id="sales-chart" style={{position: 'relative', height: 600}}>
                            <PieChart />                       
                        </div> 
                        <div className="chart tab-pane" id="revenue-chart" style={{position: 'relative', height: 600}}>
                            <LineChart />
                        </div>
                    </div>
                </div>{/* /.card-body */}
                </div>
                {/* /.card */}
                </section>
            </div>
     </>
    )
}
