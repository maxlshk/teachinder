import { FormattedUser } from './typings/FormattedUser';

export function renderUsers(users: FormattedUser[]): void {
	const container = document.getElementById('teachers-grid');
	const favoritesContainer = document.getElementById('favorites-slider-container');

	if (!container || !favoritesContainer) {
		console.error('Container not found');
		return;
	}

	container.innerHTML = '';
	favoritesContainer.innerHTML = '';

	users.forEach((user) => {
		const userElement = document.createElement('div');
		userElement.classList.add(`teacher-card`);
		userElement.id = user.id.toString();

		userElement.innerHTML = `
      	<div class="teacher-card-photo">
			${
				user.picture_large
					? `<img src="${user.picture_large}" alt="Teacher photo" />`
					: `<div><span>${user.full_name
							.split(' ')
							.map((s) => s.charAt(0))
							.join('.')}</span></div>`
			}
		</div>
      	<p class="teacher-card-full-name">${user.full_name}</p>
		<p class="teacher-card-country">${user.country}</p>
    `;

		if (user.favorite) {
			const favoritesCard = userElement.cloneNode(true) as HTMLDivElement;
			favoritesCard.id = `favorite-${user.id}`;
			favoritesContainer?.appendChild(favoritesCard);
			userElement.classList.add('favorite');
		}
		container.appendChild(userElement);
	});
}
