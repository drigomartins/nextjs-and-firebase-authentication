import React from 'react'
import '@/assets/styles/globals.css'

import ThemeProvider from '@/utils/provider/Theme'

export const MyApp = ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
