import { StoredUser } from '../typings/FormattedUser';
import _ from 'lodash';

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

	const searchLower = _.toLower(searchValue);

	return _.filter(users, (user) => {
		if (_.isNumber(user.age) && compareNumbers(user.age, searchValue)) {
			return true;
		}

		if (_.isString(user.full_name) && _.includes(_.toLower(user.full_name), searchLower)) {
			return true;
		}

		if (_.isString(user.note) && _.includes(_.toLower(user.note), searchLower)) {
			return true;
		}

		return false;
	});
}
