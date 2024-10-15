import { GlobalContext } from '../context/context';
import { StoredUser } from '../typings/FormattedUser';
import dayjs from 'dayjs';
import * as L from 'leaflet';

export function setInfoPopupContent(user: StoredUser): void {
	const currentFavoriteStatus = user.favorite;
	const container = document.getElementById('info-popup-body');
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;
	const closeTeacherInfoPopupBtn = document.getElementById('close-teacher-info-button') as HTMLButtonElement;

	function hideTeacherInfoPopup() {
		if (user.favorite !== currentFavoriteStatus) {
			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user._id, favorite: user.favorite }),
			};
			fetch('http://localhost:3030/api/user/favorite', requestOptions).then((response) => {
				if (response.ok) {
					console.log('User favorite status updated');
				} else {
					console.error('Failed to update user favorite status' + response);
				}
			});
		}
		closeTeacherInfoPopupBtn.removeEventListener('click', hideTeacherInfoPopup);
		teacherInfoPopup.close();
	}

	closeTeacherInfoPopupBtn.addEventListener('click', hideTeacherInfoPopup);

	if (!container) {
		console.error('Container not found');
		return;
	}

	container.innerHTML = '';

	const { birthDate, daysUntilBirthday } = calculateBirthday(user);
	const note = createNote(user);
	const { mapElement, mapLink } = createMap();

	const contactInfo = document.createElement('div');
	contactInfo.classList.add('teacher-info-contact-details');
	contactInfo.innerHTML = `
		<img src="${user.picture_large ?? './images/patrick.png'}" alt="Teacher photo" />
		<article>
			<div class="headline">
				<h2>${user.full_name}</h2>
				<img src="${
					user.favorite ? './images/star.png' : './images/star_outline.png'
				}" alt="Favorite" class="favorite-icon" id="favorite-button"/>
			</div>
			<h4>${user.course}</h4>
			<p>${user.city}, ${user.country}</p>
			<p>${user.age}, ${user.gender}</p>
			<a href="mailto:${user.email}">${user.email}</a>
			<p>${user.phone}</p>
			<p>${birthDate.format('MMMM D, YYYY')}</p>
			<p><b>Days until next birthday:</b> ${daysUntilBirthday}</p>
		</article>
	`;

	container.appendChild(contactInfo);
	container.appendChild(note);
	container.appendChild(mapLink);
	container.appendChild(mapElement);

	setTimeout(() => {
		const coords = [user.coordinates?.latitude ?? 50.4645, user.coordinates?.longitude ?? 30.519394197007927];
		var map = L.map('map').setView(coords, 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
		L.marker(coords).addTo(map);
	}, 0);

	const favoriteButton = document.getElementById('favorite-button') as HTMLImageElement;
	favoriteButton?.addEventListener('click', () => handleAdditionToFavorite(user, favoriteButton));
}

function handleAdditionToFavorite(user: StoredUser, favoriteButton: HTMLImageElement): void {
	user.favorite = !user.favorite;
	const favoritesContainer = document.getElementById('favorites-slider-container');
	const userCardFavorite = document.getElementById(`favorite-${user._id}`);
	const userCard = document.getElementById(user._id.toString());

	if (user.favorite) {
		favoriteButton.src = './images/star.png';
		favoriteButton.alt = 'Favorite';
		const favoriteCard = userCard?.cloneNode(true) as HTMLDivElement;
		favoriteCard.id = `favorite-${user._id}`;
		favoritesContainer.appendChild(favoriteCard);
	} else {
		favoriteButton.src = './images/star_outline.png';
		favoriteButton.alt = 'Not Favorite';
		favoritesContainer.removeChild(userCardFavorite);
	}
	userCard?.classList.toggle('favorite');
}

export function handleUserInfoPopup(): void {
	const teachersGrid = document.getElementById('teachers-grid');
	const favoriteTeachersSlider = document.getElementById('favorites-slider-container');

	teachersGrid.addEventListener('click', handlePopupOpen);
	favoriteTeachersSlider.addEventListener('click', handlePopupOpen);
}

function showTeacherInfoPopup(id: string) {
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;

	const teacher = GlobalContext.users.find((user) => user._id.toString() === id);
	setInfoPopupContent(teacher);

	teacherInfoPopup.showModal();
}

function handlePopupOpen(event: Event) {
	const target = event.target as HTMLElement;

	const teacherCard = target.closest('.teacher-card');

	if (teacherCard) {
		const id = teacherCard.id.includes('favorite') ? teacherCard.id.slice(9) : teacherCard.id;
		showTeacherInfoPopup(id);
	}
}

function calculateBirthday(user: StoredUser): { birthDate: dayjs.Dayjs; daysUntilBirthday: number } {
	const today = dayjs();
	const birthDate = dayjs(user.b_day);
	let nextBirthday = birthDate.year(today.year());

	if (nextBirthday.isBefore(today, 'day')) {
		nextBirthday = nextBirthday.add(1, 'year');
	}
	const daysUntilBirthday = nextBirthday.diff(today, 'day');

	return { birthDate, daysUntilBirthday };
}

function createNote(user: StoredUser): HTMLParagraphElement {
	const note = document.createElement('p');
	note.innerText = user.note ?? 'Note not provided';
	return note;
}

function createMap(): { mapElement: HTMLDivElement; mapLink: HTMLAnchorElement } {
	const mapLink = document.createElement('a');
	mapLink.classList.add('teacher-info-toggle-map');
	mapLink.innerText = 'Toggle map';
	const mapElement = document.createElement('div');
	mapElement.id = 'map';
	mapElement.classList.add('hidden');

	mapLink.addEventListener('click', toggleMap);

	return { mapElement, mapLink };
}

function toggleMap() {
	const map = document.getElementById('map') as HTMLDivElement;

	map.classList.toggle('hidden');
}
