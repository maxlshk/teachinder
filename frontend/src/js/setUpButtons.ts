import { setInfoPopupContent } from './setInfoPopupContent';
import { FormattedUser, UserResponse } from './typings/FormattedUser';

export function setUpButtons(users: UserResponse[]): void {
	const addTeacherBtns = document.querySelectorAll(
		'.btn[data-target="add-teacher-popup"]',
	) as NodeListOf<HTMLButtonElement>;
	const teacherCards = document.querySelectorAll('.teacher-card');
	const closeAddTeacherPopupBtn = document.getElementById('close-add-teacher-button') as HTMLButtonElement;
	const addTeacherPopup = document.getElementById('add-teacher-popup') as HTMLDialogElement;
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;
	const confirmAddBtn = document.getElementById('add-teacher-button') as HTMLButtonElement;

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

	teacherCards.forEach((card) => {
		card.addEventListener('click', () =>
			showTeacherInfoPopup(card.id.startsWith('favorite-') ? card.id.slice(9) : card.id),
		);
	});

	closeAddTeacherPopupBtn.addEventListener('click', hideAddTeacherPopup);

	confirmAddBtn.addEventListener('click', () => {
		hideAddTeacherPopup();
	});
}
