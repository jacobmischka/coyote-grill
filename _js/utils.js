export function isoDateString(date){
	let isoString = date.toISOString();
	return isoString.substring(0, isoString.indexOf('T'));
}

export function isPromotionRedeemed(id, userData){
	return userData
		&& userData.redeemedPromotions
		&& userData.redeemedPromotions[id]
		&& userData.redeemedPromotions[id].redeemed;
}
