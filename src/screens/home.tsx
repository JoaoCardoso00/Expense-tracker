import { Text, View, Image } from 'react-native';
import { StatusBar } from '../components/Status';
import { Button } from '../components/Button';
import { PlusIcon } from 'react-native-heroicons/solid';
import { Expenses } from '../components/Expenses';
import { Expense } from '../components/Expense';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

const expenses: Expense[] = [
	{
		id: 14294124,
		cost: 20,
		title: "Hamburguer",
		category: {
			title: "comidas",
			color: "#7c3aed"
		}
	},
	{
		id: 21241241,
		cost: 20,
		title: "Hamburguer",
		category: {
			title: "comidas",
			color: "#7c3aed"
		}
	}
]

const expensesGroup = [
	{
		id: 1,
		date: "02.01.2024",
		expenses: expenses
	},
	{
		id: 2,
		date: "05.01.2024",
		expenses: expenses
	},
	{
		id: 4,
		date: "05.01.2024",
		expenses: expenses
	},
	{
		id: 3,
		date: "05.01.2024",
		expenses: expenses
	},
]

export function Home() {

	const { user } = useContext(UserContext)

	console.log(user)

	return (
		<View className="bg-base-gray-7 flex-1 items-center h-full" >
			<View className="my-4" />
			<View className="w-full px-6 flex justify-between flex-row items-center">
				<Text className="text-lg font-bold">Bem vindo, usuário</Text>
				<Image source={{ uri: "https://avatar.iran.liara.run/public/39" }} className="h-12 w-12" />
			</View>
			<View className="my-4" />
			<View>
				<StatusBar />
			</View>
			<View className="my-4" />
			<View className="items-start w-full px-6 text-gray-800">
				<Text className="text-base-gray-2">Gastos</Text>
				<Button icon={<PlusIcon color="#f3f4f6" />}>
					<Text className="text-gray-100 font-semibold ml-2">Novo gasto</Text>
				</Button>
			</View>
			<View className="my-4" />
			<Expenses expenseGroup={expensesGroup} />
			<Image source={require('../../assets/blur-native.png')} className="absolute bottom-0 w-full" />
		</View>
	)
}
