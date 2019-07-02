import React from 'react'
import { connect } from 'react-redux'

import Toast from '../components/Toast'

class Layout extends React.Component {
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
