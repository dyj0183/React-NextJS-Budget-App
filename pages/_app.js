import '../styles/globals.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"

const theme = extendTheme({

})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
