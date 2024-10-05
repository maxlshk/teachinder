import { FormattedUser, StoredUser } from '../typings/FormattedUser.js';
import { RandomUser } from '../typings/RandomUser.js';
import _ from 'lodash';

function formatRandomUsers(randomUsers: RandomUser[]): Partial<StoredUser>[] {
	return _.map(randomUsers, (user) => ({
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
	formattedRandomUsers: Partial<StoredUser>[],
	additionalUsers: Partial<StoredUser>[],
): Partial<StoredUser>[] {
	return _.uniqBy([...formattedRandomUsers, ...additionalUsers], 'email');
}

function assignAdditionalFields(users: Partial<FormattedUser>[]): StoredUser[] {
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

	return _.map(users, (user, index) => ({
		...user,
		gender: _.capitalize(user.gender),
		// _id: user.id || `user-${index + 1}`,
		favorite: _.defaultTo(user.favorite, false),
		course: user.course || courses[Math.floor(Math.random() * courses.length)],
		bg_color: _.defaultTo(user.bg_color, '#ffffff'),
		note: _.defaultTo(user.note, 'Note not provided'),
	})) as StoredUser[];
}

export function processUsers(randomUserMock: RandomUser[], additionalUsers: Partial<StoredUser>[] = []): StoredUser[] {
	try {
		const formattedRandomUsers = formatRandomUsers(randomUserMock);
		const mergedUsers = mergeUsers(formattedRandomUsers, additionalUsers);
		const finalUsers = assignAdditionalFields(mergedUsers);

		return finalUsers;
	} catch (error) {
		console.error('An error occurred:', error);
	}
	return [];
}
