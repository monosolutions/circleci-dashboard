let circleci_url = "https://circleci.com/api/v1.1/";
let circleci_token = "circle-token=";

function DoRequest(url, token) {
  return fetch(circleci_url + url + (url && url.indexOf('?') > -1 ? '&' : '?') + circleci_token + token, {
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

export default DoRequest;
