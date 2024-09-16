import { FormattedUser } from '../typings/FormattedUser';

export interface UserFilters extends Partial<Pick<FormattedUser, 'country' | 'age' | 'gender' | 'favorite'>> {}

export interface SortingUserFilters extends Pick<FormattedUser, 'full_name' | 'age' | 'b_day' | 'country'> {}
