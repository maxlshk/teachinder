import { renderTable } from '../render/renderTable';
import { renderUsers } from '../render/renderUsers';
import { applyFilters } from '../setUpFilters';
import { applySearch } from '../setUpSearch';
import { StoredUser } from '../typings/FormattedUser';

export const GlobalContext = (() => {
	let _users: StoredUser[] = [];
	let _displayedUsers: StoredUser[] = [];

	return {
		get users() {
			return _users;
		},
		set users(value: StoredUser[]) {
			console.log('Users array changed!');
			_users = value;
			GlobalContext.displayedUsers = value;
		},

		get displayedUsers() {
			return _displayedUsers;
		},
		set displayedUsers(value: StoredUser[]) {
			_displayedUsers = value;
			console.log('Displayed users array changed!');
			renderUsers(GlobalContext.displayedUsers);
			renderTable(GlobalContext.displayedUsers);
		},

		applyRestrictions() {
			applyFilters();
			applySearch();
		},
	};
})();
