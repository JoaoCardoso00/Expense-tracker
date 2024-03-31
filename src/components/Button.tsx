import { ReactNode } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

type ButtonProps = PressableProps & {
	icon?: ReactNode
	type?: keyof typeof styles
	children: ReactNode
}

const styles = {
	normal: "flex items-center justify-center flex-row bg-base-gray-2 mt-2 w-full py-3 rounded-lg",
	outline: "flex items-center justify-center flex-row bg-transparent border border-base-gray-2 mt-2 w-full py-3 rounded-lg"
}

export function Button({ icon, children, type, ...rest }: ButtonProps) {
	return (
		<Pressable
			className={type ? styles[type] : styles['normal']}
			{...rest}
		>
			{icon}
			{children}
		</Pressable>
	)
}
