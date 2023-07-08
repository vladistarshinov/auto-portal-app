import type { AppProps } from 'next/app'

import '@/app/assets/theme/globals.scss'

import MainProvider from '@/app/providers/MainProvider'
import { TypeComponentAuthField } from '@/shared/types/auth.types'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from "../src/shared/libs/createEmotionCache";

type TypeAppProps = AppProps & TypeComponentAuthField & {
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: TypeAppProps) {
	return (
		<CacheProvider value={emotionCache}>
			<MainProvider Component={Component}>
				<Component {...pageProps} />
			</MainProvider>
		</CacheProvider>
	)
}
