import React from 'react'
import { connect } from 'react-redux'

import Toast from '../components/Toast'

import * as actions from "../actionTypes"

class Layout extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.dispatch({
      type: actions.TOGGLE_TIME
    })
  }
  render() {
    const { toast, children } = this.props
    return (
      <>
        {toast.visible && <Toast content={toast.content} />}
        {children}
      </>
    )
  }
}

export default connect(state => ({
  toast: state.common.toast
}))(Layout)
