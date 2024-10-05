import { GlobalContext } from './context/context';
import { updateChart } from './render/renderPieChart';

export function setUpChart() {
	const selectChartData = document.getElementById('chart-data') as HTMLSelectElement;

	selectChartData.addEventListener('change', () => {
		getDataForChart();
	});

	getDataForChart();
}

export function getDataForChart(): void {
	const selectChartData = document.getElementById('chart-data') as HTMLSelectElement;
	const selectedKey = selectChartData.value;

	const userData = GlobalContext.displayedUsers;
	const result: { [key: string]: number } = {};

	userData.forEach((user) => {
		const keyValue = user[selectedKey];
		if (keyValue) {
			if (result[keyValue]) {
				result[keyValue]++;
			} else {
				result[keyValue] = 1;
			}
		}
	});

	updateChart(result);
}
