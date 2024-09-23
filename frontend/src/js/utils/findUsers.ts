import { FormattedUser } from '../typings/FormattedUser';

const operatorMap: {
	[key: string]: (a: number, b: number) => boolean;
} = {
	'>': (a, b) => a > b,
	'<': (a, b) => a < b,
	'>=': (a, b) => a >= b,
	'<=': (a, b) => a <= b,
	'=': (a, b) => a === b,
};

export function findUsers(
	users: FormattedUser[],
	searchBy: 'full_name' | 'note' | 'age',
	searchValue: string | number,
	operator: '>' | '<' | '>=' | '<=' | '=' = '=',
): FormattedUser[] {
	const compareNumbers = operatorMap[operator];

	return users.filter((user) => {
		const userValue = user[searchBy];

		if (typeof userValue === 'string' && typeof searchValue === 'string') {
			return userValue.toLocaleLowerCase() === searchValue.toLocaleLowerCase();
		}

		if (typeof userValue === 'number' && typeof searchValue === 'number') {
			return compareNumbers(userValue, searchValue);
		}

		return false;
	});
}
