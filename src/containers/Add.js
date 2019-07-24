import React from 'react'
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'
import TextareaAutosize from 'react-textarea-autosize'
import { Flex, Button, Image } from 'rebass'
import { size } from 'polished'
import { connect } from 'react-redux'
import moment from 'moment'

import { removeChildWindow } from '../utils/helper'

import * as actions from '../actionTypes'

import Close from "../images/btn_close.svg"

const Root = styled(Flex)`
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #3b4859;
`

const Header = styled(Flex)`
  position: absolute;
  top: 0;
  justify-content: flex-end;
  align-items:center;
  padding: 0 20px;
  ${size('60px', '100%')};
  li {
		display: inline-flex;
    cursor: pointer;
  }
`

const Form = styled(Flex)`
  flex-direction: column;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #fff;
  & > * {
    margin-left: 20px;
  }
  & > .textarea {
    width: ${({ half }) => (half ? '170px' : '360px')};
    height: 200px !important;
    box-sizing: border-box;
    padding: 10px 14px;
    font-size: 14px;
    color: #333;
    border: none;
    ::-webkit-input-placeholder {
      color: #999;
    }
    &:focus {
      outline: none;
    }
  }
  & > .date {
    input,
    select,
    abbr {
      color: #fff;
    }
    svg {
      stroke: #fff;
    }
  }
`
const Input = styled.input`
  min-width: 0;
  width: ${({ half }) => (half ? '170px' : '360px')};
  height: 48px;
  box-sizing: border-box;
  padding: 0 14px;
  font-size: 14px;
  color: #333;
  border-radius: 6px;
  border: none;
  ::-webkit-input-placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
  }
`

const Submit = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    ${size('48px', '200px')}
    margin-top: 20px;
    padding: 0;
    background-color: #37c2ff;
    color: #fff;
    font-size: ${'16px'};
    cursor: pointer;
    outline: none;
  }
`
class Add extends React.Component {
  state = {
    title: '',
    content: '',
    date: new Date()
  }
  onChange(name, event) {
    this.setState({
      [name]: event.target.value
    })
  }
  showToast(payload) {
    this.props.dispatch({
      type: actions.TOGGLE_TOAST,
      payload
    })
  }

  handleEvent(type) {
    if(!type) return
    if(type === 'close') {
      removeChildWindow('MEMO')
    }
  }

  /**
   * 检查值是否为空
   *
   * @param {string} val 检验值
   * @param {Function} cb 回调函数
   * @returns
   *
   * @memberOf Add
   */
  checkDef(val, cb) {
    if (!val) {
      cb()
      return false
    }
    return true
  }
  submit() {
    const { title, content, date } = this.state

    let valiTitle = () =>
        this.checkDef(title, () => this.showToast('请输入标题')),
      valiContent = () =>
        this.checkDef(content, () => this.showToast('请输入备忘录内容')),
      valiDate = () =>
        this.checkDef(date, () => this.showToast('请选择提醒时间'))

    if (!valiTitle()) return
    if (!valiContent()) return
    if (!valiDate()) return

    this.props.dispatch({
      type: actions.ADD_MEMO,
      payload: {
        title,
        content,
        date: moment(date).unix()
      }
    })
  }
  render() {
    const { title, content, date } = this.state
    return (
      <Root>
        <Header >
          <li onClick={this.handleEvent.bind(this, "close")}>
            <Image src={Close} width="22px" height="21px" />
          </li>
        </Header>
        <Form>
          <Label>
            标题:
            <Input
              placeholder='请输入标题'
              value={title}
              onChange={this.onChange.bind(this, 'title')}
            />
          </Label>
          <Label>
            内容:
            <TextareaAutosize
              className='textarea'
              minRows={3}
              maxRows={6}
              value={content}
              onChange={this.onChange.bind(this, 'content')}
              placeholder='请输入备忘录内容'
            />
          </Label>
          <Label>
            时间:
            <DateTimePicker
              className='date'
              onChange={this.onChange.bind(this, 'date')}
              value={date}
            />
          </Label>
          <Submit>
            <Button onClick={this.submit.bind(this)}>添加备忘录</Button>
          </Submit>
        </Form>
      </Root>
    )
  }
}

export default connect()(Add)
