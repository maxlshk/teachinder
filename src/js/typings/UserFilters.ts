import { FormattedUser } from '../typings/FormattedUser';

export interface UserFilters extends Partial<Pick<FormattedUser, 'country' | 'age' | 'gender' | 'favorite'>> {}
