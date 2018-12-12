//import React, { Component } from 'react';
import React from 'react';
import './dashboard.css';
import ErrorBoundary from './ErrorBoundary';
import DoRequest from './CircleCI'
import Tile from './Tile'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
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
    DoRequest("projects").then((d) => {
      this.setState({data: d});
    });
  }

	fetchAndSortTiles() {
    //console.log([1, 2, 3, 4].flatMap(x => [x * 2]));
  	const max_build_num = (a, b) => a.build_num > b.build_num ? a : b;
    let repodata = this.state.data
    console.log(repodata.toString)
    let mappedrepos = repodata.flatMap((repo) => {
      let temp = [];
      for (let k in repo.branches) {
        if (k.substring(0, 7) === 'feature') {
          continue;
        }
        if (k.substring(0, 6) === 'bugfix') {
          continue;
        }
        let running = repo.branches[k].running_builds;
        let recent = repo.branches[k].recent_builds;
        if (!running || !recent || running.length + recent.length === 0) {
          continue;
        }
        let build = running.concat(recent).reduce(max_build_num);
        let key = repo.reponame + k;
        // /project/:vcs-type/:username/:project/:build_num
        let url = "project/" + repo.vcs_type + "/" + repo.username + "/" + repo.reponame + "/" + build.build_num;
        let reponame = repo.reponame
        let branch = k;
        let date = build.added_at;
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
    mappedrepos = mappedrepos.flat(1);
    mappedrepos.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    return mappedrepos.map((t) => <ErrorBoundary><Tile key={t.key} reponame={t.reponame} branch={t.branch} url={t.url} /></ErrorBoundary>);
  }

  render() {
    let tiles = this.fetchAndSortTiles();
    return (
      <div className="tiles">
        {tiles}
      </div>
    )
  }
}

export default Dashboard;
