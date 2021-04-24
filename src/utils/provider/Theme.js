import React from 'react'
import { ThemeProvider } from 'styled-components'

export const Theme = (props) => {
    const theme = {
        colors: {
            primary: '#31AEFF',
            secondary: '#006EB8'
        },
        font: 'Nunito'
    }

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

export default Theme
