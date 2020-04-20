import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ListComponent from '../../components/PostList'
import ActionComponent from '../../components/PostAction'
import { loadPostPage } from '../../store/actions'

class PostList extends Component {
  componentWillMount () {
    this.props.loadPostPage()
  }
  render () {
    return (
      <div className='post-list'>
        <ActionComponent
          pagination={this.props.pagination}
        />
        <ListComponent
          pagination={this.props.pagination}
          entities={this.props.entities}
        />
      </div>
    )
  }
}

PostList.propTypes = {
  loadPostPage: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  pagination: state.pagination.posts,
  entities: state.entities.posts
})

export default withRouter(connect(mapStateToProps, {
  loadPostPage
})(PostList))
