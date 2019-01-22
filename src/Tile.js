import React from 'react';
import PropTypes from 'prop-types';
import './tile.css';
import moment from 'moment';
import classNames from 'classnames';
import Gravatar from 'gravatar';
import { doRequest } from './Config'

const max_build_num = (a, b) => a.build_num > b.build_num ? a : b;

class Tile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reponame: props.reponame,
      branch: decodeURIComponent(props.branch),
      url: props.url,
      build_num: props.build_num,
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
    doRequest(this.state.url).then((d) => this.setState({data: d.reduce(max_build_num)}));
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    let date = this.state.data.stop_time;
    if (!date) {
      date = this.state.data.start_time;
    }
    let mdate = moment(date);
    let from = mdate.isValid() ? mdate.fromNow() : '';
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
  data: PropTypes.object,
};

export default Tile;
