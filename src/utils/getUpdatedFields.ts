import { Expense } from "./fetchUserExpenses";

export function getUpdatedFields(oldExpense: Omit<Expense, 'id'>, updatedExpense: Omit<Expense, 'id'>): Partial<Expense> {
	const changes: Partial<Expense> = {};

	Object.keys(updatedExpense).forEach((key) => {
		const updatedValue = updatedExpense[key as keyof Expense];
		const oldValue = oldExpense[key as keyof Expense];

		if (typeof updatedValue === 'object' && updatedValue !== null) {
			if (JSON.stringify(oldValue) !== JSON.stringify(updatedValue)) {
				changes[key as keyof Expense] = updatedValue;
			}
		} else if (oldValue !== updatedValue) {
			changes[key as keyof Expense] = updatedValue;
		}
	});

	return changes;
}
