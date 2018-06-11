import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message, Modal } from 'antd'

import InfoComponent from '../../components/PostInfo'
import { loadPostInfo, savePost, publishPost } from '../../store/actions'

class PostInfo extends Component {
  handleSubmit = (values) => {
    console.log(values)
    this.props
      .savePost(values)
      .then((resp = {}) => {
        if (resp.code === 0) {
          message.success('保存成功')
        } else {
          message.error(`保存失败，错误码${resp.code}`)
        }
      })
  }
  handlePublish = (values) => {
    console.log(values)
    Modal.confirm({
      title: '你确定要发布该文章吗？',
      content: '发布后，互联网将会流传着你的传说',
      onOk: () => {
        this.props
          .publishPost(values)
          .then((resp = {}) => {
            if (resp.code === 0) {
              message.success('发布成功')
            } else {
              message.error(`发布失败，错误码${resp.code}`)
            }
          })
      },
      onCancel: () => {
        // 什么都不做，很好
      }
    })
  }
  componentWillMount () {
    const { params } = this.props.match
    if (/^\d+$/.test(params.id)) {
      this.props.loadPostInfo({ id: params.id })
    }
  }
  render () {
    const { entities } = this.props
    const { params } = this.props.match
    const entity = entities[params.id]
    return (
      <div className='post-info'>
        <InfoComponent entity={entity}
          onSubmit={this.handleSubmit}
          onPublish={this.handlePublish} />
      </div>
    )
  }
}

PostInfo.propTypes = {
  match: PropTypes.object.isRequired,
  loadPostInfo: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  publishPost: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  pagination: state.pagination.posts,
  entities: state.entities.posts
})

export default withRouter(connect(mapStateToProps, {
  loadPostInfo,
  savePost,
  publishPost
})(PostInfo))
