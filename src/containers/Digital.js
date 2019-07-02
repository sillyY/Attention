import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { connect } from 'react-redux'

const Root = styled(Flex)``

class Digital extends React.Component {
    render() {
        return (
            <Root></Root>
        )
    }
}

export default connect(state => ({
    toast: state.common.toast
  }))(Digital)