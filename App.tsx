import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/screens/home';
import { Stats } from './src/screens/stats';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './src/screens/login';
import { UserContext } from './src/lib/context';
import { useUserData } from './src/lib/hooks';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FAFAFA", borderWidth: 0
        },
        headerTintColor: "#121214",
        drawerActiveTintColor: "#121214"
      }
      } >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Stats' component={Stats} />
    </Drawer.Navigator>
  )
}

export default function App() {

  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='AppNavigator' component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer >
    </UserContext.Provider>
  );
}

