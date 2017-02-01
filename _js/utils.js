export function isoDateString(date){
	// FIXME: Convert to local timezone

	let isoString = date.toISOString();
	return isoString.substring(0, isoString.indexOf('T'));
}

export function isPromotionRedeemed(id, userData){
	return userData
		&& userData.redeemedPromotions
		&& userData.redeemedPromotions[id]
		&& userData.redeemedPromotions[id].redeemed;
}

export function getBaseUrl(){
	return window.location.href.replace(window.location.search, '');
}

export function promotionIsValid(promotion){
	if(!promotion || !promotion.startDate || !promotion.endDate)
		return false;

	const today = new Date();
	const promotionStart = new Date(promotion.startDate);
	const promotionEnd = new Date(promotion.endDate);
	return promotionStart <= today && promotionEnd >= today;
}
