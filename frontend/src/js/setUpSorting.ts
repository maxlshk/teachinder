import { renderTable } from './renderTable';
import { StoredUser } from './typings/FormattedUser';
import { SortingUserFilters } from './typings/UserFilters';

export function setUpSorting(
	users: StoredUser[],
	sort: (users: StoredUser[], sortBy: keyof SortingUserFilters, order: 'asc' | 'desc') => StoredUser[],
) {
	const tableHead = document.getElementById('statistics-table-head'); // Thead containing the th elements
	let currentSortField: keyof SortingUserFilters | null = null;
	let currentSortOrder: 'asc' | 'desc' = 'asc';

	// Event listener for sorting
	tableHead?.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;
		const thElement = target.closest('th');
		const allThElements = tableHead.querySelectorAll('th');
		allThElements.forEach((th) => {
			th === thElement ? th.classList.toggle('up') : th.classList.remove('up');
		});

		// If no <th> was clicked, return
		if (!thElement || !thElement.dataset.value) return;

		// Get the field to sort by
		const sortBy = thElement.dataset.value as keyof SortingUserFilters;

		// Toggle the sort order if the same column is clicked, otherwise default to ascending
		if (currentSortField === sortBy) {
			currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			currentSortOrder = 'asc'; // Reset to ascending when a new column is clicked
		}
		currentSortField = sortBy;

		// Sort the users based on the field and order
		const sortedUsers = sort(users, sortBy, currentSortOrder);

		// Re-render the table with the sorted users
		renderTable(sortedUsers);
	});
}
