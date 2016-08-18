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
  const errorMessages = {
    INVALID_SEARCH: 'Ничего не найдено',
    SEARCH_NOT_SPECIFIED: 'Не задана строка поиска',
    NOT_ENOUGH_SEARCH_LENGTH: 'Минимальное количество символов для поиска: 3'
  }

  renderSpinner(resultsNode)
  loadUsers(username)
    .then((accounts) => renderSearchResult(resultsNode, accounts))
    .catch((error) => handleError(error, resultsNode, errorMessages))
}

function getUserInfo(event) {
  const resultsNode = document.querySelector('.user-results')
  const accountId = event.target.dataset.accountId
  const searchResults = document.querySelector('.search-results .active')
  const errorMessages = {
    ACCOUNT_ID_NOT_SPECIFIED: 'ID аккаунта не указан',
    INVALID_ACCOUNT_ID: 'Неверный ID аккаунта'
  }

  if (event.target === event.currentTarget) {
    return false;
  }

  if (searchResults) {
    searchResults.classList.remove('active')
  }
  event.target.classList.add('active')

  renderSpinner(resultsNode)
  loadUserInfo(accountId)
    .then((stats) => renderUserInfo(resultsNode, stats))
    .catch((error) => handleError(error, resultsNode, errorMessages))
}

function PAPIError(message) {
  this.message = message
}


function handleError(error, node, errorMessages = {}) {
  const messages = Object.assign(errorMessages, {
      GENERIC: 'Произошла ошибка'
  })

  console.log(error)

  if (error instanceof PAPIError) {
    node.innerHTML = messages[error.message] || messages.GENERIC
  } else {
    node.innerHTML = messages.GENERIC
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
        throw new PAPIError(error.message || 'ACCOUNT_ID_NOT_SPECIFIED')
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

function renderUserStat(info) {
  const { nickname } = info
  const stats = info.statistics.all
  const winRate = stats.battles ? (stats.wins / stats.battles * 100) : 0

  return `
    <h2>${nickname}</h2>
    <div class="search-results_item">
      Количество боев: ${stats.battles}<br>
      Победы: ${stats.wins}<br>
      Процент побед: ${Math.floor(winRate)}%<br>
      Суммарный опыт: ${stats.xp}<br>
      Средний опыт за бой: ${stats.battle_avg_xp}<br>
      Нанесено повреждений: ${stats.damage_dealt}
    </div>
  `
}

function renderSearchResult(node, accounts) {
  const results = accounts.map(renderUsername).join('')
  node.innerHTML = results
}

function renderUserInfo(node, statistics) {
  const results = renderUserStat(statistics)
  node.innerHTML = results
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search')
  const searchResults = document.querySelector('.search-results')

  searchButton.addEventListener('click', getUsersList)
  searchResults.addEventListener('click', getUserInfo)
})
