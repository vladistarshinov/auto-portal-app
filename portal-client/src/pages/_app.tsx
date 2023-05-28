import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import createEmotionCache from '@/shared/libs/createEmotionCache';
import React, { FC } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import lightThemeOptions from '../styles/theme';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const lightTheme = createTheme(lightThemeOptions);

const App: FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Component {...pageProps} />
        </StyledEngineProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App;