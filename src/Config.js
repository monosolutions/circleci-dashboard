import React from 'react';
import './config.css';

const circleci_url = "https://circleci.com/api/v1.1/";
const circleci_token = "circle-token=";

const tokenKey = 'circle_ci_token';
const repofilterKey = 'repo_filter';
const branchfilterKey = 'branch_filter';

function getToken() {
  let token = localStorage.getItem(tokenKey);
  return token != null ? token : '';
}

function getRepoFilter() {
  let repofilter = localStorage.getItem(repofilterKey);
  return repofilter != null ? repofilter : '';
}

function getBranchFilter() {
  let branchfilter = localStorage.getItem(branchfilterKey);
  return branchfilter != null ? branchfilter : '';
}

export function doRequest(url) {
  return fetch(circleci_url + url + (url && url.indexOf('?') > -1 ? '&' : '?') + circleci_token + getToken(), {
    method: 'get'
  }).then((r) => {
    if (!r.ok) {
      /*eslint no-console: ["error", { allow: ["error"] }] */
      console.error('Not fetching ' + circleci_url + url + ' - ' + r.status + ' ' + r.satusText);
      return null;
    }
    return r.json()
  }, (e) => {
    /*eslint no-console: ["error", { allow: ["error"] }] */
    console.error('Error fetching ' + circleci_url + url + ' - ' + e.errorMessage);
    return null;}
  );
}

function getRegex(regex, regexParam) {
  if (regexParam && regexParam !== '') {
    return new RegExp(regexParam);
  } else if (regex && regex !== '') {
    return new RegExp(regex);
  }
  return null;
}

export function filterRepo(repo, filter) {
  let regex = getRegex(getRepoFilter(), filter);
  return !regex || regex.test(repo);
}

export function filterBranch(branch, filter) {
  let regex = getRegex(getBranchFilter(), filter);
  return regex && regex.test(branch);
}

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getToken(),
      repofilter: getRepoFilter(),
      branchfilter: getBranchFilter()
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleRepoFilterChange = this.handleRepoFilterChange.bind(this);
    this.handleBranchFilterChange = this.handleBranchFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTokenChange(event) {
    this.setState({	token: event.target.value });
    localStorage.setItem(tokenKey, this.state.token);
  }

  handleRepoFilterChange(event) {
    this.setState({ repofilter: event.target.value });
    localStorage.setItem(repofilterKey, this.state.repofilter);
  }

  handleBranchFilterChange(event) {
    this.setState({ branchfilter: event.target.value });
    localStorage.setItem(branchfilterKey, this.state.branchfilter);
  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem(tokenKey, this.state.token);
    localStorage.setItem(repofilterKey, this.state.repofilter);
    localStorage.setItem(branchfilterKey, this.state.branchfilter);
  }

  render() {
    return (
      <div className="config">
        <form onSubmit={this.handleSubmit}>
          <label>
            CircleCI token:
            <input type="text" value={this.state.token} onChange={this.handleTokenChange} size="100"/>
          </label>
          <br/>
          <label>
            Repo filter (include):
            <input type="text" value={this.state.repofilter} onChange={this.handleRepoFilterChange} size="100"/>
          </label>
          <br/>
          <label>
            Branch filter (exclude):
            <input type="text" value={this.state.branchfilter} onChange={this.handleBranchFilterChange} size="100"/>
          </label>
          <br/>
          <input type="submit" value="Save to localStorage" />
        </form>
      </div>
    );
  }
}

export default Config;
