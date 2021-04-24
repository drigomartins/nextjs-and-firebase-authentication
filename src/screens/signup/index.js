import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { setUserCookie } from '@/utils/auth/userCookies'

import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'firebase/auth'
import initFirebase from '@/utils/auth/initFirebase'

import Typography from '@/components/common/typography'
import Button from '@/components/common/button'
import Input from '@material-ui/core/TextField'
import Dot from '@/components/common/dot'
import CircularProgress from '@material-ui/core/CircularProgress'
import DefaultHead from '@/components/specific/head'

import { mapUserData } from '@/utils/auth/mapUserData'
import { useRouter } from 'next/router'

const StyledInput = styled(Input)`
    input {
        font-family: Nunito;
    }
    width: 100%;
    margin-bottom: 10px !important;
`
const BoxSignup = styled.div`
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
    width: 60%;
    margin-top: 12px;
    margin-bottom: 12px;
`
const TitleForm = styled.div`
    display: flex;
    justify-content: flex-start;
    fex-direction: row;
    align-items: center;
    margin-top: 5px;
`
const Space = styled.div`
    width: 100%;
    height: 25px;
    display: block;
`
const SectionForm = styled.div`
    display: flex;
    justify-content: space-between;
    fex-direction: row;
    align-items: center;
    margin-top: 10px;
`
const SectionFormItem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    @media (max-width: 520px) {
        flex-direction: column;
    }
`
const SectionFormList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
`
const IndicateList = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 24px;
    margin-right: 10px;
`
const IndicateLine = styled.div`
    width: 1px;
    height: calc(100% - 24px);
    background-color: #cccbd2;
    margin-top: 10px;
    margin-bottom: 10px;
`
const LineMin = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 35px;
    width: 100%;
    padding-left: 12px;
`
const CustomCircularProgress = styled(CircularProgress)`
    && {
        width: 20px !important;
        height: 20px !important;
        margin-left: 10px;
        color: #FFF
    }
`

const baseError = {
    email: '',
    pass: ''
}

initFirebase()

export const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passAgain, setPassAgain] = useState('x')
    const [click, setClick] = useState(false)
    const [advance, setAdvance] = useState(false)
    const [registerError, setRegisterError] = useState(baseError)
    const [signupStyledFirebaseAuth, setSignupStyledFirebaseAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const cliked = () => {
        setClick(!click)
        setSignupStyledFirebaseAuth(false)
    }
    const advanced = () => {
        setAdvance(!advance)
        setPassAgain('')
    }

    const validateSignup = () => {
        try {
            firebase.auth().onAuthStateChanged((user) => {
                const userData = mapUserData(user)
                setUserCookie(userData)
                router.push('/')
            })
        } catch (error) {
            setRegisterError('Erro, por favor tente novamente!')
            setLoading(false)
            firebase.auth().signOut()
        }
    }

    const signup = () => {
        setLoading(true)
        return email.includes('@')
            ? firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, pass)
                  .then((user) => {
                      validateSignup()
                      user.user.updateProfile({ displayName: name })
                  })
                  .catch((error) => {
                      setLoading(false)
                      switch (error.code) {
                          case 'auth/email-already-in-use':
                              setRegisterError({ ...registerError, email: 'Email já Registrado' })
                              setAdvance(false)
                              break
                          case 'auth/weak-password':
                              setRegisterError({
                                  ...registerError,
                                  pass: 'A senha Deve Ter Pelo Menos 6 Caracteres'
                              })
                              break
                          default:
                              setRegisterError({ ...registerError, email: 'Email já Registrado' })
                              setAdvance(false)
                              break
                      }
                  })
            : (setRegisterError({
                  ...registerError,
                  email: 'O email que você digitou está invalido.'
              }),
              setAdvance(!advance),
              setPassAgain(''),
              setLoading(false))
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
            signInSuccessWithAuthResult: () => {
                setSignupStyledFirebaseAuth(true)
                return false
            }
        }
    }

    return (
        <>
            <DefaultHead />
            <BoxSignup>
                <Content>
                    <Typography variant="inherit" type="titleLogin">
                        Certo, <b>vamos iniciar</b> o cadastro
                    </Typography>
                    <StyledFirebaseAuth
                        uiConfig={firebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                    />
                    {!signupStyledFirebaseAuth && (
                        <>
                            <TitleForm>
                                <Dot type={!advance ? 'active' : ''}>1</Dot>
                                <Typography variant="inherit" type="logindesc">
                                    <b>Dados Pessoais</b>
                                </Typography>
                            </TitleForm>
                            {!advance && (
                                <SectionFormList>
                                    <IndicateList>
                                        <IndicateLine />
                                    </IndicateList>
                                    <Form>
                                        <Typography variant="inherit">
                                            Preencha os campos a seguir
                                        </Typography>
                                        <Space />
                                        <StyledInput
                                            label="Nome"
                                            onChange={(e) => {
                                                setName(e.target.value)
                                                setRegisterError(baseError)
                                            }}
                                            placeholder="Digite seu Nome"
                                            InputLabelProps={{ shrink: true }}
                                            defaultValue={name}
                                        />
                                        <StyledInput
                                            label="E-mail"
                                            type="email"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setRegisterError(baseError)
                                            }}
                                            placeholder="Digite seu Email"
                                            InputLabelProps={{ shrink: true }}
                                            defaultValue={email}
                                            error={registerError.email !== ''}
                                            helperText={registerError.email && registerError.email}
                                        />
                                        <SectionForm>
                                            <SectionFormItem>
                                                <Button type="returnLogin" onClick={cliked}>
                                                    voltar
                                                </Button>
                                                {email !== '' ? (
                                                    <Button type="login" onClick={advanced}>
                                                        avançar
                                                    </Button>
                                                ) : (
                                                    <Button type="loginDisabled">avançar</Button>
                                                )}
                                            </SectionFormItem>
                                        </SectionForm>
                                    </Form>
                                </SectionFormList>
                            )}
                            {advance && (
                                <LineMin>
                                    <IndicateLine />
                                </LineMin>
                            )}
                            <TitleForm>
                                <Dot type={advance ? 'active' : ''}>2</Dot>
                                <Typography variant="inherit" type="logindesc">
                                    <b>Senha</b>
                                </Typography>
                            </TitleForm>
                            {advance && (
                                <SectionFormList>
                                    <IndicateList>
                                        <IndicateLine />
                                    </IndicateList>
                                    <Form>
                                        <Typography variant="inherit">
                                            Preencha os campos a seguir
                                        </Typography>
                                        <Space />
                                        <StyledInput
                                            label="Senha"
                                            type="password"
                                            onChange={(e) => {
                                                setPass(e.target.value)
                                                setRegisterError(baseError)
                                            }}
                                            placeholder="Digite a Senha"
                                            InputLabelProps={{ shrink: true }}
                                            defaultValue={pass}
                                            error={registerError.pass !== ''}
                                            helperText={registerError.pass && registerError.pass}
                                        />
                                        <StyledInput
                                            label="Confirmar Senha"
                                            type="password"
                                            onChange={(e) => {
                                                setPassAgain(e.target.value)
                                                setRegisterError(baseError)
                                            }}
                                            placeholder="Digite a Senha Novamente"
                                            InputLabelProps={{ shrink: true }}
                                            error={registerError.pass !== ''}
                                        />
                                        <SectionForm>
                                            <SectionFormItem>
                                                <Button type="returnLogin" onClick={advanced}>
                                                    voltar
                                                </Button>
                                                {pass === passAgain ? (
                                                    <Button
                                                        type="login"
                                                        onClick={() => {
                                                            signup()
                                                        }}>
                                                        {!loading ? 'criar conta' : 'carregando...'}
                                                        {loading && (
                                                            <CustomCircularProgress />
                                                        )}
                                                    </Button>
                                                ) : (
                                                    <Button type="loginDisabled">
                                                        criar conta
                                                    </Button>
                                                )}
                                            </SectionFormItem>
                                        </SectionForm>
                                    </Form>
                                </SectionFormList>
                            )}
                        </>
                    )}
                    {signupStyledFirebaseAuth && (
                        <>
                            <SectionForm>
                                <SectionFormItem>
                                    <Button type="returnLogin" onClick={advanced}>
                                        voltar
                                    </Button>
                                    <Button
                                        type="login"
                                        onClick={() => {
                                            validateSignup()
                                        }}>
                                        {!loading ? 'criar conta' : 'carregando...'}
                                        {loading && (
                                            <CustomCircularProgress />
                                        )}
                                    </Button>
                                </SectionFormItem>
                            </SectionForm>
                        </>
                    )}
                    <SectionFormItem>
                        <Typography variant="inherit">
                            Já possui um cadastro?
                        </Typography>
                        <Link href={'/login'}>
                            <a>
                                <Button type="loginLink">
                                    Entrar
                                </Button>
                            </a>
                        </Link>
                    </SectionFormItem>
                </Content>
            </BoxSignup>
        </>
    )
}

export default Signup
