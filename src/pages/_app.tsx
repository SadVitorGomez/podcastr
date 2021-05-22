import { Header } from '../components/Header'
import { Player } from '../components/Player'

import { PlayerContextProvider } from '../contexts/PlayerContext'

import GlobalStyle from '../styles/global'
import { Wrapper } from '../styles/app'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Wrapper>
        <GlobalStyle />
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </Wrapper>
    </PlayerContextProvider>
  )
}

export default MyApp
