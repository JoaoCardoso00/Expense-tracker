export function formatDate(date: Date) {
	const day = date.getUTCDate().toString().padStart(2, '0');
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() is zero-based
	const year = date.getUTCFullYear().toString().substr(-2); // Get last 2 digits of year

	return `${day}.${month}.${year}`;
}
