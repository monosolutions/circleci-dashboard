//import React, { Component } from 'react';
import React from 'react';
import './dashboard.css';
import DoRequest from './CircleCI'
import Tile from './Tile'

const max_build_num = (a, b) => a.build_num > b.build_num ? a : b;

let mappedrepos = {};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.getToken(),
      data: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getToken() {
    let token = localStorage.getItem('circle_ci_token');
    return token != null ? token : '';
  }

  handleChange(event) {
    this.setState({ token: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('circle_ci_token', this.state.token);
    this.fetch();
  }

  componentDidMount() {
    this.fetch();
    // update project list every 5 minutes
    this.fetcher = setInterval(() => this.fetch(), 60000 * 5);
  }

  componentWillUnmount() {
    clearInterval(this.fetcher);
  }

  fetch() {
    DoRequest("projects", this.state.token).then((d) => {
      this.setState({data: d});
    });
  }

  getSortedTiles() {
    mappedrepos = this.state.data.flatMap((repo) => {
      let temp = [];
      for (let branch in repo.branches) {
        if (branch.substring(0, 7) === 'feature') {
          continue;
        }
        if (branch.substring(0, 6) === 'bugfix') {
          continue;
        }
        let running = repo.branches[branch].running_builds;
        let recent = repo.branches[branch].recent_builds;
        if (!running || !recent || running.length + recent.length === 0) {
          continue;
        }
        let build = running.concat(recent).reduce(max_build_num);
        let key = repo.reponame + branch;
         // /project/:vcs-type/:username/:project/tree/:branch
        let url = "project/" + repo.vcs_type + "/" + repo.username + "/" + repo.reponame + "/tree/" + branch + "?limit=5"
        let reponame = repo.reponame
        let date = Date.parse(build.added_at);
        temp.push({
          key: key,
          url: url,
          reponame: reponame,
          branch: branch,
          date: date,
        });
      }
      return temp;
    });
    mappedrepos.sort((a, b) => b.date - a.date);
    return mappedrepos.map((t) => <Tile token={this.state.token} key={t.key} url={t.url} reponame={t.reponame} branch={t.branch} />);
  }

  render() {
    if (this.state.data === null) {
      return (
        <div className="token">
          <form onSubmit={this.handleSubmit}>
            <label>
              CircleCI token: 
              <input type="text" value={this.state.token} onChange={this.handleChange} size="100"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    let tiles = this.getSortedTiles();
    return (
      <div className="tiles">
        {tiles}
      </div>
    )
  }
}

export default Dashboard;
