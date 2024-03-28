import { ReactNode } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

type ButtonProps = PressableProps & {
	icon?: ReactNode
	children: ReactNode
}

export function Button({ icon, children, ...rest }: ButtonProps) {
	return (
		<Pressable
			className="flex items-center justify-center flex-row bg-base-gray-2 mt-2 w-full py-3 rounded-lg"
			{...rest}
		>
			{icon}
			{children}
		</Pressable>
	)
}
