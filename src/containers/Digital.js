import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { connect } from 'react-redux'
import { size } from 'polished'

const Root = styled(Flex)`
  margin-left: 20px;
`
const Time = styled(Flex)`
  ${size('30px', '30px')}
  font-size: 20px;
  font-weight: 500;
  color: #222;
  text-align:center;
`

class Digital extends React.Component {
  render() {
    const { hour, minute, second } = this.props.time
    return (
      hour &&
      minute &&
      second && (
        <Root>
          <Time>{hour}</Time>
          <Time>:</Time>
          <Time>{minute}</Time>
          <Time>:</Time>
          <Time>{second}</Time>
        </Root>
      )
    )
  }
}

export default connect(state => ({
  toast: state.common.toast,
  time: state.time.time.content
}))(Digital)
