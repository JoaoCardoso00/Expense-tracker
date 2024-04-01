import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Alert } from "react-native";
import { AppStackParamList } from "./home";
import { RouteProp } from "@react-navigation/native";
import { Button } from "../components/Button";
import { TrashIcon, PencilIcon } from "react-native-heroicons/solid";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { refreshExpenses } from "../utils/refreshExpenses";
import { Loading } from "../components/Loading";

type InfoScreenRouteProp = RouteProp<AppStackParamList, 'Info'>;

type InfoScreenProps = {
	navigation: StackNavigationProp<AppStackParamList, 'Info'>;
	route: InfoScreenRouteProp;
};

export function Info({ route, navigation }: InfoScreenProps) {
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useContext(UserContext)
	const { expense } = route.params

	// Format the date as dd/mm/yyyy
	const formattedDate = expense.date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	function handleDeleteExpense() {
		Alert.alert(
			"Excluir Gasto",
			"Tem certeza de que quer excluir este gasto?",
			[
				{
					text: "Cancelar",
					onPress: () => console.log("Cancelado"),
					style: "cancel"
				},
				{
					text: "Excluir",
					onPress: deleteExpense,
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	}

	async function deleteExpense() {
		setIsLoading(true)
		const expenseRef = doc(firestore, `users/${user?.uid}/expenses/${expense.id}`);
		await deleteDoc(expenseRef);

		await refreshExpenses(user?.uid)

		navigation.navigate("Inicio")
		setIsLoading(false)
	}


	return (
		<View className="pt-10 px-6 bg-base-gray-7 h-full w-full">
			<Text className="text-2xl font-bold">{expense.name}</Text>
			<Text className="text-lg text-base-gray-2">{expense.description}</Text>
			<View className="mt-8">
				<Text className="font-semibold">Data</Text>
				<Text className="text-lg text-base-gray-2">{formattedDate}</Text>
			</View>
			<View className="mt-8">
				<Text className="font-semibold">Categoria</Text>
				<View className="mr-8 h-20 w-full rounded-lg mt-2" style={{ backgroundColor: expense.category }} />
			</View>
			<View className="absolute bottom-20 w-screen px-6 items-center justify-center">
				<Button icon={<PencilIcon size={20} color="white" />} onPress={() => navigation.navigate("Edit", { expense: expense })}>
					<Text className="font-bold text-base-gray-7 py-1 ml-3">Editar gasto</Text>
				</Button>
				<Button type="outline" className="h-11" onPress={handleDeleteExpense}>
					{isLoading ? (
						<Loading color="black" />
					) : (
						<Text className="font-bold text-base-gray-1 py-1 ml-2">Excluir Gasto</Text>
					)}
				</Button>
			</View>
		</View >
	)
}
