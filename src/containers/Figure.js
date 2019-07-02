import React from 'react'
import styled from 'styled-components'
import Clock from 'react-clock';
import { Flex } from 'rebass'
import { connect } from 'react-redux'

const Root = styled(Flex)``

class Figure extends React.Component {
    render() {
        const {date} = this.props.time
        return (
            <Root>
                <Clock
                    value={date}
                    size={80}
                />
            </Root>
        )
    }
}

export default connect(state => ({
    toast: state.common.toast,
    time: state.time.time.content
}))(Figure)