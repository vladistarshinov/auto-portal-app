import type { AppProps } from 'next/app'
import { TypeComponentAuthField } from '@/shared/types/auth.types'
import '@/app/assets/theme/globals.scss';
import MainProvider from '@/app/providers/MainProvider';

type TypeAppProps = AppProps & TypeComponentAuthField

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}
