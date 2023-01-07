import type { AppProps } from 'next/app';
import { StylesProvider, ThemeProvider } from '@mui/styles'
import theme from '@/assets/theme';
import { CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
	return (
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />;
				</ThemeProvider>
			</StylesProvider>
	)
}
