import * as fs from 'fs';
import { randomUserMock, additionalUsers } from './data/FE4U-Lab2-mock.js';
import { FormattedUser } from './typings/FormattedUser.js';

function formatRandomUsers(randomUsers: any[]): Partial<FormattedUser>[] {
	return randomUsers.map((user) => ({
		gender: user.gender,
		title: user.name.title,
		full_name: `${user.name.first} ${user.name.last}`,
		city: user.location.city,
		state: user.location.state,
		country: user.location.country,
		postcode: String(user.location.postcode),
		coordinates: user.location.coordinates,
		timezone: user.location.timezone,
		email: user.email,
		b_day: user.dob.date,
		age: user.dob.age,
		phone: user.phone,
		picture_large: user.picture.large,
		picture_thumbnail: user.picture.thumbnail,
	}));
}

function mergeUsers(
	formattedRandomUsers: Partial<FormattedUser>[],
	additionalUsers: Partial<FormattedUser>[],
): Partial<FormattedUser>[] {
	const combinedUsers = [...formattedRandomUsers, ...additionalUsers];
	const uniqueUsersMap = new Map();

	for (const user of combinedUsers) {
		uniqueUsersMap.set(user.full_name, user);
	}

	return Array.from(uniqueUsersMap.values());
}

function assignAdditionalFields(users: any[]): any[] {
	const courses = [
		'Mathematics',
		'Physics',
		'English',
		'Computer Science',
		'Dancing',
		'Chess',
		'Biology',
		'Chemistry',
		'Law',
		'Art',
		'Medicine',
		'Statistics',
	];

	return users.map((user, index) => ({
		...user,
		id: user.id || `user-${index + 1}`,
		course: user.course || courses[Math.floor(Math.random() * courses.length)],
		bg_color: user.bg_color || '#ffffff',
		note: user.note || '',
	}));
}

function writeToFile(filename: string, data: any): void {
	fs.writeFileSync(`src/js/data/${filename}`, JSON.stringify(data, null, 2), 'utf8');
	console.log(`Data has been written to ${filename}`);
}

export function processUsers() {
	const formattedRandomUsers = formatRandomUsers(randomUserMock);
	const mergedUsers = mergeUsers(formattedRandomUsers, additionalUsers as Partial<FormattedUser>[]);
	const finalUsers = assignAdditionalFields(mergedUsers);

	writeToFile('formatted_users.json', finalUsers);
}

processUsers();
