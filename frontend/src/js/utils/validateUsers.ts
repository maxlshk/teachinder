import { StoredUser } from '../typings/FormattedUser';
// import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import validator from 'validator';
import countries from 'i18n-iso-countries';
import _ from 'lodash';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function isValidUser(user: StoredUser): boolean {
	const stringFields = ['full_name', 'gender', 'note', 'state', 'city', 'country'] as const;

	const hasInvalidStringField = _.some(stringFields, (field) => {
		const value = user[field];
		return !_.isString(value) || _.isEmpty(value) || !_.isEqual(_.capitalize(value.charAt(0)), value.charAt(0));
	});

	if (hasInvalidStringField) {
		console.log(`Invalid string field value in: ${stringFields}`);
		return false;
	}

	if (!_.isNumber(user.age) || _.isNaN(user.age)) {
		console.log(`Invalid value for field "age": ${user.age}`);
		return false;
	}

	if (!_.isString(user.email) || !validator.isEmail(user.email)) {
		console.log(`Invalid value for field "email": ${user.email}`);
		return false;
	}

	if (!_.isString(user.phone) || !_.isString(user.country) || _.isEmpty(user.phone) || _.isEmpty(user.country)) {
		console.log(`Invalid value for field "phone" or "country": ${user.phone}, ${user.country}`);
		return false;
	}

	const countryCode = countries.getAlpha2Code(_.trim(user.country), 'en');
	if (!countryCode) {
		console.warn(`Country "${user.country}" not recognized for phone validation.`);
		return false;
	}

	// const phoneNumber = parsePhoneNumberFromString(user.phone, countryCode as CountryCode);
	// if (!phoneNumber || !phoneNumber.isValid()) {
	// 	console.log(`Invalid phone number: ${user.phone}`);
	// 	return false;
	// }

	return true;
}
