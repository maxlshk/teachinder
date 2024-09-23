import { setInfoPopupContent } from './setInfoPopupContent';
import { FormattedUser, StoredUser } from './typings/FormattedUser';

export function setUpButtons(users: StoredUser[]): void {
	const addTeacherBtns = document.querySelectorAll(
		'.btn[data-target="add-teacher-popup"]',
	) as NodeListOf<HTMLButtonElement>;
	const teachersGrid = document.getElementById('teachers-grid');
	const favoriteTeachersSlider = document.getElementById('favorites-slider-container');
	const closeAddTeacherPopupBtn = document.getElementById('close-add-teacher-button') as HTMLButtonElement;
	const addTeacherPopup = document.getElementById('add-teacher-popup') as HTMLDialogElement;
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;
	const confirmAddBtn = document.getElementById('add-teacher-button') as HTMLButtonElement;

	const leftArrow = document.getElementById('left-arrow');
	const rightArrow = document.getElementById('right-arrow');
	const scrollContainer = document.getElementById('favorites-slider-container');

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

	function showAddTeacherPopup() {
		addTeacherPopup.showModal();
	}

	function showTeacherInfoPopup(id: string) {
		console.log(id);
		const teacher = users.find((user) => user._id.toString() === id);
		console.log(teacher);
		setInfoPopupContent(teacher, teacherInfoPopup);

		teacherInfoPopup.showModal();
	}

	function hideAddTeacherPopup() {
		addTeacherPopup.close();
	}

	addTeacherBtns.forEach((button) => {
		button.addEventListener('click', showAddTeacherPopup);
	});

	teachersGrid.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;

		const teacherCard = target.closest('.teacher-card');

		if (teacherCard) {
			const id = teacherCard.id;
			showTeacherInfoPopup(id);
		}
	});

	favoriteTeachersSlider.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;

		const teacherCard = target.closest('.teacher-card');

		if (teacherCard) {
			const id = teacherCard.id.slice(9);
			showTeacherInfoPopup(id);
		}
	});

	closeAddTeacherPopupBtn.addEventListener('click', hideAddTeacherPopup);

	confirmAddBtn.addEventListener('click', () => {
		hideAddTeacherPopup();
	});
}
