import { View, Text, FlatList, Image } from "react-native"
import { Expense } from "./Expense"
import { ExpenseList } from "./ExpenseList"
import { cn } from "../utils/cn"

type ExpensesProps = {
	expenseGroup: {
		id: number
		date: string
		expenses: Expense[]
	}[]
}

export function Expenses({ expenseGroup }: ExpensesProps) {
	return (
		<View className="flex-1 relative w-full">
			<FlatList
				data={expenseGroup}
				renderItem={({ item, index }) => (
					<View className={cn("justify-start flex w-full", index === 0 ? "mt-0" : "mt-8")}>
						<Text className="text-lg font-semibold mb-1">{item.date}</Text>
						<ExpenseList expenses={item.expenses} />
					</View>
				)}
				keyExtractor={(item) => item.id}
				className="w-full px-6 pt-4"
			/>
			<Image source={require('../../assets/blur-top.png')} className="absolute top-0 w-full" />
		</View>
	)
}
