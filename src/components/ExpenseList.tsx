import { Pressable, View } from "react-native"
import { Expense } from "./Expense"
import { cn } from "../utils/cn"
import type { Expense as ExpenseType } from "../utils/fetchUserExpenses"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../screens/home"

type ExpenseListProps = {
	expenses: ExpenseType[]
	navigation: StackNavigationProp<AppStackParamList, 'Inicio'>;
}


export function ExpenseList({ expenses, navigation }: ExpenseListProps) {
	return (
		<>
			{
				expenses.map((expense, idx) => (
					<View className={cn(idx === 0 ? "mt-0" : "mt-2")}>
						<Pressable onPress={() => navigation.navigate("Info", { expense: expense })}>
							<Expense expense={expense} />
						</Pressable>
					</View>
				))
			}
		</>
	)
}
