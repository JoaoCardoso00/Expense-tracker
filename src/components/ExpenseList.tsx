import { View } from "react-native"
import { Expense } from "./Expense"
import { cn } from "../utils/cn"

type ExpenseListProps = {
	expenses: Expense[]
}


export function ExpenseList({ expenses }: ExpenseListProps) {
	return (
		<>
			{
				expenses.map((expense, idx) => (
					<View className={cn(idx === 0 ? "mt-0" : "mt-2")}>
						<Expense expense={expense} />
					</View>
				))
			}
		</>
	)
}
