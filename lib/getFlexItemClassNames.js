'use strict';

var SIZE = [
	'auto',
	'none',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve'
];

var ORDER = [
	'self-one',
	'self-two',
	'self-three',
	'self-four',
	'self-five',
	'self-six',
	'self-seven',
	'self-eight',
	'self-nine',
	'self-ten',
	'self-eleven',
	'self-twelve'
];

var names = SIZE.concat(ORDER);

function getFlexItemClassNames(props) {
	if (!props.flex) return '';

	var classList = ['flex'];
	Object.keys(props).forEach((key) => {
		if (names.indexOf(key) !== -1) {
			classList.push(key);
		}
	});
	return classList.join(' ');
}

module.exports = getFlexItemClassNames;