import { Text, View, Image, Pressable } from 'react-native';
import { StatusBar } from '../components/Status';
import { Button } from '../components/Button';
import { PlusIcon } from 'react-native-heroicons/solid';
import { Expenses } from '../components/Expenses';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Expense, ExpenseGroup, fetchAndGroupExpenses } from '../utils/fetchUserExpenses';
import { useExpensesStore } from '../store/ExpensesStore';

export type AppStackParamList = {
	Inicio: undefined;
	Estatisticas: undefined;
	Info: {
		expense: Expense
	}
	Edit: {
		expense: Expense
	}
	"Novo Gasto": undefined;
	Busca: undefined;
};

type HomeScreenProps = {
	navigation: StackNavigationProp<AppStackParamList, 'Inicio'>;
};

export function Home({ navigation }: HomeScreenProps) {
	const { expenses, setExpenses } = useExpensesStore()

	const { user } = useContext(UserContext)

	const loadExpenses = async () => {
		try {
			const expenseGroupAnswer = await fetchAndGroupExpenses(user?.uid!);
			setExpenses(expenseGroupAnswer);
		} catch (err) {
			console.log(err)
		}
	};

	useEffect(() => {
		loadExpenses();
	}, []);

	return (
		<View className="bg-base-gray-7 flex-1 items-center h-full" >
			<View className="my-4" />
			<View className="w-full px-6 flex justify-between flex-row items-center">
				<Text className="text-lg font-bold">Bem vindo, usuário</Text>
				<Image source={{ uri: "https://avatar.iran.liara.run/public/39" }} className="h-12 w-12" />
			</View>
			<View className="my-4" />
			<Pressable onPress={() => navigation.navigate("Estatisticas")}>
				<StatusBar />
			</Pressable>
			<View className="my-4" />
			<View className="items-start w-full px-6 text-gray-800">
				<Text className="text-base-gray-2">Gastos</Text>
				<Button icon={<PlusIcon color="#f3f4f6" />} onPress={() => navigation.navigate("Novo Gasto")}>
					<Text className="text-gray-100 font-semibold ml-2">Novo gasto</Text>
				</Button>
			</View>
			<Expenses expenses={expenses} navigation={navigation} />
			<Image source={require('../../assets/blur-native.png')} className="absolute -bottom-6 w-full" />
		</View>
	)
}
