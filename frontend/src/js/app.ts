import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { horizontalScroll } from './horizontalScroll';
import { renderUsers } from './renderUsers';
import { setUpButtons } from './setUpButtons';
import { FormattedUser, UserResponse } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { processUsers } from './utils/task1';
import { isValidUser } from './utils/task2';
require('../css/app.css');

document.addEventListener('DOMContentLoaded', async () => {
	let users: UserResponse[] = [];

	// Fetch existing users from the backend
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

	// If no users exist, generate and send users to the backend
	// if (users.length === 0) {
	// 	console.log('No users found, generating new ones');
	// 	const formattedUsers = processUsers(
	// 		randomUserMock as RandomUser[],
	// 		additionalUsers as Partial<FormattedUser>[],
	// 	);

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
	// 			users = validUsers; // Set users to the newly created ones
	// 		} else {
	// 			console.error('Failed to send users');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error sending users to backend:', error);
	// 	}
	// }

	// Render users on the page
	renderUsers(users);

	// Set up buttons after users are rendered
	setUpButtons(users);
	horizontalScroll();
});
