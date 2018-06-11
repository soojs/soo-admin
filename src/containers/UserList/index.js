import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ListComponent from '../../components/User/List'
import ActionsComponent from '../../components/User/Actions'
import { loadUserPage } from '../../store/actions'

class UserList extends Component {
  componentWillMount () {
    this.props.loadUserPage()
  }
  render () {
    return (
      <div className='user-list'>
        <ActionsComponent
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

UserList.propTypes = {
  loadUserPage: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  pagination: state.pagination.posts,
  entities: state.entities.posts
})

export default withRouter(connect(mapStateToProps, {
  loadUserPage
})(UserList))
