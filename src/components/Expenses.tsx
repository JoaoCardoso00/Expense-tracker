import { View, Text, FlatList, Image } from "react-native"
import { ExpenseList } from "./ExpenseList"
import { cn } from "../utils/cn"
import { ExpenseGroup } from "../utils/fetchUserExpenses"
import { formatDate } from "../utils/formatDate"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../screens/home"

type ExpensesProps = {
	expenses: ExpenseGroup[]
	navigation: StackNavigationProp<AppStackParamList, 'Inicio'>;
}

export function Expenses({ expenses, navigation }: ExpensesProps) {
	return (
		<View className="flex-1 relative w-full">
			<FlatList
				data={expenses}
				renderItem={({ item, index }) => (
					<View key={item.id} className={cn("justify-start flex w-full", index === 0 ? "mt-0" : "mt-8", index === expenses.length - 1 ? "mb-20" : "mb-0")}>
						<Text className="text-lg font-semibold mb-1">{formatDate(item.date)}</Text>
						<ExpenseList expenses={item.expenses} navigation={navigation} />
					</View>
				)}
				className="w-full px-6 pt-4 pb-6"
			/>
			<Image source={require('../../assets/blur-top.png')} className="absolute top-0 w-full" />
		</View>
	)
}
