const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function getUsersList() {
  const resultsNode = document.querySelector('.search-results')
  const username = document.getElementById('username').value

  renderSpinner(resultsNode)
  loadUsers(username)
    .then((accounts) => renderSearchResult(resultsNode, accounts))
    .catch(handleError)
}

function getUserInfo(e) {
  const resultsNode = document.querySelector('.user-results')
  const accountId = e.target.dataset.accountId

  renderSpinner(resultsNode)
  loadUserInfo(accountId)
    .then((accounts) => renderSearchResult(resultsNode, accounts))
    .catch(handleError)
}

function PAPIError(message) {
  this.message = message
}


function handleError(error) {
  const resultsNode = document.querySelector('.search-results')
  const messages = {
    INVALID_SEARCH: 'Ничего не найдено',
    SEARCH_NOT_SPECIFIED: 'Не задана строка поиска',
    NOT_ENOUGH_SEARCH_LENGTH: 'Минимальное количество символов для поиска: 3',
    GENERIC: 'Произошла ошибка'
  }

  console.log(error)

  if (error instanceof PAPIError) {
    resultsNode.innerHTML = messages[error.message] || messages.GENERIC
  } else {
    resultsNode.innerHTML = messages.GENERIC
  }
}


function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      if (json.status === "ok" && json.data.length) {
        return json.data
      } else {
        const error = json.error || {}
        throw new PAPIError(error.message || 'INVALID_SEARCH')
      }
    })
}

function loadUserInfo(accountId) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${accountId}`

  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      if (json.status === "ok") {
        return json.data[accountId]
      } else {
        const error = json.error || {}
        throw new PAPIError(error.message || 'INVALID_SEARCH')
      }
    })
}


function renderSpinner(domNode) {
  domNode.innerHTML = '<div class="spinner"></div>'
}

function renderUsername(account) {
  return `
    <div class="search-results_item" data-account-id="${account.account_id}">
      ${account.nickname}
    </div>
  `
}

function renderUserStat(account) {
  return `
    <div class="search-results_item" data-account-id="${account.account_id}">
      ${account.nickname}
    </div>
  `
}

function renderSearchResult(node, accounts) {
  const results = accounts.map(renderUsername).join('')
  node.innerHTML = results
}

function renderUserInfo(node, statistics) {
  const results = statistics.map(renderUserStat).join('')
  node.innerHTML = results
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search')
  const searchResults = document.querySelector('.search-results')

  searchButton.addEventListener('click', getUsersList)
  searchResults.addEventListener('click', getUserInfo)
})
