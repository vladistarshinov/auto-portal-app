import { FC } from 'react'
import { Provider } from 'react-redux'

import { TypeComponentAuthField } from '@/shared/types/auth.types'

import {store}  from '@/store/index'

import ReduxToast from './ReduxToastr'
import Layout from '@/components/layout/Layout'
import MaterialUiProvider from './MaterialUiProvider'
import RoleProvider from './RoleProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './AuthProvider'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/store/index'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

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
		</QueryClientProvider>
	)
}

export default MainProvider
