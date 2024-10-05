import { StoredUser } from '../typings/FormattedUser';
import { SortingUserFilters } from '../typings/UserFilters';
import _ from 'lodash';

export function sortUsers(
	users: StoredUser[],
	sortBy: keyof SortingUserFilters,
	order: 'asc' | 'desc' = 'asc',
): StoredUser[] {
	return _.orderBy(users, [sortBy], [order]);
}
