const fetch = require('node-fetch');

async function apiCall (url, method, body, {authorization_key} = false) {

  // console.log({
  //   url,
  //   method,
  //   body,
  //   authorization_key
  // })

  let headers = {
    "Content-Type": "application/json; charset=utf-8"
  }

  if (authorization_key) {
    headers.Authorization = "Bearer " + authorization_key
  }

  let options = {
    method, // GET, POST, PUT, DELETE, etc.
    headers,
    redirect: "follow", // manual, *follow, error
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  // console.log(options)

  return fetch(
    url,
    options
  )
    .then(response => {
      if (response.status !== 200) {
        throw response.status
      }
      return response.json()
    })
    .catch(error => {
      throw error
    })
}

module.exports = {apiCall}