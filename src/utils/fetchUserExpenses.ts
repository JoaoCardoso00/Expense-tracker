import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "../lib/firebase";

export type Expense = {
	id: string;
	cost: number;
	name: string;
	category: string;
	description: string;
	date: Date; // ISO date string
};

export type ExpenseGroup = {
	id: number;
	date: Date;
	expenses: Expense[];
};

export async function fetchAndGroupExpenses(userId: string): Promise<ExpenseGroup[]> {
	const userExpensesRef = collection(firestore, `users/${userId}/expenses`);
	const q = query(userExpensesRef, orderBy('date', 'desc'));
	const querySnapshot = await getDocs(q);

	const expensesByDay = new Map<string, Expense[]>();

	querySnapshot.forEach((doc) => {
		const expense = doc.data() as Expense;
		const expenseDateObj = expense.date instanceof Date ? expense.date : expense.date.toDate(); // Corrected to 'expense.data'
		const expenseDateKey = expenseDateObj.toISOString().split('T')[0];

		if (!expensesByDay.has(expenseDateKey)) {
			expensesByDay.set(expenseDateKey, []);
		}

		expensesByDay.get(expenseDateKey).push({ id: doc.id, ...expense, date: expenseDateObj });
	});

	const expensesGroup: ExpenseGroup[] = Array.from(expensesByDay).map(([dateKey, expenses], index) => ({
		id: index,
		date: new Date(dateKey), // Convert the string key back to a Date object for grouping
		expenses
	})).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by most recent date

	return expensesGroup;
}

