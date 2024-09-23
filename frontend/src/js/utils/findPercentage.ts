import { FormattedUser } from '../typings/FormattedUser';
import { findUsers } from './findUsers';

export function findPercentage(
	users: FormattedUser[],
	searchBy: 'full_name' | 'note' | 'age',
	searchValue: string | number,
	operator: '>' | '<' | '>=' | '<=' | '=' = '=',
): number {
	return (findUsers(users, searchBy, searchValue, operator).length / users.length) * 100;
}
