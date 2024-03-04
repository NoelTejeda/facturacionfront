import React from 'react'
import { Pagination as Pag } from 'react-bootstrap'
import "./Pagination.scss"

export default function Pagination() {
    return (
        <Pag>
            <Pag.First />
            <Pag.Prev />
            <Pag.Item>{1}</Pag.Item>
            <Pag.Ellipsis />

            <Pag.Item>{20}</Pag.Item>
            <Pag.Next />
            <Pag.Last />
        </Pag>
    )
}
