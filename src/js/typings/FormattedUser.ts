export interface FormattedUser {
	id: string;
	favorite: boolean;
	course: string;
	bg_color: string;
	note: string;
	gender: 'male' | 'female';
	title: string | undefined;
	full_name: string | undefined;
	city: string | undefined;
	state: string | undefined;
	country: string | undefined;
	postcode: string | undefined;
	coordinates: { latitude: string; longitude: string } | undefined;
	timezone: { offset: string; description: string } | undefined;
	email: string | undefined;
	b_day: string | undefined;
	age: number | undefined;
	phone: string | undefined;
	picture_large: string | undefined;
	picture_thumbnail: string | undefined;
}
