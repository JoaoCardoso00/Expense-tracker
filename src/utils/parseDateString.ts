export function parseDateString(dateString: string): Date {
	// Split the date string into components
	const parts = dateString.split("/");

	if (parts.length === 3) {
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // Subtract 1 to convert to 0-based index
		const year = parseInt(parts[2], 10);

		return new Date(year, month, day);
	} else {
		throw new Error("Invalid date format");
	}
}
