import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

import firebase from 'firebase/app'
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'firebase/auth'
import initFirebase from '@/utils/auth/initFirebase'

import { setUserCookie } from '@/utils/auth/userCookies'
import { mapUserData } from '@/utils/auth/mapUserData'

import Input from '@material-ui/core/TextField'
import Typography from '@/components/common/typography'
import Button from '@/components/common/button'
import Alert from '@/components/common/alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import DefaultHead from '@/components/specific/head'

const StyledInput = styled(Input)`
    input {
        font-family: Nunito;
    }
    width: 100%;
    margin-bottom: 10px !important;
`
const BoxLogin = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Content = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 40px;
    border-radius: 20px;
    background-color: #fff;
    @media (max-width: 600px) {
        max-width: 100%;
        height: 100%;
        border-radius: 0px;
    }
`
const Form = styled.div`
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
`
const SectionForm = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    @media (max-width: 520px) {
        flex-direction: column;
    }
`
const SectionFormItem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`
const CustomCircularProgress = styled(CircularProgress)`
    && {
        width: 20px !important;
        height: 20px !important;
        margin-left: 10px;
        color: #FFF
    }
`

initFirebase()

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [loginError, setLoginError] = useState('')
    const [forgotPass, setForgotPass] = useState(false)
    const [emailForgotPass, setEmailForgotPass] = useState('')
    const [emailForgotPassError, setEmailForgotPassError] = useState('')
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const changeEmail = (e) => {
        setEmail(e.target.value)
        setLoginError('')
    }

    const changePass = (e) => {
        setPass(e.target.value)
        setLoginError('')
    }

    const changeEmailForgot = (e) => {
        setEmailForgotPass(e.target.value)
        setEmailForgotPassError('')
        setAlert(false)
    }

    const validate = (user) => {
        setLoading(true)
        const userData = mapUserData(user)
        setUserCookie(userData)
        router.push('/')
    }

    const login = () => {
        setLoading(true)
        firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then((user) => {
                validate(user.user)
            })
            .catch((error) => {
                setLoading(false)
                switch (error.code) {
                    case 'auth/invalid-email':
                        setLoginError('Email ou senha Invalidos')
                        break
                    case 'auth/wrong-password':
                        setLoginError('Senha Invalida')
                        break
                    case 'auth/user-not-found':
                        setLoginError('Usuário não encontrado')
                        break
                    default:
                        setLoginError('Email ou senha Invalidos')
                        break
                }
            })
    }

    const forgotPassword = () => {
        setLoading(true)
        if (emailForgotPass.length > 0) {
            firebase
                .auth()
                .sendPasswordResetEmail(emailForgotPass)
                .then(() => {
                    setAlert(true)
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    setEmailForgotPassError('Email Não Encontrado')
                })
        } else {
            setLoading(false)
            setEmailForgotPassError('Por favor digite o email')
        }
    }

    const firebaseAuthConfig = {
        signInFlow: 'popup',
        signInOptions: [
            {
                provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                fullLabel: 'Entrar com Facebook',
                scopes: ['public_profile', 'email'],
                customParameters: {
                    auth_type: 'reauthenticate'
                }
            },
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                fullLabel: 'Entrar com Google',
                scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
                customParameters: {
                    prompt: 'select_account'
                }
            }
        ],
        signInSuccessUrl: '/',
        credentialHelper: 'none',
        callbacks: {
            signInSuccessWithAuthResult: async ({ user }) => {
                const userData = mapUserData(user)
                setUserCookie(userData)
            },
        }
    }

    return (
        <>
            <DefaultHead />
            <BoxLogin>
                {!forgotPass && (
                    <Content>
                        <Typography variant="h4" type="titleLogin">
                            Utilize <b>e-mail e senha</b> para acessar
                        </Typography>
                        <Form>
                            <StyledInput
                                label="E-mail"
                                type="email"
                                placeholder="Digite seu Email"
                                onChange={(e) => changeEmail(e)}
                                error={loginError !== ''}
                                InputLabelProps={{ shrink: true }}
                            />
                            <StyledInput
                                label="Senha"
                                type="password"
                                placeholder="Digite sua Senha"
                                onChange={(e) => changePass(e)}
                                error={loginError !== ''}
                                helperText={loginError}
                                InputLabelProps={{ shrink: true }}
                            />
                            <SectionForm>
                                <SectionFormItem>
                                    <Button type="returnLogin">
                                        voltar
                                    </Button>
                                    <Button type="login" onClick={login}>
                                        {!loading ? 'avançar' : 'carregando...'}
                                        {loading && (
                                            <CustomCircularProgress />
                                        )}
                                    </Button>
                                </SectionFormItem>
                                <SectionFormItem>
                                    <Button
                                        type="forgotPassword"
                                        onClick={() => {
                                            setForgotPass(true)
                                            setLoginError('')
                                        }}>
                                        Esqueceu sua senha?
                                    </Button>
                                </SectionFormItem>
                            </SectionForm>
                        </Form>
                        <FirebaseAuth
                            uiConfig={firebaseAuthConfig}
                            firebaseAuth={firebase.auth()}
                        />
                        <SectionFormItem>
                            <Typography variant="inherit">
                                Não possui um acesso?
                            </Typography>
                            <Link href={'/cadastro'}>
                                <a>
                                    <Button type="createAccount">
                                        Criar conta
                                    </Button>
                                </a>
                            </Link>
                        </SectionFormItem>
                    </Content>
                )}

                {forgotPass && (
                    <Content>
                        <Typography variant="h4" type="titleLogin">
                            Insira seu e-mail para <b>recuperar sua senha</b>
                        </Typography>
                        <Form>
                            <StyledInput
                                label="E-mail"
                                type="email"
                                placeholder="Insira seu e-mail cadastrado"
                                onChange={(e) => changeEmailForgot(e)}
                                error={emailForgotPassError !== ''}
                                InputLabelProps={{ shrink: true }}
                            />
                            <SectionForm>
                                <SectionFormItem>
                                    <Button
                                        type="returnLogin"
                                        onClick={() => {
                                            setForgotPass(false)
                                            setAlert(false)
                                        }}>
                                        voltar
                                    </Button>
                                    <Button type="login" onClick={forgotPassword}>
                                        {!loading ? 'enviar' : 'carregando...'}
                                        {loading && (
                                            <CustomCircularProgress />
                                        )}
                                    </Button>
                                </SectionFormItem>
                                <SectionFormItem></SectionFormItem>
                            </SectionForm>
                            {alert && (
                                <Alert type="success" style={{ border: 'none', marginTop: '10px' }}>
                                    Link para redefinir sua senha enviada para o email{' '}
                                    <b>{emailForgotPass}</b>
                                </Alert>
                            )}
                        </Form>
                    </Content>
                )}
            </BoxLogin>
        </>
    )
}

export default Login
