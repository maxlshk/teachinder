import { GlobalContext } from './context/context';
import { findUsers } from './utils/findUsers';

export function setUpSearch() {
	const searchInput = document.getElementById('search-field') as HTMLInputElement;
	const searchButton = document.getElementById('search-button');

	searchButton?.addEventListener('click', (event) => {
		const searchValue = searchInput.value;
		const searchResults = findUsers(GlobalContext.users, searchValue);
		GlobalContext.displayedUsers = searchResults;
	});
}
