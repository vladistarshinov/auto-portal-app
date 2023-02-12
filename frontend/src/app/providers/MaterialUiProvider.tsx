import { FC } from 'react'
import { StylesProvider, ThemeProvider } from '@mui/styles'
import { CssBaseline } from '@mui/material'

import theme from '../assets/theme'


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
