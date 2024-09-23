import { renderUsers } from './renderUsers';
import { FormattedUser } from './typings/FormattedUser';
import { UserFilters } from './typings/UserFilters';

export function setUpFilters(
	users: FormattedUser[],
	applyFilters: (users: FormattedUser[], filters: UserFilters) => FormattedUser[],
) {
	const filtersForm = document.getElementById('filters-form'); // Common parent of all filters

	function getCurrentFilters(): UserFilters {
		const ageFilter = document.getElementById('age-filter') as HTMLSelectElement;
		const regionFilter = document.getElementById('region-filter') as HTMLSelectElement;
		const sexFilter = document.getElementById('gender-filter') as HTMLSelectElement;
		const withPhotoOnly = document.getElementById('with-photo-only') as HTMLInputElement;
		const favoritesOnly = document.getElementById('favorites-only') as HTMLInputElement;

		const [min, max] = ageFilter.value.split('-').map(Number);

		return {
			age: { min, max },
			country: regionFilter.value.length > 0 ? regionFilter.value : undefined,
			gender: sexFilter.value === 'Male' || sexFilter.value === 'Female' ? sexFilter.value : undefined,
			picture_large: withPhotoOnly.checked ? true : undefined,
			favorite: favoritesOnly.checked ? true : undefined,
		};
	}

	if (filtersForm) {
		filtersForm.addEventListener('input', (event) => {
			const target = event.target as HTMLInputElement | HTMLSelectElement;

			if (target) {
				const filters = getCurrentFilters();
				console.log(filters);
				renderUsers(applyFilters(users, filters));
			}
		});
	}
}
