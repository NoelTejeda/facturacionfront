import React from 'react'
import "./AddRow.scss";

export default function AddRow(props) {
    const {data} = props;
    const {client, service_description, seconds_calls,issue_date, total_mount} = data;
    console.debug(data);

    return (
        <div>
            <hr />
            <table className="table table-sm">
                <thead className="label-turquesa text-center text-sm">
                    <tr>
                        <td>OPERADOR</td>
                        <td>SERVICIO</td>
                        <td>SEGUNDOS DE LLAMADA</td>
                        <td>PRECIO POR SEGUNDO</td>
                        <td>MONTO TOTAL</td>
                    </tr>
                </thead>
                
                <tbody id="content" className="text-center text-sm">
                    <tr className="text-center">
                        <td>{client}</td>
                        <td>{service_description}</td>
                        <td>{seconds_calls}</td>
                        <td>{issue_date}</td>
                        <td>{total_mount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
