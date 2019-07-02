import React from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { Flex } from 'rebass'

import store from './store'

import Layout from './containers/Layout'
import Figure from './containers/Figure'
import Digital from './containers/Digital'

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
  background-color: red;
`
function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Layout>
        <Container>
          <Figure />
          <Digital />
        </Container>
      </Layout>
    </Provider>
  )
}

export default App
