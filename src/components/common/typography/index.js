import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const TypographyBase = styled(Typography)`
    && {
        font-style: normal;
        font-family: Nunito;
    }
`
const TitleDashboard = styled(Typography)`
    && {
        width: 100%;
        font-size: 40px;
        color: #383743;
        font-weight: normal;
        line-height: 72px;
        margin-bottom: 15px;
        display: block;
        font-family: Nunito;
        padding: 0px 15px'
    }
`
const ContentDashboard = styled(Typography)`
    && {
        width: 100%;
        font-size: 18px;
        color: #66647a;
        font-weight: normal;
        line-height: 27px;
        margin-bottom: 25px;
        display: block;
        font-family: Nunito;
    }
`
const TitleLogin = styled(Typography)`
    && {
        max-width: 50%;
        color: #383743;
        font-size: 28px;
        font-weight: 300;
        line-height: 40px;
        display: block;
        margin-top: 10px;
        font-family: Nunito;
        @media (max-width: 600px) {
            max-width: 100%;
        }
    }
`
const LoginDesc = styled(Typography)`
    && {
        color: #383743;
        margin-left: 10px;
        font-size: 14px;
        font-family: Nunito;
    }
`

export const StyledTypography = (props) => {
    const typographyTypes = {
        titleDashboard: (
            <TitleDashboard variant={props.variant ? props.variant : 'span'} {...props}>
                {props.children}
            </TitleDashboard>
        ),
        contentDashboard: (
            <ContentDashboard variant={props.variant ? props.variant : 'span'} {...props}>
                {props.children}
            </ContentDashboard>
        ),
        titleLogin: (
            <TitleLogin variant={props.variant ? props.variant : 'span'} {...props}>
                {props.children}
            </TitleLogin>
        ),
        logindesc: (
            <LoginDesc variant={props.variant ? props.variant : 'span'} {...props}>
                {props.children}
            </LoginDesc>
        )
    }

    return (
        typographyTypes[props.type] || (
            <TypographyBase variant={props.variant ? props.variant : 'span'} {...props}>
                {props.children}
            </TypographyBase>
        )
    )
}

export default StyledTypography
