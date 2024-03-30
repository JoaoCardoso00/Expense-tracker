import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { AppStackParamList } from "./home";
import { RouteProp } from "@react-navigation/native";

type InfoScreenRouteProp = RouteProp<AppStackParamList, 'Info'>;

type InfoScreenProps = {
	navigation: StackNavigationProp<AppStackParamList, 'Info'>;
	route: InfoScreenRouteProp;
};

export function Info({ route, navigation }: InfoScreenProps) {
	const { expense } = route.params

	console.log(expense)

	return (
		<View>

		</View>
	)
}
