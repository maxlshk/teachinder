import { GlobalContext } from './context/context';
import { setUpSorting } from './setUpSorting';
import { UserFilters } from './typings/UserFilters';
import { filterUsers } from './utils/filterUsers';

export function setUpStatistics() {
	const statsTitle = document.getElementById('statistics-section-title');
	const chartSection = document.getElementById('chart-section');
	const tableSection = document.getElementById('table-section');

	statsTitle?.addEventListener('click', () => {
		tableSection.toggleAttribute('hidden');
		chartSection.toggleAttribute('hidden');
	});
}
