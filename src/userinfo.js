const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

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
