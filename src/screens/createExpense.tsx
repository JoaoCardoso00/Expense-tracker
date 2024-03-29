import React from 'react';
import { View, Text, TextInput } from "react-native";
import { Button } from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema for the form data
const expenseSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	description: z.string().nonempty("Descrição é obrigatória"),
	date: z.string().nonempty("Data é obrigatória"),
	category: z.string().nonempty("Categoria é obrigatória")
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export function CreateExpense() {
	const { control, handleSubmit, formState: { errors } } = useForm<ExpenseFormData>({
		resolver: zodResolver(expenseSchema)
	});

	const onSubmit = (data: ExpenseFormData) => {
		console.log(data);
		// Handle form submission here
	};

	return (
		<View className="px-6">
			<View className="my-4">
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
							className="shadow-lg w-full border border-base-gray-5 rounded-md py-1.5 text-lg"
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
							<TextInput
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								value={field.value}
								className="shadow-lg w-full border border-base-gray-5 rounded-md py-1.5 text-lg"
							/>
						)}
					/>
				</View>

				<View className="flex-1 ml-2">
					<Text className="font-semibold text-base-gray-2 mb-1">
						Categoria
					</Text>
					{errors.category && <Text className='text-red-400 '>{errors.category.message}</Text>}
					<Controller
						control={control}
						name="category"
						render={({ field }) => (
							<TextInput
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								value={field.value}
								className="shadow-lg w-full border border-base-gray-5 rounded-md py-1.5 text-lg"
							/>
						)}
					/>
				</View>
			</View>

			<Button className="mt-10" onPress={handleSubmit(onSubmit)}>
				<Text className="text-base-gray-7 font-bold">Criar Gasto</Text>
			</Button>
		</View>
	);
}

