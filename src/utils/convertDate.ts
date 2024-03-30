import { Timestamp } from "firebase/firestore";

function parseDate(dateString: string): Date {
	const [day, month, year] = dateString.split('/').map(Number);
	// Subtract 1 from month because JavaScript counts months from 0 to 11
	return new Date(year, month - 1, day);
}

export function convertToFirebaseTimestamp(dateString: string): Timestamp {
	const date = parseDate(dateString);
	return Timestamp.fromDate(date);
}
