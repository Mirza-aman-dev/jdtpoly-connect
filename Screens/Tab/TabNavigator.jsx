import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens for Tabs
import HomeTab from './Tabs/HomeTab';
import NotificationTab from './Tabs/NotificationTab';
import AnnouncementTab from './Tabs/AnnouncementTab'
import SettingsTab from './Tabs/SettingsTab'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }else if (route.name === 'Announcement') {
            iconName = focused ? 'megaphone' : 'megaphone-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3cac7c', // Active tab color
        tabBarInactiveTintColor: 'gray',  // Inactive tab color
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 }, // Adjust label size
        headerShown: false, // Disable header for all screens
        tabBarShowLabel:false,
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Notification" component={NotificationTab} />
      <Tab.Screen name="Announcement" component={AnnouncementTab} />
      <Tab.Screen name="Settings" component={SettingsTab} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
