import { ReactNode } from "react";
import { Text, View } from "react-native";

type ButtonProps = {
	icon?: ReactNode
}

export function Button({ icon }: ButtonProps) {
	return (
		<View className="flex items-center justify-center flex-row bg-base-gray-2 mt-2 w-full py-3 rounded-lg">
			{icon}
			<Text className="text-gray-100 font-semibold ml-2">Novo gasto</Text>
		</View>
	)
}
