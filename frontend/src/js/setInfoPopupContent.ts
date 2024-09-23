import { FormattedUser } from './typings/FormattedUser';

export function setInfoPopupContent(user: FormattedUser): void {
	const container = document.getElementById('info-popup-body');

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
		console.log(`Toggling favorite status for ${user.full_name}`);
		user.favorite = !user.favorite;

		// Update the icon dynamically
		if (user.favorite) {
			favoriteButton.src = './images/star.png';
			favoriteButton.alt = 'Favorite';
		} else {
			favoriteButton.src = './images/star_outline.png';
			favoriteButton.alt = 'Not Favorite';
		}

		console.log(`${user.full_name} is now ${user.favorite ? 'a favorite' : 'not a favorite'}`);
	});
}
