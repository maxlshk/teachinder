import { StoredUser } from '../typings/FormattedUser';

const operatorMap: {
	[key: string]: (a: number, b: number) => boolean;
} = {
	'>': (a, b) => a > b,
	'<': (a, b) => a < b,
	'>=': (a, b) => a >= b,
	'<=': (a, b) => a <= b,
	'=': (a, b) => a === b,
};

export function findUsers(users: StoredUser[], searchValue: string): StoredUser[] {
	const compareNumbers = (userAge: number, searchString: string): boolean => {
		const match = searchString.match(/([><=]=?|)(\d+)/);

		if (match) {
			const operator = match[1] || '=';
			const searchNumber = parseInt(match[2], 10);

			if (!isNaN(searchNumber)) {
				return operatorMap[operator](userAge, searchNumber);
			}
		}
		return false;
	};

	// Convert search value to lowercase for case-insensitive string matching
	const searchLower = searchValue.toLocaleLowerCase();

	return users.filter((user) => {
		// Check age field
		if (typeof user.age === 'number' && compareNumbers(user.age, searchValue)) {
			return true;
		}

		// Check full_name and note fields for inclusion of search string
		if (typeof user.full_name === 'string' && user.full_name.toLocaleLowerCase().includes(searchLower)) {
			return true;
		}

		if (typeof user.note === 'string' && user.note.toLocaleLowerCase().includes(searchLower)) {
			return true;
		}

		return false;
	});
}
