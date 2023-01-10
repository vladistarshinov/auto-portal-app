import { FC } from 'react'
import { StylesProvider, ThemeProvider } from '@mui/styles'
import theme from '@/assets/theme'
import { CssBaseline } from '@mui/material'


const MaterialUiProvider: FC = ({ children }) => {
	return (
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
						{children}
				</ThemeProvider>
			</StylesProvider>
	)
}

export default MaterialUiProvider
