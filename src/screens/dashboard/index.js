import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useUser } from '@/utils/auth/useUser'
import { useRouter } from 'next/router'

import Typography from '@/components/common/typography'
import Button from '@/components/common/button'
import DefaultHead from '@/components/specific/head'

const Box = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Content = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 40px;
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    @media (max-width: 800px) {
        max-width: 100%;
        height: 100%;
        border-radius: 0px;
    }
`

const Dashboard = () => {
    const router = useRouter()
    const { user, logout } = useUser()

    if (!user) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <DefaultHead />
            <Box>
            <Content>
                <Typography variant="inherit" type="titleDashboard">Bem Vindo, <b></b>!</Typography>
                <Typography variant="inherit" type="contentDashboard">Email: {user?.email}</Typography>
                <Button 
                    type="primary"
                    onClick={() => logout()}
                >
                    Sair
                </Button>
            </Content>
            </Box>
        </>
    )
}

export default Dashboard
