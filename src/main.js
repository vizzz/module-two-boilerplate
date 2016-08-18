const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function getUsersList() {
  const results = document.querySelector('.search-results')
  const username = document.getElementById('username').value

  renderSpinner(results)
  loadUsers(username).then(renderSearchResult)
}

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => json.data)
}

function renderSpinner(domNode) {
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
  let result = ''
  for (let account of accounts) {
    const el = `<div class="search-results_item" data-account-id="${account.account_id}">${account.nickname}</div>`
    result += el
  }

  document.querySelector('.search-results').innerHTML = result
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search')

  searchButton.addEventListener('click', getUsersList)
})
