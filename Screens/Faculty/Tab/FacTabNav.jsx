import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Faculty Tabs
import FacDashboard from './Tabs/FacDashboard';
import FacClassManagement from './Tabs/FacClassManagement';
import FacAnnouncement from './Tabs/FacAnnouncement';

const Tab = createBottomTabNavigator();

const returnTitle = (route) => {
    switch (route.name) {
        case 'Dashboard':
            return 'Dashboard';
        case 'Management':
            return 'Accessibility';
        case 'Announcement':
            return 'Announcements';
        default:
            return 'Dashboard'
    }
}

const FacTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Management') {
                        iconName = focused ? 'accessibility' : 'accessibility-outline';
                    } else if (route.name === 'Announcement') {
                        iconName = focused ? 'megaphone' : 'megaphone-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#3cac7c', // Active tab color
                tabBarInactiveTintColor: 'gray',  // Inactive tab color
                tabBarLabelStyle: { fontSize: 12, marginBottom: 5 }, // Adjust label size
                // headerShown: false, // Disable header for all screens
                tabBarShowLabel: false,
                headerTitle: returnTitle(route)
            })}
        >
            <Tab.Screen name="Dashboard" component={FacDashboard} />
            <Tab.Screen name="Management" component={FacClassManagement} />
            <Tab.Screen name="Announcement" component={FacAnnouncement} />
        </Tab.Navigator>
    )
}

export default FacTabNav

const styles = StyleSheet.create({})