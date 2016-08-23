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

module.exports = {
  loadUsers,
  getUsersList
}