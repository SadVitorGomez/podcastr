import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      default: string
      text: string

      secondary50: string
      secondary100: string
      secondary200: string
      secondary500: string
      secondary800: string

      green: string

      primary300: string
      primary400: string
      primary500: string
      primary800: string
    }
  }
}
