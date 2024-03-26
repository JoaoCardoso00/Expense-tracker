import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/screens/home';
import { Stats } from './src/screens/stats';

const { Navigator, Screen } = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FAFAFA", borderWidth: 0
          },
          headerTintColor: "#121214",
          drawerActiveTintColor: "#121214"
        }
        } >
        <Screen name='Home' component={Home} />
        <Screen name='Stats' component={Stats} />
      </Navigator>
    </NavigationContainer >
  );
}

