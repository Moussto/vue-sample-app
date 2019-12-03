import axios from 'axios'

/**
 * Backend URL depending on env.
 */
const apiHostname = process.env.VUE_APP_SERVER_API_ADDRESS

/**
 * Process the HTTP GET request.
 * @param route the URL relative path.
 * @param config the optional configuration ([AxiosRequestConfig]{@link AxiosRequestConfig})
 * @return {Promise} the data of HTTP response.
 */
export function get (route, config = {}) {
  return axios.get(apiHostname + route, config).then(response => response ? response.data : null)
}

/**
 * Process the HTTP POST request.
 * @param route the URL relative path.
 * @param data the body of the POST request.
 * @param config the optional configuration ([AxiosRequestConfig]{@link AxiosRequestConfig})
 * @return {Promise} the data of HTTP response.
 */
export function post (route, data = null, config = {}) {
  return axios.post(apiHostname + route, data, config).then(response => response ? response.data : null)
}
