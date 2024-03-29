import { StackNavigationProp } from "@react-navigation/stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { Button } from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { z } from "zod";

type RootStackParamList = {
	AppNavigator: undefined;
	Login: undefined;
	Register: undefined;
};

type RegisterPageProps = {
	navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

const formSchema = z.object({
	email: z.string().email({ message: "Email inválido!" }).nonempty({ message: "Email obrigatório!" }),
	password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres!" }).nonempty({ message: "Senha obrigatória!" }),
	confirmPassword: z.string().min(6, { message: "Confirmação de senha deve ter pelo menos 6 caracteres!" }).nonempty({ message: "Confirmação de senha obrigatória!" })
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem!",
	path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export function Register({ navigation }: RegisterPageProps) {
	const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(formSchema)
	});

	async function handleRegister(formData: FormData) {
		if (formData.password !== formData.confirmPassword) {
			Alert.alert("As senhas não coincidem!");
			return;
		}

		try {
			await createUserWithEmailAndPassword(auth, formData.email, formData.password);
			navigation.navigate("AppNavigator");
		} catch (error) {
			Alert.alert("Erro ao realizar registro, por favor tente novamente");
		}
	}

	return (
		<View className="flex-1 items-center justify-center">
			<View className="absolute top-40 w-full px-6">
				<Text className="text-4xl font-bold">Registrar</Text>
				<Text className="text-xl text-base-gray-3">Crie sua conta</Text>
			</View>

			<View className="w-full px-6 mb-4">
				<Text className="mb-2 text-base-gray-2">Email</Text>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="Email"
							autoCapitalize="none"
							className="px-1.5 text-lg border placeholder:text-lg border-base-gray-3 rounded-md py-1.5 w-full"
						/>
					)}
				/>
				{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
			</View>

			<View className="w-full px-6">
				<Text className="mb-2 text-base-gray-2">Senha</Text>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="Senha"
							secureTextEntry={true}
							autoCapitalize="none"
							className="px-1.5 text-lg border placeholder:text-lg border-base-gray-3 rounded-md py-1.5 w-full"
						/>
					)}
				/>
				{errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
			</View>

			<View className="w-full px-6 mt-4">
				<Text className="mb-2 text-base-gray-2">Confirmar Senha</Text>
				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="Confirmar Senha"
							secureTextEntry={true}
							autoCapitalize="none"
							className="px-1.5 text-lg border placeholder:text-lg border-base-gray-3 rounded-md py-1.5 w-full"
						/>
					)}
				/>
				{errors.confirmPassword && <Text className="text-red-500">{errors.confirmPassword.message}</Text>}
			</View>

			<View className="w-full px-6 mt-4">
				<Button onPress={handleSubmit(handleRegister)}>
					<Text className="text-base-gray-7 font-semibold">
						Registrar
					</Text>
				</Button>
			</View>



			<Pressable onPress={() => navigation.navigate("Login")}>
				<Text className="mt-10">
					Já tem uma conta? Entre
				</Text>
			</Pressable>
		</View>
	);
}

