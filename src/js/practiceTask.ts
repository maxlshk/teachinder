import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock';
import { processUsers } from './task1';
import { isValidUser } from './task2';
import { FormattedUser } from './typings/FormattedUser';
import { RandomUser } from './typings/RandomUser';
import { writeToFile } from './writeToFile';

const formattedUsers = processUsers(randomUserMock as RandomUser[], additionalUsers as Partial<FormattedUser>[]);
writeToFile('formatted_users.json', formattedUsers);
const validUsers = formattedUsers.filter(isValidUser);
writeToFile('valid_users.json', validUsers);
