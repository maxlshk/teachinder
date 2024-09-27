import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { handleAddUsersPopup } from './handlers/handleAddUsersPopup';
import { handleUserInfoPopup } from './handlers/handleUserInfoPopup';
import { renderTable } from './render/renderTable';
import { renderUsers } from './render/renderUsers';
import { setUpFilters } from './setUpFilters';
import { setUpHorizontalScroll } from './setUpHorizontalScroll';
import { setUpSearch } from './setUpSearch';
import { setUpSorting } from './setUpSorting';
import { FormattedUser, StoredUser } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { filterUsers } from './utils/filterUsers';
import { findUsers } from './utils/findUsers';
import { processUsers } from './utils/formatUsers';
import { sortUsers } from './utils/sortUsers';
import { isValidUser } from './utils/validateUsers';
require('../css/app.css');

document.addEventListener('DOMContentLoaded', async () => {
	let users = await fetchOrGenerateUsers();

	initializeUI(users);
});

async function fetchUsers(): Promise<StoredUser[]> {
	try {
		const response = await fetch(`https://randomuser.me/api?results=50`);
		if (response.ok) {
			const data = await response.json();
			console.log('Users fetched successfully', data);
			const results = data.results;
			const formattedUsers = processUsers(results as RandomUser[]);
			const validUsers = formattedUsers.filter(isValidUser);
			return validUsers;
		} else {
			console.error('Error fetching users:', response.statusText);
			return [];
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
}

// async function fillDatabaseWithUsers(): Promise<StoredUser[]> {
// 	const formattedUsers = processUsers(randomUserMock as RandomUser[], additionalUsers as Partial<FormattedUser>[]);
// 	const validUsers = formattedUsers.filter(isValidUser);

// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ users: validUsers }),
// 	};

// 	try {
// 		const response = await fetch(`http://localhost:3030/api/user/fill`, requestOptions);
// 		if (response.ok) {
// 			console.log('Users sent successfully');
// 			return await fetchUsers();
// 		} else {
// 			console.error('Failed to send users');
// 			return [];
// 		}
// 	} catch (error) {
// 		console.error('Error sending users to backend:', error);
// 		return [];
// 	}
// }

async function fetchOrGenerateUsers(): Promise<StoredUser[]> {
	let users = await fetchUsers();

	// if (users.length === 0) {
	// 	console.log('No users found, generating new ones');
	// 	users = await fillDatabaseWithUsers();
	// }

	return users;
}

function initializeUI(users: StoredUser[]) {
	renderUsers(users);
	renderTable(users);
	setUpHorizontalScroll();
	handleUserInfoPopup(users);
	handleAddUsersPopup(users);
	setUpFilters(users, filterUsers);
	setUpSorting(users, sortUsers);
	setUpSearch(users, findUsers);
}
