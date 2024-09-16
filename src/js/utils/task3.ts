import { FormattedUser } from '../typings/FormattedUser';
import { UserFilters } from '../typings/UserFilters';

export function filterUsers(users: FormattedUser[], filters: UserFilters): FormattedUser[] {
	return users.filter((user) =>
		Object.entries(filters).every(([key, value]) => {
			const userValue = user[key as keyof FormattedUser];

			if (userValue === undefined) {
				return false;
			}

			if (typeof value === 'string' && typeof userValue === 'string') {
				return userValue.toLowerCase() === value.toLowerCase();
			}

			return userValue === value;
		}),
	);
}
