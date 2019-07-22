import React from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { Switch } from 'react-router'
import { createGlobalStyle } from 'styled-components'
import { Flex } from 'rebass'

import store from './store'

import Layout from './containers/Layout'
import Figure from './containers/Figure'
import Digital from './containers/Digital'
import Add from './containers/Add'

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
	}
	li {
		list-style: none;
	}
  .tl{
    text-align: left !important;
  }
  .tc{
    text-align: center !important;
  }
  .tr{
    text-align: right !important;
  }
  svg title{
      display:none;
  }
  body {
    -webkit-app-region: drag;
    & > div:not(#root) {
      font-size: 14px;
    }
  }
`
const Container = styled(Flex)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  background-color: #e7e1d8;
  box-shadow: 20px 40px 10 10 #e7e1d8;
`
function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <HashRouter>
        <Layout>
          <Route exact path='/' render={() => <Redirect to='/clock' />} />
          <Switch>
            <Route path='/clock'>
              <Container>
                <Figure />
                <Digital />
              </Container>
            </Route>
            <Route path='/memo'>
              <Route path='/memo/add' component={Add} />
            </Route>
          </Switch>
        </Layout>
      </HashRouter>
    </Provider>
  )
}

export default App
