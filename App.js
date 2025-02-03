import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(null);

  useEffect(() => {
    checkOnboardingState();
  }, []);

  const checkOnboardingState = async () => {
    const name = await AsyncStorage.getItem('name');
    setIsOnboarded(!!name);
  };

  if (isOnboarded === null) return null; // Prevent flickering

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} setIsOnboarded={setIsOnboarded} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {props => <ProfileScreen {...props} setIsOnboarded={setIsOnboarded} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {props => <OnboardingScreen {...props} setIsOnboarded={setIsOnboarded} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
