import { FC } from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from 'redux-persist/integration/react'

import { TypeComponentAuthField } from '@/shared/types/auth.types'
import Layout from '@/widgets/layout/Layout'

import { persistor, store } from '../store'
import ReduxToast from './ReduxToastr'
import MaterialUiProvider from './MaterialUiProvider'
import RoleProvider from './RoleProvider'
import AuthProvider from './AuthProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export const REACT_APP_ENV = `${process.env.REACT_APP_ENV}`

const MainProvider: FC<TypeComponentAuthField> = ({ children, Component }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<MaterialUiProvider>
						<ReduxToast />
							<RoleProvider Component={Component}>
								<Layout>
									{children}
								</Layout>
							</RoleProvider>
					</MaterialUiProvider>
				</PersistGate>
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
		</QueryClientProvider>
	)
}

export default MainProvider
