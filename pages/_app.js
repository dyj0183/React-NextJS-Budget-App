import '../styles/globals.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from "next-auth/client";

const theme = extendTheme({

})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
