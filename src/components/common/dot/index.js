import React from 'react'
import styled from 'styled-components'

const DotActive = styled.div`
    width: 24px;
    height: 24px;
    background: #31aeff;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #fff;
`

const Dot = styled.div`
    width: 24px;
    height: 24px;
    background: #66647a;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #fff;
`

export const StyledDot = (props) => {
    const dotTypes = {
        active: <DotActive {...props}>{props.children}</DotActive>
    }

    return dotTypes[props.type] || <Dot {...props}>{props.children}</Dot>
}

export default StyledDot
