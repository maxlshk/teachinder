import { FormattedUser } from '../typings/FormattedUser';

export interface UserFilters extends Partial<Pick<FormattedUser, 'country' | 'gender' | 'favorite'>> {
	age?: number | { min?: number; max?: number };
}

export interface SortingUserFilters extends Pick<FormattedUser, 'full_name' | 'age' | 'b_day' | 'country'> {}
