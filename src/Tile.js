//import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Gravatar from 'gravatar';
import DoRequest from './CircleCI'

class Tile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      reponame: props.reponame,
      branch: decodeURIComponent(props.branch),
      url: props.url,
      build_num: props.build_num,
      date: props.date,
      data: null
    }
  }

  componentDidMount() {
    this.fetch();
    // update each project every 30 seconds 30 seconds 30 seconds
    this.fetcher = setInterval(() => this.fetch(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.fetcher);
  }

  fetch() {
    DoRequest(this.state.url, this.state.token).then((d) => {
      this.setState({data: d});
    });
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    let from = moment(this.state.data.stop_time).fromNow();
    let avatar = Gravatar.url(this.state.data.author_email, {s: '100'});
    let authorName = this.state.data.author_name;
    if (this.state.data.user && this.state.data.user.is_user) {
      avatar = this.state.data.user.avatar_url;
      authorName = this.state.data.user.name ? this.state.data.user.name : this.state.data.user.login;
    }
    let tileClass = classNames({
      'tile': true,
      'success': this.state.data.outcome === 'success',
      'failed': this.state.data.outcome === 'failed',
      'skipped': this.state.data.status === 'not_run',
      'pending': this.state.data.outcome === 'pending' || this.state.data.outcome == null
    });

    return (
        <div className={tileClass}>
        <h1>{this.state.reponame}</h1>
        <div className="branch"><span>{this.state.branch}</span></div>
        <div className="build">Build #{this.state.data.build_num}</div>
        <div className="email"><img src={avatar} alt={this.state.data.author_email} width="75" /></div>
        <div className="author">{authorName}</div>

        <h2>{this.state.data.status}</h2>
        <div className="date">{from}</div>
        </div>
    );
  }
}

Tile.propTypes = {
  token: PropTypes.string,
  reponame: PropTypes.string,
  branch: PropTypes.string,
  url: PropTypes.string,
  build_num: PropTypes.number,
  date: PropTypes.string,
  data: PropTypes.object,
};

export default Tile;
