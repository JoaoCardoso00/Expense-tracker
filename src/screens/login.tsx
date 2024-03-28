import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Image } from "react-native";
import { Button } from "../components/Button";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithRedirect } from "@firebase/auth"

type RootStackParamList = {
	AppNavigator: undefined;
	Login: undefined;
}

type LoginPageProps = {
	navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

export function Login({ navigation }: LoginPageProps) {

	async function handleLogin() {
		signInWithRedirect(auth, googleProvider)
	}

	return (
		<View className="flex-1 items-center justify-center">
			<View className="absolute top-40 w-full px-6">
				<Text className="text-4xl font-bold">Login</Text>
				<Text className="text-xl text-base-gray-3">Bem vindo! entre para começarmos</Text>
			</View>
			<Image source={require('../../assets/Welcome Bro.png')} className="w-96 h-96" />

			<View className="w-full px-6 absolute bottom-40">
				<Button onPress={handleLogin} icon={<Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" }} className="w-6 h-6 mr-4" />
				}>
					<Text className="text-base-gray-7 font-semibold">
						Entre com o Google
					</Text>
				</Button>
			</View>
		</View >
	);
}
