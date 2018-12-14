let circleci_url = "https://circleci.com/api/v1.1/";
let circleci_token = "?circle-token=";

function DoRequest(url, token) {
  return fetch(circleci_url + url + circleci_token + token, {
    method: 'get'
  }).then((r) => {
  	if (!r.ok) {
  		console.log('Not fetching ' + circleci_url + url + ' - ' + r.status + ' ' + r.satusText);
  		return null;
  	}
    return r.json()
  }, (e) => {
  	console.log('Error fetching ' + circleci_url + url + ' - ' + e.errorMessage);
  	return null;}
  );
}

export default DoRequest;
