import { FormattedUser } from '../typings/FormattedUser';
import { findUsers } from './task5';

export function findPercentage(
	users: FormattedUser[],
	searchBy: 'full_name' | 'note' | 'age',
	searchValue: string | number,
	options?: {
		matchType?: 'partial' | 'exact';
		operator?: '>' | '<' | '>=' | '<=' | '=';
	},
): number {
	const { matchType = 'partial', operator = '=' } = options || {};

	return (findUsers(users, searchBy, searchValue, { matchType, operator }).length / users.length) * 100;
}
