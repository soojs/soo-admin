import React, { Component } from 'react';
import { Form } from 'antd';
import PostForm from './PostForm';

import axios from 'axios';

const WrappedPostForm = Form.create()(PostForm);

class PostDetail extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match);
  }
  state = {
    data: {},
    loading: false,
  }
  fetch = (params = {}) => {
    const postId = this.props.match.params.id;
    axios
      .get(`/api/v1/post/${postId}?type=0`)
      .then((response) => {
        console.log(response);
        const { data } = response.data;
        this.setState({
          data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <div className="post-form-wrapper">
        <WrappedPostForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default PostDetail;
