export function formatDate(date: Date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
	const year = date.getFullYear().toString().substr(-2); // Get last 2 digits of year

	return `${day}.${month}.${year}`;
}
