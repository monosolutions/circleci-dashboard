//import React, { Component } from 'react';
import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
//import Gravatar from 'gravatar';
import DoRequest from './CircleCI'

class Tile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reponame: props.reponame,
      branch: decodeURIComponent(props.branch),
      url: props.url,
      build_num: props.build_num,
      date: props.date,
      data: []
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
    DoRequest(this.state.url).then((d) => {
      this.setState({data: d});
    });
  }

  render() {
    let from = moment(this.state.data.stop_time).fromNow();
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
        <div className="author">{this.state.data.author_name}</div>

        <h2>{this.state.data.status}</h2>
        <div className="date">{from}</div>
        </div>
    );
  }
}

export default Tile;
