const testModules = require('./test-module');
import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { renderUsers } from './renderUsers';
import { setUpButtons } from './setUpButtons';
import { FormattedUser } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { processUsers } from './utils/task1';
import { isValidUser } from './utils/task2';
require('../css/app.css');

document.addEventListener('DOMContentLoaded', () => {
	const formattedUsers = processUsers(randomUserMock as RandomUser[], additionalUsers as Partial<FormattedUser>[]);

	const validUsers = formattedUsers.filter(isValidUser);

	renderUsers(validUsers);

	setUpButtons(validUsers);
});
