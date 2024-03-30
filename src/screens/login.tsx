import { StackNavigationProp } from "@react-navigation/stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { Button } from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";
import { z } from "zod";
import { doc, setDoc } from "firebase/firestore";

type RootStackParamList = {
	AppNavigator: undefined;
	Login: undefined;
	Register: undefined;
};

type LoginPageProps = {
	navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const formSchema = z.object({
	email: z.string().email({ message: "Email inválido!" }).nonempty({ message: "Email obrigatório!" }),
	password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres!" }).nonempty({ message: "Senha obrigatória!" })
});

type FormData = z.infer<typeof formSchema>;

export function Login({ navigation }: LoginPageProps) {
	const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(formSchema)
	});

	async function handleLogin(formData: FormData) {
		try {
			await signInWithEmailAndPassword(auth, formData.email, formData.password);
			navigation.navigate("AppNavigator");
		} catch (error) {
			console.log(error)
			Alert.alert("Erro ao realizar autenticação, por favor tente novamente");
		}
	}

	return (
		<View className="flex-1 items-center justify-center">
			<View className="absolute top-40 w-full px-6">
				<Text className="text-4xl font-bold">Login</Text>
				<Text className="text-xl text-base-gray-3">Bem vindo! entre para começarmos</Text>
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
				<Button onPress={handleSubmit(handleLogin)}>
					<Text className="text-base-gray-7 font-semibold">
						Entrar
					</Text>
				</Button>
			</View>
			<Pressable onPress={() => navigation.navigate("Register")}>
				<Text className="mt-10">
					Não tem uma conta? Registre-se
				</Text>
			</Pressable>
		</View>
	);
}

