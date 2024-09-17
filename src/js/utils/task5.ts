import { FormattedUser } from '../typings/FormattedUser';

export function findUsers(
	users: FormattedUser[],
	searchBy: 'full_name' | 'note' | 'age',
	searchValue: string | number,
	options?: {
		matchType?: 'partial' | 'exact';
		operator?: '>' | '<' | '>=' | '<=' | '=';
	},
): FormattedUser[] {
	const { matchType = 'partial', operator = '=' } = options || {};

	const operatorMap: {
		[key: string]: (a: number, b: number) => boolean;
	} = {
		'>': (a, b) => a > b,
		'<': (a, b) => a < b,
		'>=': (a, b) => a >= b,
		'<=': (a, b) => a <= b,
		'=': (a, b) => a === b,
	};

	const compareNumbers = operatorMap[operator] || operatorMap['='];

	return users.filter((user) => {
		const userValue = user[searchBy];

		if (userValue === undefined) {
			return false;
		}

		if (typeof userValue === 'string' && typeof searchValue === 'string') {
			if (matchType === 'partial') {
				return userValue.toLowerCase().includes(searchValue.toLowerCase());
			} else {
				return userValue.toLowerCase() === searchValue.toLowerCase();
			}
		}

		if (typeof userValue === 'number' && typeof searchValue === 'number') {
			return compareNumbers(userValue, searchValue);
		}

		return false;
	});
}
