import { GlobalContext } from '../context/context';
import { StoredUser } from '../typings/FormattedUser';

let skip = 0;
let limit = 50;

export async function fetchUsersFromDatabase(): Promise<StoredUser[]> {
	try {
		console.log('Fetching users from database: ', skip, limit);
		const response = await fetch(`http://localhost:3030/api/user/all?limit=${limit}&skip=${skip}`);
		if (response.ok) {
			const newUsers = await response.json();
			console.log('Users fetched successfully', newUsers);
			if (newUsers.length > 0) {
				skip += newUsers.length;
				limit = 10;
				GlobalContext.users = GlobalContext.users.concat(newUsers);
			}
			return newUsers;
		} else {
			console.error('Error fetching users:', response.statusText);
			return [];
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
}
