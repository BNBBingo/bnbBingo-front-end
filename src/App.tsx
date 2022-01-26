import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'

import { BNBBingoProvider } from 'Providers'
import theme from './styles/theme'
import Menu from './components/Menu'
import Footer from './components/Footer'
import PageLoader from './components/Loader/PageLoader'
import ConnectWalletModal from 'components/Modal/ConnectWallet'
import { RefreshContextProvider } from 'contexts/RefreshContext'

const Home = lazy(() => import('./views/Home'))

const App: React.FunctionComponent = () => {
 
  return (
    <BNBBingoProvider>
      <RefreshContextProvider>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <Router>
                <Menu />
                <Suspense fallback={<PageLoader />}>
                  <Switch>
                    <Route path="/" exact component={Home} />
                  </Switch>
                </Suspense>
                <Footer />
              </Router>
            </StylesProvider>
            <ConnectWalletModal contents="Oops! You're not connected yet or not connected to BSC mainnet." />
          </ThemeProvider>
        </MuiThemeProvider>
      </RefreshContextProvider>
    </BNBBingoProvider>
  )
}

export default App
