import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const ButtonPrimary = styled(Button)`
    && {
        width: 190px;
        height: 52px;
        background: #31aeff;
        color: #fff;
        font-weight: bold;
        border-radius: 8px;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: #2582bd;
        }
        @media (max-width: 600px) {
            width: 120px;
            font-size: 10px;
        }
    }
`
const ButtonDefault = styled(Button)`
    && {
        width: 190px;
        height: 52px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #cccbd2;
        box-sizing: border-box;
        border-radius: 8px;
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: #cccbd2;
        }
        @media (max-width: 425px) {
            width: 120px;
            font-size: 10px;
        }
    }
`
const ButtonSecondary = styled(Button)`
    && {
        width: 190px;
        height: 52px;
        background: #40e5be;
        color: #fff;
        border-radius: 8px;
        font-size: 12px;
        font-weight: bold;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: #35caa6;
        }
    }
`
const ButtonLink = styled(Button)`
    && {
        width: 190px;
        height: 52px;
        background: #ffffff;
        color: #31aeff;
        border-radius: 8px;
        border: 1px solid #31aeff;
        box-sizing: border-box;
        border-radius: 8px;
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: #31aeff;
            color: #ffffff;
        }
    }
`
const ReturnLogin = styled(Button)`
    && {
        width: 50px;
        height: 35px;
        background: #ffffff;
        border-radius: 8px;
        font-weight: bold;
        box-sizing: border-box;
        border-radius: 8px;
        font-size: 12px;
        text-transform: capitalize;
        color: #cccbd2;
        &:hover {
            background: #ffffff;
        }
    }
`
const Login = styled(Button)`
    && {
        width: 190px;
        height: 35px;
        background: #31aeff;
        color: #fff;
        border-radius: 25px;
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: #2582bd;
        }
    }
`
const LoginDisabled = styled(Button)`
    && {
        width: 190px;
        height: 35px;
        background: #cccbd2;
        color: #fff;
        font-weight: bold;
        border-radius: 25px;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: #cccbd2;
        }
    }
`
const ForgotPassword = styled(Button)`
    && {
        width: 190px;
        height: 35px;
        background: transparent;
        color: #31aeff;
        font-weight: bold;
        border-radius: 25px;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: transparent;
        }
    }
`
const CreateAccount = styled(Button)`
    && {
        width: 105px;
        height: 35px;
        background: transparent;
        color: #31aeff;
        font-weight: bold;
        border-radius: 25px;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: transparent;
        }
    }
`
const LoginLink = styled(Button)`
    && {
        width: 65px;
        height: 35px;
        background: transparent;
        color: #31aeff;
        font-weight: bold;
        border-radius: 25px;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        &:hover {
            background: transparent;
        }
    }
`
const Remove = styled(Button)`
    && {
        width: 75px;
        height: 35px;
        background: #ffffff;
        border-radius: 8px;
        box-sizing: border-box;
        border-radius: 8px;
        font-weight: bold;
        font-size: 12px;
        font-weight: bold;
        text-transform: capitalize;
        color: red;
        &:hover {
            background: #ffffff;
        }
    }
`

export const StyledButton = (props) => {
    const buttonTypes = {
        primary: <ButtonPrimary {...props}>{props.children}</ButtonPrimary>,
        secondary: <ButtonSecondary {...props}>{props.children}</ButtonSecondary>,
        default: <ButtonDefault {...props}>{props.children}</ButtonDefault>,
        link: <ButtonLink {...props}>{props.children}</ButtonLink>,
        returnLogin: <ReturnLogin {...props}>{props.children}</ReturnLogin>,
        login: <Login {...props}>{props.children}</Login>,
        loginDisabled: <LoginDisabled {...props}>{props.children}</LoginDisabled>,
        forgotPassword: <ForgotPassword {...props}>{props.children}</ForgotPassword>,
        createAccount: <CreateAccount {...props}>{props.children}</CreateAccount>,
        loginLink: <LoginLink {...props}>{props.children}</LoginLink>,
        remove: <Remove {...props}>{props.children}</Remove>
    }

    return buttonTypes[props.type] || <ButtonDefault {...props}>{props.children}</ButtonDefault>
}

export default StyledButton
