import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { processUsers } from './utils/formatUsers';
import { isValidUser } from './utils/validateUsers';
import { FormattedUser } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { writeToFile } from './utils/writeToFile';
import { filterUsers } from './utils/filterUsers';
import { sortUsers } from './utils/sortUsers';
import { findUsers } from './utils/findUsers';
import { findPercentage } from './utils/findPercentage';

const filters = {
	country: 'Finland',
	age: { min: 20, max: 30 },
	favorite: false,
};

// const formattedUsers = processUsers(randomUserMock as RandomUser[], additionalUsers as Partial<FormattedUser>[]);
// writeToFile('formatted_users.json', formattedUsers);

// const validUsers = formattedUsers.filter(isValidUser);
// writeToFile('valid_users.json', validUsers);

// const filteredUsers = filterUsers(validUsers, filters);
// writeToFile('filtered_users.json', filteredUsers);

// const sortedUsers = sortUsers(validUsers, 'age', 'asc');
// writeToFile('sorted_users.json', sortedUsers);

// const foundUsers = findUsers(validUsers, 'age', 30, '<=');
// writeToFile('found_users.json', foundUsers);

// const percentage = findPercentage(validUsers, 'age', 30, '<=');
// writeToFile('percentage.json', percentage);
