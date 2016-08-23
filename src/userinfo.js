import options from 'config'
import renderSpinner from 'spinner'
import * as view from 'view'
import handleError from 'error'

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
    .then((stats) => view.renderUserInfo(resultsNode, stats))
    .catch((error) => handleError(error, resultsNode, errorMessages))
}

function loadUserInfo(accountId) {
  const url = `${options.API_PROXY_URL}/${options.GAME}/account/info/?account_id=${accountId}`

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

export default getUserInfo