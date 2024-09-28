import { fetchOrGenerateUsers } from './connection/fetchOrGenerateUsers';
import { handleAddUsersPopup } from './handlers/handleAddUsersPopup';
import { handleLoadingMoreUsers } from './handlers/handleLoadingMoreUsers';
import { handleUserInfoPopup } from './handlers/handleUserInfoPopup';
import { setUpFilters } from './setUpFilters';
import { setUpHorizontalScroll } from './setUpHorizontalScroll';
import { setUpSearch } from './setUpSearch';
import { setUpSorting } from './setUpSorting';
require('../css/app.css');

document.addEventListener('DOMContentLoaded', async () => {
	await fetchOrGenerateUsers(50);

	initializeUI();
});

export function initializeUI(): void {
	setUpHorizontalScroll();
	handleUserInfoPopup();
	handleAddUsersPopup();
	handleLoadingMoreUsers();
	setUpFilters();
	setUpSorting();
	setUpSearch();
}
