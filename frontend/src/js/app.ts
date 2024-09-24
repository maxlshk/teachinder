import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { renderTable } from './renderTable';
import { renderUsers } from './renderUsers';
import { setUpButtons } from './setUpButtons';
import { setUpFilters } from './setUpFilters';
import { setUpSorting } from './setUpSorting';
import { FormattedUser, StoredUser } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { filterUsers } from './utils/filterUsers';
import { processUsers } from './utils/formatUsers';
import { sortUsers } from './utils/sortUsers';
import { isValidUser } from './utils/validateUsers';
require('../css/app.css');

document.addEventListener('DOMContentLoaded', async () => {
	let users: StoredUser[] = [];

	try {
		const response = await fetch(`http://localhost:3030/api/user/all`);
		if (response.ok) {
			const data = await response.json();
			console.log('Users fetched successfully', data);
			users = data;
		}
	} catch (error) {
		console.error('Error fetching users:', error);
	}

	if (users.length === 0) {
		console.log('No users found, generating new ones');
		const formattedUsers = processUsers(
			randomUserMock as RandomUser[],
			additionalUsers as Partial<FormattedUser>[],
		);

		const validUsers = formattedUsers.filter(isValidUser);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ users: validUsers }),
		};

		try {
			const response = await fetch(`http://localhost:3030/api/user/fill`, requestOptions);
			if (response.ok) {
				console.log('Users sent successfully');
				const response = await fetch(`http://localhost:3030/api/user/all`);
				if (response.ok) {
					const data = await response.json();
					console.log('Users fetched successfully', data);
					users = data;
				}
			} else {
				console.error('Failed to send users');
			}
		} catch (error) {
			console.error('Error sending users to backend:', error);
		}
	}

	// const formattedUsers = processUsers(randomUserMock as RandomUser[], additionalUsers as Partial<FormattedUser>[]);
	// const validUsers = formattedUsers.filter(isValidUser);
	// users = validUsers;

	renderUsers(users);

	renderTable(users);

	setUpButtons(users);

	setUpFilters(users, filterUsers);

	setUpSorting(users, sortUsers);
});
