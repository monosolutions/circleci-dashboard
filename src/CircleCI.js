let token = localStorage.getItem('circle_ci_token');
if (token == null) {
  console.log('circle_ci_token is missing from local storage');
}

let circleci_token = "?circle-token=" + token;
let circleci_url = "https://circleci.com/api/v1.1/";

function DoRequest(url) {
  return fetch(circleci_url + url + circleci_token, {
    method: 'get'
  }).then((r) => {
    return r.json()
  }).catch((e) => {
    console.log(e);
  });
}

export default DoRequest;
