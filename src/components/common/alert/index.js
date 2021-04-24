import React from 'react'
import styled from 'styled-components'
import Alert from '@material-ui/lab/Alert'

const AlertBase = styled(Alert)`
    && {
        border-style: solid;
        border-width: 1px;
        border-radius: 15px;
        font-family: Nunito;
    }
`

export const StyledAlert = (props) => {
    const alertTypes = {
        error: (
            <AlertBase severity="error" {...props}>
                {props.children}
            </AlertBase>
        ),
        warning: (
            <AlertBase severity="warning" {...props}>
                {props.children}
            </AlertBase>
        ),
        info: (
            <AlertBase severity="info" {...props}>
                {props.children}
            </AlertBase>
        ),
        success: (
            <AlertBase severity="success" {...props}>
                {props.children}
            </AlertBase>
        )
    }

    return (
        alertTypes[props.type] || (
            <AlertBase severity="info" {...props}>
                {props.children}
            </AlertBase>
        )
    )
}

export default StyledAlert
