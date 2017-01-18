export function isoDateString(date){
	let isoString = date.toISOString();
	return isoString.substring(0, isoString.indexOf('T'));
}
