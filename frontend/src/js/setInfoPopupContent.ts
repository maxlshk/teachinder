import { UserResponse } from './typings/FormattedUser';

export function setInfoPopupContent(user: UserResponse, teacherInfoPopup: HTMLDialogElement): void {
	const container = document.getElementById('info-popup-body');
	const closeTeacherInfoPopupBtn = document.getElementById('close-teacher-info-button') as HTMLButtonElement;

	function hideTeacherInfoPopup() {
		const userCard = document.getElementById(user._id.toString());
		const favoritesContainer = document.getElementById('favorites-slider-container');
		if (!favoritesContainer) {
			console.error('Favorites container not found');
			return;
		}
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user._id, favorite: user.favorite }),
		};

		fetch('http://localhost:3030/api/user/favorite', requestOptions).then((response) => {
			if (response.ok) {
				const userCardFavorite = document.getElementById(`favorite-${user._id}`);
				if (favoritesContainer.contains(userCardFavorite)) {
					favoritesContainer.removeChild(userCardFavorite);
				} else {
					const favoriteCard = userCard?.cloneNode(true) as HTMLDivElement;
					favoriteCard.id = `favorite-${user._id}`;
					favoritesContainer.appendChild(favoriteCard);
				}

				userCard?.classList.toggle('favorite');
			} else {
				console.error('Failed to update user favorite status');
			}
		});

		closeTeacherInfoPopupBtn.removeEventListener('click', hideTeacherInfoPopup);
		teacherInfoPopup.close();
	}

	closeTeacherInfoPopupBtn.addEventListener('click', hideTeacherInfoPopup);

	if (!container) {
		console.error('Container not found');
		return;
	}

	container.innerHTML = '';

	const contactInfo = document.createElement('div');
	contactInfo.classList.add('teacher-info-contact-details');
	contactInfo.innerHTML = `
		<img src="${user.picture_large}" alt="Teacher photo" />
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
		</article>
	`;

	const note = document.createElement('p');
	note.innerText = user.note;

	const mapLink = document.createElement('a');
	mapLink.classList.add('teacher-info-toggle-map');
	mapLink.href = `https://www.google.com/maps/search/?api=1&query=${user.coordinates.latitude},${user.coordinates.longitude}`;
	mapLink.innerText = 'Toggle map';

	container.appendChild(contactInfo);
	container.appendChild(note);
	container.appendChild(mapLink);

	const favoriteButton = document.getElementById('favorite-button') as HTMLImageElement;
	console.log(favoriteButton);
	favoriteButton?.addEventListener('click', () => {
		user.favorite = !user.favorite;

		if (user.favorite) {
			favoriteButton.src = './images/star.png';
			favoriteButton.alt = 'Favorite';
		} else {
			favoriteButton.src = './images/star_outline.png';
			favoriteButton.alt = 'Not Favorite';
		}
	});
}
