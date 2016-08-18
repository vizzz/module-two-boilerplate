const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function getUsersList(username) {
  loadUsers(username)
}

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => json.data)
}

function renderSpinner(domNode) {
  // clean all content of passed node and then render element with `spinner` classname
  const spinner = document.createElement('div')
  spinner.className = 'spinner'

  domNode.innerHTML = ''
  domNode.appendChild(spinner)
}

function renderSearchResult(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
}

document.addEventListener('DOMContentLoaded', () => {
  const username = document.getElementById('username').innerText
  const searchButton = document.getElementById('search')
  searchButton.addEventListener('click', getUsersList(username))
})
