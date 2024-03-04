import React from "react"
import "./LayoutTemplate.scss"

export default function LayoutTemplatePdf(props) {
    const { children } = props

    return (
        <div className="content">
            {children}
        </div>
    )
}