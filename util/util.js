export const addChineseUnit = (number, decimalDigit) => {
	decimalDigit = decimalDigit == null ? 2 : decimalDigit;
	var integer = Math.floor(number);
	var digit = getDigit(integer);
	// ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
	var unit = [];
	if (digit > 3) {
		var multiple = Math.floor(digit / 8);
		if (multiple >= 1) {
			var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
			unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
			for (var i = 0; i < multiple; i++) {
				unit.push('亿');
			}
			return unit.join('');
		} else {
			return addWan(integer, number, 0, decimalDigit);
		}
	} else {
		return number;
	}
}
export const getDigit = (integer) => {
	var digit = -1;
	while (integer >= 1) {
		digit++;
		integer = integer / 10;
	}
	return digit;
}
export const addWan = (integer, number, mutiple, decimalDigit) => {
	var me = this;
	var digit = getDigit(integer);
	if (digit > 3) {
		var remainder = digit % 8;
		if (remainder >= 5) {
			// ‘十万’、‘百万’、‘千万’显示为‘万’
			remainder = 4;
		}
		return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
	} else {
		return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
	}
}
