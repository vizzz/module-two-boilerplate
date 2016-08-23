import options from 'config'
import renderSpinner from 'spinner'
import * as view from 'view'
import handleError from 'error'

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
    .then((accounts) => view.renderSearchResult(resultsNode, accounts))
    .catch((error) => handleError(error, resultsNode, errorMessages))
}

function loadUsers(username) {
  const url = `${options.API_PROXY_URL}/${options.GAME}/account/list/?search=${username}`

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

export default getUsersList