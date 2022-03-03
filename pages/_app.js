import "../styles/globals.css";

import { ChakraProvider, extendTheme, HStack } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import Link from "next/link";

const theme = extendTheme({});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider session={pageProps.session}>
        <HStack
          justify="space-between"
          borderBottom="1px solid black"
          h="4rem"
          padding="1rem"
        >
          <Link href="/">MY LOGO</Link>
          <HStack spacing="2rem">
            <Link href="/add-income-and-expense">Edit Budget</Link>
            <Link href="/auth">Login/Logout</Link>
          </HStack>
        </HStack>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
