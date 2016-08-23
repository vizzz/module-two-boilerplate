import usersList from './userslist';
import userInfo from './userinfo';
import './main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/


document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search');
  const searchResults = document.querySelector('.search-results');

  searchButton.addEventListener('click', usersList);
  searchResults.addEventListener('click', userInfo);
});
