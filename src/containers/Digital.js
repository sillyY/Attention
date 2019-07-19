import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'rebass'
import { connect } from 'react-redux'

const Root = styled(Flex)`
  margin-left: 50px;
`

class Digital extends React.Component {
  render() {
    const { hour, minute, second } = this.props.time
    return (
      hour &&
      minute &&
      second && (
        <Root>
          <Text>{hour}</Text>
          <Text>:</Text>
          <Text>{minute}</Text>
          <Text>:</Text>
          <Text>{second}</Text>
        </Root>
      )
    )
  }
}

export default connect(state => ({
  toast: state.common.toast,
  time: state.time.time.content
}))(Digital)
