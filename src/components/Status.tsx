import { ArrowUpRightIcon } from "react-native-heroicons/solid"
import { formatCurrency } from "../utils/formatCurrency"
import { Text, View } from "react-native"

export function StatusBar() {

	const cost = 342.0

	return (
		<View className="flex w-full px-20 items-center gap-1 justify-center bg-[#E5F0DB] rounded-lg py-10 relative shadow-sm">
			<Text className="text-4xl font-semibold text-base-gray-1">{formatCurrency(cost)}</Text>
			<Text className="text-md text-base-gray-2">Soma dos gastos mensais</Text>
			<View className="absolute top-3 right-3">
				<ArrowUpRightIcon color="#CBE4B4" />
			</View>
		</View>
	)
}
