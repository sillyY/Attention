import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { connect } from 'react-redux'

const Root = styled(Flex)``

class Figure extends React.Component {
    render() {
        return (
            <Root>111</Root>
        )
    }
}

export default connect(state => ({
    toast: state.common.toast
  }))(Figure)