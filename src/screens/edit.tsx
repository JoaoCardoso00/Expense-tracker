import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { AppStackParamList } from "./home";
import { RouteProp } from "@react-navigation/native";

type EditScreenRouteProps = RouteProp<AppStackParamList, "Edit">

type EditScreenProps = {
	navigation: StackNavigationProp<AppStackParamList, 'Edit'>
	route: EditScreenRouteProps
};

export function Edit({ route, navigation }: EditScreenProps) {
	const { expense } = route.params

	return (
		<View></View>
	)
}
