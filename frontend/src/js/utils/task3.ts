import { FormattedUser } from '../typings/FormattedUser';
import { UserFilters } from '../typings/UserFilters';

export function filterUsers(users: FormattedUser[], filters: UserFilters): FormattedUser[] {
	return users.filter((user) =>
		Object.entries(filters).every(([key, value]) => {
			const userValue = user[key];

			if (key === 'age') {
				if (typeof value === 'number') {
					return userValue === value;
				} else if (typeof value === 'object' && value !== null) {
					const { min, max } = value as { min?: number; max?: number };

					if (min !== undefined && max !== undefined) {
						return userValue >= min && userValue <= max;
					} else if (min !== undefined) {
						return userValue >= min;
					} else if (max !== undefined) {
						return userValue <= max;
					}
				}
			}

			if (typeof value === 'string' && typeof userValue === 'string') {
				return userValue.toLocaleLowerCase() === value.toLocaleLowerCase();
			}

			return userValue === value;
		}),
	);
}
