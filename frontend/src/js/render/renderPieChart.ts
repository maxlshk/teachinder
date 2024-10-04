import Chart from 'chart.js/auto';

const myChart = new Chart(document.getElementById('acquisitions') as HTMLCanvasElement, {
	type: 'pie',
	options: {
		animation: false,
	},
	data: {
		labels: undefined,
		datasets: [
			{
				label: 'Distribution',
				data: undefined,
			},
		],
	},
});

export function updateChart(newData: { [key: string]: number }): void {
	myChart.data.labels = Object.keys(newData);
	myChart.data.datasets.forEach((dataset) => {
		dataset.data = Object.values(newData);
		dataset.backgroundColor = generateRandomColors(Object.keys(newData).length);
	});
	myChart.update();
}

function getRandomLightColor(): string {
	const r = Math.floor(Math.random() * 156 + 100);
	const g = Math.floor(Math.random() * 156 + 100);
	const b = Math.floor(Math.random() * 156 + 100);
	return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(count: number): string[] {
	return Array.from({ length: count }, () => getRandomLightColor());
}
