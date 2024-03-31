import { ArrowUpRightIcon } from "react-native-heroicons/solid"
import { formatCurrency } from "../utils/formatCurrency"
import { Text, View } from "react-native"
import { useExpensesStore } from "../store/ExpensesStore"
import { ExpenseGroup } from "../utils/fetchUserExpenses"

export function StatusBar() {

	const { expenses } = useExpensesStore()

	function sumRecentExpenses(expenseGroups: ExpenseGroup[]): number {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		let totalCost = 0;

		for (const group of expenseGroups) {
			for (const expense of group.expenses) {
				if (expense.date >= thirtyDaysAgo) {
					totalCost += expense.cost;
				}
			}
		}

		return totalCost;
	}

	const expensesUntilLastMonth = sumRecentExpenses(expenses)

	return (
		<View className="flex w-full px-20 items-center gap-1 justify-center bg-[#E5F0DB] rounded-lg py-10 relative shadow-sm">
			<Text className="text-4xl font-semibold text-base-gray-1">{formatCurrency(expensesUntilLastMonth)}</Text>
			<Text className="text-md text-base-gray-2">Soma dos gastos mensais</Text>
			<View className="absolute top-3 right-3">
				<ArrowUpRightIcon color="#CBE4B4" />
			</View>
		</View>
	)
}
