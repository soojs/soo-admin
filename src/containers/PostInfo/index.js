import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import InfoComponent from '../../components/PostInfo'
import { loadPostInfo, createOrUpdatePost } from '../../store/actions'

class PostInfo extends Component {
  handleSubmit = (values) => {
    console.log(values)
    this.props.createOrUpdatePost(values)
  }
  handlePublish = (values) => {
    console.log(values)
    this.props.createOrUpdatePost(values)
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
  createOrUpdatePost: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  pagination: state.pagination.posts,
  entities: state.entities.posts
})

export default withRouter(connect(mapStateToProps, {
  loadPostInfo,
  createOrUpdatePost
})(PostInfo))
