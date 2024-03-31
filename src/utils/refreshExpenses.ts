import { useExpensesStore } from "../store/ExpensesStore";
import { fetchAndGroupExpenses } from "./fetchUserExpenses";

export async function refreshExpenses(userId: string) {
	try {
		const expenseGroupAnswer = await fetchAndGroupExpenses(userId)
		useExpensesStore.setState({ expenses: expenseGroupAnswer })
	} catch (err) {
		console.log(err)
	}
}
