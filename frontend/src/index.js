import React from 'react'
import ReactDOM from 'react-dom'
import { Dapp } from './components/Dapp'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Theme } from './themes/theme'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
    <ChakraProvider>
      <Dapp />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
