import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "./home";
import { RouteProp } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from "react-native";
import { Button } from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import CurrencyInput from 'react-native-currency-input';
import MaskInput, { Masks } from 'react-native-mask-input';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { UserContext } from '../lib/context';
import { convertToFirebaseTimestamp } from '../utils/convertDate';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { refreshExpenses } from '../utils/refreshExpenses';
import { getUpdatedFields } from "../utils/getUpdatedFields";
import { parseDateString } from "../utils/parseDateString";
import { XMarkIcon } from "react-native-heroicons/solid";
import { Loading } from "../components/Loading";


const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const expenseSchema = z.object({
	name: z.string().min(1, { message: "Nome é obrigatório" }),
	description: z.string().min(1, { message: "Descrição é obrigatória" }),
	cost: z.number().nonnegative({ message: "Custo não pode ser negativo" }),
	date: z.string()
		.min(1, { message: "Data é obrigatória" })
		.regex(dateRegex, { message: "Data deve estar no formato DD/MM/YYYY" })
		.refine((date) => {
			const [day, month, year] = date.split('/').map(Number);
			const dateObj = new Date(year, month - 1, day);
			return dateObj.getDate() === day &&
				dateObj.getMonth() + 1 === month &&
				dateObj.getFullYear() === year;
		}, {
			message: "Data inválida",
		}),
	category: z.string().min(1, { message: "Categoria é obrigatória" })
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

type EditScreenRouteProps = RouteProp<AppStackParamList, "Edit">

type EditScreenProps = {
	navigation: StackNavigationProp<AppStackParamList, 'Edit'>
	route: EditScreenRouteProps
};

export function Edit({ route, navigation }: EditScreenProps) {
	const { expense } = route.params
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [currentColor, setCurrentColor] = useState("white")

	const { user } = useContext(UserContext)

	const { control, handleSubmit, formState: { errors }, setValue } = useForm<ExpenseFormData>({
		resolver: zodResolver(expenseSchema)
	});

	const onSubmit = async (data: ExpenseFormData) => {

		setIsLoading(true)

		const updatedExpense = {
			name: data.name,
			cost: data.cost,
			description: data.description,
			date: parseDateString(data.date),
			category: data.category
		}

		const updatedFields = getUpdatedFields(expense, updatedExpense)

		const parsedDate = convertToFirebaseTimestamp(data.date)

		const parsedFields = {
			...updatedFields,
			date: parsedDate
		}

		await updateDoc(doc(firestore, 'users', user?.uid, 'expenses', expense.id), parsedFields)

		refreshExpenses(user?.uid)

		setIsLoading(false)

		setValue('name', "")
		setValue('category', "")
		setValue('description', "")
		setValue('cost', 0)
		setValue('date', "")
		setValue('category', "white")
		navigation.navigate("Inicio")
	};

	function onSelectColor({ hex }: { hex: string }) {
		setCurrentColor(hex)
		setValue("category", hex)
	};

	useEffect(() => {

		const formattedDate = expense.date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});

		setValue('name', expense.name)
		setValue('category', expense.category)
		setValue('description', expense.description)
		setValue('cost', expense.cost)
		setValue('date', formattedDate)
		setValue('category', expense.category)
		setCurrentColor(expense.category)
	}, [expense])

	return (
		<View className="px-6 bg-base-gray-7">
			<View className='my-4' />
			<View>
				<Text className="font-semibold text-base-gray-2 mb-1">
					Nome {errors.name && <Text className='text-red-400'>{errors.name.message}</Text>}
				</Text>
				<Controller
					control={control}
					name="name"
					render={({ field }) => (
						<TextInput
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							value={field.value}
							className="shadow-lg w-full border px-1.5 border-base-gray-5 rounded-md py-1.5 text-lg"
						/>
					)}
				/>
			</View>
			<View className="mt-4">
				<Text className="font-semibold text-base-gray-2 mb-1">
					Valor {errors.cost && <Text className='text-red-400'>{errors.cost.message}</Text>}
				</Text>
				<Controller
					control={control}
					name="cost"
					render={({ field }) => (
						<CurrencyInput
							value={field.value}
							onChangeValue={field.onChange}
							prefix="R$"
							className="px-1.5 shadow-lg w-full border border-base-gray-5 rounded-md py-1.5 text-lg"
							delimiter="."
							separator=","
							precision={2}
							minValue={0}
						/>
					)}
				/>
			</View>

			<View className="my-4">
				<Text className="font-semibold text-base-gray-2 mb-1">
					Descrição {errors.description && <Text className='text-red-400' >{errors.description.message}</Text>}
				</Text>
				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<TextInput
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							value={field.value}
							multiline={true}
							numberOfLines={4}
							className="border border-base-gray-5 rounded-md w-full h-40 p-2"
						/>
					)}
				/>
			</View>

			<View className="w-full flex flex-row">
				<View className="flex-1 mr-2">
					<Text className="font-semibold text-base-gray-2 mb-1">
						Data
					</Text>
					{errors.date && <Text className='text-red-400' >{errors.date.message}</Text>}
					<Controller
						control={control}
						name="date"
						render={({ field }) => (
							<MaskInput
								value={field.value}
								onChangeText={field.onChange}
								mask={Masks.DATE_DDMMYYYY}
								className="px-1.5 shadow-lg w-full border border-base-gray-5 rounded-md py-1.5 text-lg"

							/>
						)}
					/>
				</View>

				<View className="flex-1 ml-2">
					<Text className="font-semibold text-base-gray-2 mb-1">
						Categoria
					</Text>
					{errors.category && <Text className='text-red-400 '>{errors.category.message}</Text>}
					<Pressable
						onPress={() => setShowModal(true)}
						style={{ backgroundColor: currentColor }}
						className="shadow-lg w-full border border-base-gray-5 rounded-md py-1.5 text-lg h-10"
					/>
				</View>
			</View>

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
					<Button onPress={() => setShowModal(false)} >
						<Text className='text-lg font-bold text-base-gray-7'>Ok</Text>
					</Button>
				</View>
			</Modal>

			<Button className="mt-10 h-10" onPress={handleSubmit(onSubmit)}>
				{isLoading ? (
					<Loading />
				) : (
					<Text className="text-base-gray-7 font-bold">Editar Gasto</Text>
				)}
			</Button>
		</View>
	);
}

