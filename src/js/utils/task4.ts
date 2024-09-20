import { FormattedUser } from '../typings/FormattedUser';
import { SortingUserFilters } from '../typings/UserFilters';

export function sortUsers(
	users: FormattedUser[],
	sortBy: keyof SortingUserFilters,
	order: 'asc' | 'desc' = 'asc',
): FormattedUser[] {
	const usersCopy = [...users];

	usersCopy.sort((a, b) => {
		let valueA = a[sortBy];
		let valueB = b[sortBy];

		if (valueA === undefined || valueB === undefined) {
			return 0;
		}

		if (sortBy === 'b_day') {
			valueA = new Date(valueA).getTime();
			valueB = new Date(valueB).getTime();
		}

		if (typeof valueA === 'number' && typeof valueB === 'number') {
			return order === 'asc' ? valueA - valueB : valueB - valueA;
		}

		if (typeof valueA === 'string' && typeof valueB === 'string') {
			const comparison = valueA.localeCompare(valueB);
			return order === 'asc' ? comparison : -comparison;
		}

		return 0;
	});

	return usersCopy;
}
