import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { processUsers } from './utils/task1';
import { isValidUser } from './utils/task2';
import { FormattedUser } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { writeToFile } from './utils/writeToFile';
import { filterUsers } from './utils/task3';
import { sortUsers } from './utils/task4';
import { findUsers } from './utils/task5';
import { findPercentage } from './utils/task6';

const filters = {
	country: 'Finland',
	age: 36,
	favorite: false,
};

const formattedUsers = processUsers(randomUserMock as RandomUser[], additionalUsers as Partial<FormattedUser>[]);
// writeToFile('formatted_users.json', formattedUsers);

const validUsers = formattedUsers.filter(isValidUser);
// writeToFile('valid_users.json', validUsers);

const filteredUsers = filterUsers(validUsers, filters);
// writeToFile('filtered_users.json', filteredUsers);

const sortedUsers = sortUsers(validUsers, 'age', 'asc');
// writeToFile('sorted_users.json', sortedUsers);

const foundUsers = findUsers(validUsers, 'age', 30, { operator: '<=' });
writeToFile('found_users.json', foundUsers);

const percentage = findPercentage(validUsers, 'age', 30, { operator: '<=' });
writeToFile('percentage.json', percentage);
