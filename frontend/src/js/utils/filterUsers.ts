import { StoredUser } from '../typings/FormattedUser';
import { UserFilters } from '../typings/UserFilters';
import _ from 'lodash';

export function filterUsers(users: StoredUser[], filters: UserFilters): StoredUser[] {
	return users.filter((user) =>
		_.every(filters, (value, key) => {
			const userValue = _.get(user, key);

			if (_.isUndefined(value)) {
				return true;
			}

			if (key === 'age') {
				if (_.isNumber(value)) {
					return userValue === value;
				} else if (_.isObject(value) && value !== null) {
					const { min, max } = value as { min?: number; max?: number };
					if (!_.isUndefined(min) && !_.isUndefined(max)) {
						return userValue >= min && userValue <= max;
					} else if (!_.isUndefined(min)) {
						return userValue >= min;
					} else if (!_.isUndefined(max)) {
						return userValue <= max;
					}
				}
			}

			if (_.isString(value) && _.isString(userValue)) {
				return _.toLower(userValue) === _.toLower(value);
			}

			if (_.isBoolean(value)) {
				return !!userValue === value;
			}

			return _.isEqual(userValue, value);
		}),
	);
}
