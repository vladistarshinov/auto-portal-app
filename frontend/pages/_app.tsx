import type { AppProps } from 'next/app';
import { StylesProvider, ThemeProvider } from '@mui/styles'
import theme from '@/assets/theme';
import { CssBaseline } from '@mui/material';
import MainProvider from '@/providers/MainProvider';
import { TypeComponentAuthField } from '@/shared/types/auth.types';

type TypeAppProps = AppProps & TypeComponentAuthField;

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />;
				</ThemeProvider>
			</StylesProvider>
		</MainProvider>
	)
}
