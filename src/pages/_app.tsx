import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import { PlayerContextProvider } from '../contexts/PlayerContext'

import GlobalStyle from '../styles/global'
import { Wrapper } from '../styles/app'

import { lightTheme } from '../styles/themes/light'
import { darkTheme } from '../styles/themes/dark'

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(darkTheme)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme)
  }

  return (
    <ThemeProvider theme={theme}>
      <PlayerContextProvider>
        <Wrapper>
          <GlobalStyle />
          <main>
            <Header toggleTheme={toggleTheme} />
            <Component {...pageProps} />
          </main>
          <Player />
        </Wrapper>
      </PlayerContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
