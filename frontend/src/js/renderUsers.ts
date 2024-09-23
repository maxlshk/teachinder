import { FormattedUser } from './typings/FormattedUser';

export function renderUsers(users: FormattedUser[]): void {
	const container = document.getElementById('teachers-grid');

	if (!container) {
		console.error('Container not found');
		return;
	}

	container.innerHTML = '';

	users.forEach((user) => {
		const userElement = document.createElement('div');
		userElement.classList.add(`teacher-card`);
		userElement.id = user.id.toString();
		user.favorite ? userElement.classList.add('favorite') : null;

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

		container.appendChild(userElement);
	});
}
