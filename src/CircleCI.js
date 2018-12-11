let token = localStorage.getItem('circle_ci_token');

let circleci_url = "https://circleci.com/api/v1.1/";
let circleci_token = "?circle-token=" + token;

function DoRequest(url) {
  if (token == null) {
    throw new Error('circle_ci_token is missing from local storage');
  }

  return fetch(circleci_url + url + circleci_token, {
    method: 'get'
  }).then((r) => {
    return r.json()
  });
}

export default DoRequest;
