import { FC } from 'react'
import { Provider } from 'react-redux'

import { TypeComponentAuthField } from '@/shared/types/auth.types'

import { store } from '@/store/store'

import ReduxToast from './ReduxToastr'
import { StylesProvider, ThemeProvider } from '@mui/styles'
import theme from '@/assets/theme'
import { CssBaseline } from '@mui/material'


const MainProvider: FC<TypeComponentAuthField> = ({ children, Component }) => {
	return (
			<Provider store={store}>
				<StylesProvider injectFirst>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<ReduxToast />
						{children}
					</ThemeProvider>
				</StylesProvider>
			</Provider>
	)
}

export default MainProvider
