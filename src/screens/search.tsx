import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "./home";
import { Image, View, Text, TextInput, Pressable, Modal } from "react-native";
import { EyeDropperIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { useExpensesStore } from "../store/ExpensesStore";
import { Expenses } from "../components/Expenses";
import ColorPicker, { HueSlider, Panel1, Preview, Swatches } from "reanimated-color-picker";
import { Button } from "../components/Button";
import { ExpenseGroup } from "../utils/fetchUserExpenses";

type SearchScreenProps = {
	navigation: StackNavigationProp<AppStackParamList, 'Busca'>;
};

export function Search({ navigation }: SearchScreenProps) {
	const [search, setSearch] = useState("")
	const [showModal, setShowModal] = useState(false)
	const [currentColor, setCurrentColor] = useState("white")

	const { expenses } = useExpensesStore()

	const filteredExpenses = searchExpenses()

	function searchExpenses(): ExpenseGroup[] {
		return expenses.reduce((acc: ExpenseGroup[], group: ExpenseGroup) => {
			// Filter expenses in each group based on the search term and color
			const filteredExpenses = group.expenses.filter(expense => {
				const searchTermLower = search.toLowerCase();
				const matchesSearch = expense.name.toLowerCase().includes(searchTermLower) ||
					expense.description.toLowerCase().includes(searchTermLower);
				const matchesColor = currentColor === 'white' || expense.category === currentColor;

				return matchesSearch && matchesColor;
			});

			// Only add groups to the accumulator if they have matching expenses
			if (filteredExpenses.length > 0) {
				acc.push({ ...group, expenses: filteredExpenses });
			}

			return acc;
		}, []);
	}

	function onSelectColor({ hex }: { hex: string }) {
		setCurrentColor(hex)
	};

	return (
		<View className="bg-base-gray-7 flex-1 ">
			<View className="mt-6 flex flex-row px-6">
				<TextInput
					onChangeText={(value) => setSearch(value)}
					value={search}
					returnKeyType="search"
					placeholder="Procure por titulo, descrição..."
					className="border border-base-gray-5 rounded-md flex-1 p-2"
				/>
				<View className="w-12 h-12 ml-2">
					<Pressable className="aspect-square border border-base-gray-5 items-center justify-center h-full rounded-lg" onPress={() => setShowModal(true)} style={{ backgroundColor: currentColor }} >
						{currentColor === 'white' && <EyeDropperIcon color="gray" />}
					</Pressable>
				</View>
			</View>
			<View className="w-full flex-1">
				{
					filteredExpenses.length === 0 ? (
						<View className="flex-1 items-center pt-20">
							<Text className="text-2xl text-base-gray-3 mb-4">Sem resultados encontrados </Text>
							<Image source={require('../../assets/not-found.png')} className="h-72 w-56" />
						</View>
					) : (
						<Expenses showScroll={false} expenses={filteredExpenses} navigation={navigation} />
					)
				}
			</View>
			<Image source={require('../../assets/blur-native.png')} className="absolute -bottom-6 w-full" />
			<Modal visible={showModal} animationType='slide'>
				<ColorPicker className="px-6 mx-auto mt-40" value={currentColor} onComplete={onSelectColor}>
					<View className='shadow-md'>
						<Preview />
					</View>
					<View className='my-2' />
					<Panel1 />
					<View className='my-2' />
					<HueSlider />
					<View className='my-2' />
					<Swatches />
				</ColorPicker>

				<View className='px-6 mt-4'>
					<Button onPress={() => {
						setCurrentColor('white')
						setShowModal(false)
					}} type="outline">
						<Text className='text-lg font-bold text-base-gray-1'>Resetar</Text>
					</Button>
					<Button onPress={() => setShowModal(false)} >
						<Text className='text-lg font-bold text-base-gray-7'>Ok</Text>
					</Button>
				</View>
			</Modal>
		</View>
	)
}
