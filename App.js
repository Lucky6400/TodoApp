import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TasksScreen from './screens/TasksScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
const Stack = createNativeStackNavigator();
import AnimatedLoader from 'react-native-animated-loader';
import { useEffect, useState } from 'react';

export default function App() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}>
        <Text>Doing something...</Text>
      </AnimatedLoader>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen}
              options={{
                title: 'Welcome back, Lucky!',
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#0d78f2",
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen name="Tasks" component={TasksScreen}
              options={{
                title: 'Tasks',
                headerStyle: {
                  backgroundColor: "#0d78f2",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen name="Settings" component={SettingsScreen}
              options={{
                title: 'Settings',
                headerStyle: {
                  backgroundColor: "#0d78f2",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});