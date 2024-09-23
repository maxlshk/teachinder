export function horizontalScroll() {
	const leftArrow = document.getElementById('left-arrow');
	const rightArrow = document.getElementById('right-arrow');
	const scrollContainer = document.getElementById('favorites-slider-container');

	if (!leftArrow || !rightArrow) {
		console.error('Arrows not found');
		return;
	}

	leftArrow.addEventListener('click', () => {
		scrollContainer.scrollBy({
			left: -210,
			behavior: 'smooth',
		});
	});

	rightArrow.addEventListener('click', () => {
		scrollContainer.scrollBy({
			left: 210,
			behavior: 'smooth',
		});
	});
}
