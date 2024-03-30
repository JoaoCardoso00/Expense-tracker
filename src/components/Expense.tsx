import { View, Text } from "react-native"
import { formatCurrency } from "../utils/formatCurrency"
import { cn } from "../utils/cn"
import type { Expense } from "../utils/fetchUserExpenses"


type ExpenseProps = {
	expense: Expense
}

export function Expense({ expense }: ExpenseProps) {
	return (
		<View className="flex flex-row border border-base-gray-5 rounded-lg py-3 px-3 items-center">
			<View className={cn("h-3 w-3 rounded-full")} style={{ backgroundColor: expense.category }} />
			<View className="w-px bg-base-gray-4 h-3 mx-3" />
			<Text>{expense.name}</Text>
			<Text className="font-semibold ml-auto">{formatCurrency(expense.cost)}</Text>
		</View>
	)
}
