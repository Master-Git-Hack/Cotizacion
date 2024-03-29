/**
 * @param value number that will be converted to a string displaying a representative character as $ or % in case you need it
 * @param isCurrency boolean that will be used to determine if the value will be converted to a currency or not
 * @param isPercentage boolean that will be used to determine if the value will be converted to a percentage or not
 * @param decimals number that will be used to determine the number of decimals to be displayed
 * @returns a string that represents the value in the desired format (currency or percentage or decimal)
 * @example toFancyNumber(123456789, true, false, 2) // returns "$1,234,567.89"
 * @example toFancyNumber(123456789, false, true, 2) // returns "1234567.89%"
 * @example toFancyNumber(123456789, false, false, 2) // returns "1234567.89"
 * @example toFancyNumber(123456789, false, false, 0) // returns "1234567"
 */
 export const toFancyNumber: Function = (
	value: number,
	isCurrency: boolean = false,
	isPercentage: boolean = false,
	decimals: number = 2,
): string =>
	new Intl.NumberFormat("es-MX", {
		style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
		minimumFractionDigits: decimals,
		currency: isCurrency ? "MXN" : undefined,
	}).format(isPercentage && !isCurrency ? value / 100 : value);