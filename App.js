import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

// Screens
import SplashScreen from './Screens/SplashScreen';
import OnboardingScreen from './Screens/OnboardScreen.jsx';
import WaitingRoom from './Screens/WaitingRoom.jsx';
import ProcessingScreen from './Screens/ProcessingScreen.jsx';

// auth screens
import LoginScreen from './Screens/LoginScreen.jsx';
import SignupScreen from './Screens/SignupScreen.jsx';

// Faculty
import Main from './Screens/Faculty/Main.jsx';

// tab navigator
import TabNavigator from './Screens/Tab/TabNavigator.jsx';
import FacLoginScreen from './Screens/Faculty/FacLoginScreen.jsx';
import FacProcessingScreen from './Screens/Faculty/FacProcessingScreen.jsx'
import SelectSemester from './Screens/Faculty/Tab/Tabs/Dept/SelectSemester.jsx';
import SemesterClass from './Screens/Faculty/Tab/Tabs/Dept/SemesterClass.jsx';

const Stack = createStackNavigator();

import * as Notifications from 'expo-notifications';

export default function App() {
  
  async function registerForPushNotificationsAsync() {
    // Ask for permission directly within expo-notifications
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Failed to get push token for notifications!');
      return;
    }
    // Get the push token after permission is granted
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    return token;
  }
  
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Onboarding Screen */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="pr"
          component={ProcessingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wait"
          component={WaitingRoom}
          options={{ headerShown: false }}
        />

        {/* Authentication Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        {/* Tab Navigator */}
        <Stack.Screen
          name="MainApp"
          component={TabNavigator} // Integrates the TabNavigator
          options={{ headerShown: false }}
        />

        {/* Faculty */}
        <Stack.Screen
          name="FacMain"
          component={Main} // Integrates the TabNavigator
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FacLogin"
          component={FacLoginScreen} // Integrates the TabNavigator
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FacPr"
          component={FacProcessingScreen} // Integrates the TabNavigator
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FacSS"
          component={SelectSemester} // Integrates the TabNavigator
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FacSc"
          component={SemesterClass} // Integrates the TabNavigator
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   <Text>Hellow world</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3cac7c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
