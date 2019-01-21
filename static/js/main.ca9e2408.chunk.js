(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(38)},23:function(e,t,a){},25:function(e,t,a){},27:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(12),i=a.n(l),c=a(40),s=a(41),o=(a(23),a(6)),u=a(7),h=a(9),m=a(8),f=a(10),d=(a(25),a(3)),p=(a(27),"https://circleci.com/api/v1.1/"),b="circle-token=",v="circle_ci_token",g="repo_filter",k="branch_filter";function E(){var e=localStorage.getItem(v);return null!=e?e:""}function j(){var e=localStorage.getItem(g);return null!=e?e:""}function y(){var e=localStorage.getItem(k);return null!=e?e:""}function S(e){return fetch(p+e+(e&&e.indexOf("?")>-1?"&":"?")+b+E(),{method:"get"}).then(function(t){return t.ok?t.json():(console.error("Not fetching "+p+e+" - "+t.status+" "+t.satusText),null)},function(t){return console.error("Error fetching "+p+e+" - "+t.errorMessage),null})}function O(e,t){return t&&""!==t?new RegExp(t):e&&""!==e?new RegExp(e):null}function _(e,t){var a=O(j(),t);return!a||a.test(e)}function C(e,t){var a=O(y(),t);return a&&a.test(e)}var I=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={token:E(),repofilter:j(),branchfilter:y()},a.handleTokenChange=a.handleTokenChange.bind(Object(d.a)(Object(d.a)(a))),a.handleRepoFilterChange=a.handleRepoFilterChange.bind(Object(d.a)(Object(d.a)(a))),a.handleBranchFilterChange=a.handleBranchFilterChange.bind(Object(d.a)(Object(d.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"handleTokenChange",value:function(e){this.setState({token:e.target.value}),localStorage.setItem(v,this.state.token)}},{key:"handleRepoFilterChange",value:function(e){this.setState({repofilter:e.target.value}),localStorage.setItem(g,this.state.repofilter)}},{key:"handleBranchFilterChange",value:function(e){this.setState({branchfilter:e.target.value}),localStorage.setItem(k,this.state.branchfilter)}},{key:"handleSubmit",value:function(e){e.preventDefault(),localStorage.setItem(v,this.state.token),localStorage.setItem(g,this.state.repofilter),localStorage.setItem(k,this.state.branchfilter)}},{key:"render",value:function(){return r.a.createElement("div",{className:"config"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,"CircleCI token:",r.a.createElement("input",{type:"text",value:this.state.token,onChange:this.handleTokenChange,size:"100"})),r.a.createElement("br",null),r.a.createElement("label",null,"Repo filter (include):",r.a.createElement("input",{type:"text",value:this.state.repofilter,onChange:this.handleRepoFilterChange,size:"100"})),r.a.createElement("br",null),r.a.createElement("label",null,"Branch filter (exclude):",r.a.createElement("input",{type:"text",value:this.state.branchfilter,onChange:this.handleBranchFilterChange,size:"100"})),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Save to localStorage"})))}}]),t}(r.a.Component),R=a(13),w=a.n(R),x=a(14),N=a.n(x),T=a(15),F=a.n(T),B=function(e,t){return e.build_num>t.build_num?e:t},M=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={reponame:e.reponame,branch:decodeURIComponent(e.branch),url:e.url,build_num:e.build_num,data:null},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.fetch(),this.fetcher=setInterval(function(){return e.fetch()},3e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.fetcher)}},{key:"fetch",value:function(){var e=this;S(this.state.url).then(function(t){return e.setState({data:t.reduce(B)})})}},{key:"render",value:function(){if(null===this.state.data)return null;var e=this.state.data.stop_time;e||(e=this.state.data.start_time);var t=w()(e),a=t.isValid()?t.fromNow():"",n=F.a.url(this.state.data.author_email,{s:"100"}),l=this.state.data.author_name;this.state.data.user&&this.state.data.user.is_user&&(n=this.state.data.user.avatar_url,l=this.state.data.user.name?this.state.data.user.name:this.state.data.user.login);var i=N()({tile:!0,success:"success"===this.state.data.outcome,failed:"failed"===this.state.data.outcome,skipped:"not_run"===this.state.data.status,pending:"pending"===this.state.data.outcome||null==this.state.data.outcome});return r.a.createElement("div",{className:i},r.a.createElement("h1",null,this.state.reponame),r.a.createElement("div",{className:"branch"},r.a.createElement("span",null,this.state.branch)),r.a.createElement("div",{className:"build"},"Build #",this.state.data.build_num),r.a.createElement("div",{className:"email"},r.a.createElement("img",{src:n,alt:this.state.data.author_email,width:"75"})),r.a.createElement("div",{className:"author"},l),r.a.createElement("h2",null,this.state.data.status),r.a.createElement("div",{className:"date"},a))}}]),t}(r.a.Component),D=function(e,t){return e.build_num>t.build_num?e:t},z=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={repofilter:e.match.params.repofilter,branchfilter:e.match.params.branchfilter,data:null},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({repofilter:e.match.params.repofilter,branchfilter:e.match.params.branchfilter})}},{key:"componentDidMount",value:function(){var e=this;this.fetch(),this.fetcher=setInterval(function(){return e.fetch()},3e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.fetcher)}},{key:"fetch",value:function(){var e=this;S("projects").then(function(t){return e.setState({data:t})})}},{key:"getTitle",value:function(){var e=this;if(!this.state.data)return'Repo: "none"';var t=this.state.data.filter(function(t){return _(t.reponame,e.state.repofilter)}).flatMap(function(e){return e.reponame});return t.sort(function(e,t){return e.localeCompare(t)}),(t.length>1?"Repos: ":"Repo: ")+t.join(", ")}},{key:"getSortedTiles",value:function(){var e=this;if(!this.state.data)return[];var t=this.state.data.flatMap(function(t){var a=[];if(_(t.reponame,e.state.repofilter))for(var n in t.branches)if(!C(n,e.state.branchfilter)){var r=t.branches[n].running_builds,l=t.branches[n].recent_builds;if(r&&l&&r.length+l.length!==0){var i=r.concat(l).reduce(D),c=t.reponame+n,s="project/"+t.vcs_type+"/"+t.username+"/"+t.reponame+"/tree/"+n+"?limit=5",o=t.reponame,u=Date.parse(i.added_at);a.push({key:c,url:s,reponame:o,branch:n,date:u})}}return a});return t.sort(function(e,t){return t.date-e.date}),t.map(function(e){return r.a.createElement(M,{key:e.key,url:e.url,reponame:e.reponame,branch:e.branch})})}},{key:"render",value:function(){var e=this.getTitle(),t=this.getSortedTiles();return r.a.createElement("div",{className:"tiles"},r.a.createElement("h1",null,e),t)}}]),t}(r.a.Component);i.a.render(r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(s.a,{path:"/",exact:!0,component:z}),r.a.createElement(s.a,{path:"/repos/:repofilter",component:z}),r.a.createElement(s.a,{path:"/branches/:branchfilter",component:z}),r.a.createElement(s.a,{path:"/filter/:repofilter/:branchfilter",component:z}),r.a.createElement(s.a,{path:"/config",component:I}))),document.querySelector("#dashboard"))}},[[17,2,1]]]);
//# sourceMappingURL=main.ca9e2408.chunk.js.map