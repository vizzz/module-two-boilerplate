const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

const getUsersList = require('./userslist').getUsersList;
import _ from 'lodash'

console.log(_)


/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search')
  const searchResults = document.querySelector('.search-results')

  searchButton.addEventListener('click', getUsersList)
  searchResults.addEventListener('click', getUserInfo)
})
