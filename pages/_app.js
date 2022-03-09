import "../styles/globals.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { Provider as JotaiProvider } from "jotai";

const theme = extendTheme({});

function MyApp({ Component, pageProps }) {
	return (
		<JotaiProvider>
			<ChakraProvider theme={theme}>
				<Provider session={pageProps.session}>
					<Component {...pageProps} />
				</Provider>
			</ChakraProvider>
		</JotaiProvider>
	);
}

export default MyApp;
