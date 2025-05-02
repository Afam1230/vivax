import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";


// Create a custom theme with purple colors
const theme = extendTheme({
	colors: {
	  purple: {
		50: '#f5e9ff',
		100: '#dac1fa',
		200: '#c09af1',
		300: '#a672e8',
		400: '#8c4adf',
		500: '#7231c6',
		600: '#59269b',
		700: '#401b70',
		800: '#271146',
		900: '#14061d',
	  },
	  gray: {
		50: '#f2f2f3',
		100: '#d8d8da',
		200: '#bebebf',
		300: '#a4a4a6',
		400: '#8a8a8d',
		500: '#717174',
		600: '#58585a',
		700: '#3f3f40',
		800: '#1e1e30',
		900: '#0d1020',
	  },
	},
	styles: {
	  global: {
		body: {
		  bg: 'gray.900',
		  color: 'white',
		},
	  },
	},
  });



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider >
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);