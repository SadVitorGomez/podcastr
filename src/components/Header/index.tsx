import { format } from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'

import { HeaderContainer } from './styles'

type ThemeProps = {
  toggleTheme: () => void
}

export function Header({ toggleTheme }: ThemeProps) {
  const { colors, title } = useContext(ThemeContext)
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {locale: ptBR})

  return (
    <HeaderContainer>
      <div>
        <img
          src={title === 'dark' ? '/logo-dark-theme.svg' : 'logo.svg'}
          alt="Podcastr"
        />

        <p>O melhor para você ouvir, sempre</p>
      </div>
      <div>
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={colors.green}
          offColor={colors.secondary100}
        />
        <span>{currentDate}</span>
      </div>
    </HeaderContainer>
  )
}
