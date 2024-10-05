import { GlobalContext } from './context/context';
import { findUsers } from './utils/findUsers';

export function setUpSearch() {
	const searchButton = document.getElementById('search-button');

	searchButton?.addEventListener('click', GlobalContext.applyRestrictions);
}

export function applySearch() {
	const searchInput = document.getElementById('search-field') as HTMLInputElement;

	const searchValue = searchInput.value;
	const searchResults = findUsers(GlobalContext.displayedUsers, searchValue);
	GlobalContext.displayedUsers = searchResults;
}
