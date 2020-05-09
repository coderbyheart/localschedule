import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: 'DM Mono', monospace;
}
`
