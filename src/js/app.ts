const testModules = require('./test-module');
require('../css/app.css');

document.addEventListener('DOMContentLoaded', () => {
	const addTeacherBtns = document.querySelectorAll(
		'.btn[data-target="add-teacher-popup"]',
	) as NodeListOf<HTMLButtonElement>;
	const teacherCards = document.querySelectorAll('.teacher-card');
	const closeAddTeacherPopupBtn = document.getElementById('close-add-teacher-button') as HTMLButtonElement;
	const closeTeacherInfoPopupBtn = document.getElementById('close-teacher-info-button') as HTMLButtonElement;
	const addTeacherPopup = document.getElementById('add-teacher-popup') as HTMLDialogElement;
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;
	const confirmAddBtn = document.getElementById('add-teacher-button') as HTMLButtonElement;

	function showAddTeacherPopup() {
		addTeacherPopup.showModal();
	}

	function showTeacherInfoPopup() {
		teacherInfoPopup.showModal();
	}

	function hideAddTeacherPopup() {
		addTeacherPopup.close();
	}

	function hideTeacherInfoPopup() {
		teacherInfoPopup.close();
	}

	addTeacherBtns.forEach((button) => {
		button.addEventListener('click', showAddTeacherPopup);
	});

	teacherCards.forEach((card) => {
		card.addEventListener('click', showTeacherInfoPopup);
	});

	closeAddTeacherPopupBtn.addEventListener('click', hideAddTeacherPopup);

	closeTeacherInfoPopupBtn.addEventListener('click', hideTeacherInfoPopup);

	confirmAddBtn.addEventListener('click', () => {
		hideAddTeacherPopup();
	});
});
