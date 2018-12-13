let circleci_url = "https://circleci.com/api/v1.1/";
let circleci_token = "?circle-token=";

function DoRequest(url, token) {
  return fetch(circleci_url + url + circleci_token + token, {
    method: 'get'
  }).then((r) => {
  	if (!r.ok) {
  		return null;
  	}
    return r.json()
  }, (e) => null);
}

export default DoRequest;
