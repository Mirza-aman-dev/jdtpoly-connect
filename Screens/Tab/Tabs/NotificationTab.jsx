import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { withTiming, FadeIn, FadeOut, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export default function NotificationTab() {
  const notifications = [
    {
      id: '1',
      title: 'New Exam Schedule Released',
      details: 'The schedule for upcoming exams has been updated. Please check your exam dates.',
      time: '5 minutes ago',
    },
    {
      id: '2',
      title: 'Fee Payment Reminder',
      details: 'Last date to pay the fees is approaching. Make sure you pay by the deadline.',
      time: '2 hours ago',
    },
    {
      id: '3',
      title: 'New Event at the College',
      details: 'A cultural event will be held next week. Don’t miss it!',
      time: '1 day ago',
    },
    {
      id: '4',
      title: 'Important Update on Timetable',
      details: 'Some changes have been made to the timetable. Please check the updated version.',
      time: '2 days ago',
    },
    {
      id: '5',
      title: 'Important Update on Timetable',
      details: 'Some changes have been made to the timetable. Please check the updated version.',
      time: '2 days ago',
    },
    {
      id: '6',
      title: 'Important Update on Timetable',
      details: 'Some changes have been made to the timetable. Please check the updated version.',
      time: '2 days ago',
    },
    {
      id: '7',
      title: 'Important Update on Timetable',
      details: 'Some changes have been made to the timetable. Please check the updated version.',
      time: '2 days ago',
    },
    {
      id: '8',
      title: 'Important Update on Timetable',
      details: 'Some changes have been made to the timetable. Please check the updated version.',
      time: '2 days ago',
    },
  ];

  // Animation shared values
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const renderNotification = ({ item, index }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      style={styles.notificationCard}
    >
      <FontAwesome5 name="bell" size={20} color="#f2a900" style={styles.notificationIcon} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDetails}>{item.details}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Title outside the list */}
      <Text style={styles.headerTitle}>Notifications</Text>

      {/* List of notifications */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
    paddingTop: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginHorizontal: 8,
  },
  notificationIcon: {
    marginRight: 12,
    fontSize: 22,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
  },
  notificationDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#c9d3db',
    marginTop: 4,
  },
});

// Responsive Design using Dimensions and media queries
const { width } = Dimensions.get('window');
const isTablet = width >= 768; // Adjust breakpoint as needed

// Dynamically adjust styles based on screen size
const dynamicStyles = StyleSheet.create({
  headerTitle: {
    fontSize: isTablet ? 28 : 24, // Larger font size for tablets
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationCard: {
    paddingVertical: isTablet ? 16 : 12, // Adjust padding based on device size
    paddingHorizontal: isTablet ? 24 : 16,
    marginBottom: 20,
    marginHorizontal: isTablet ? 16 : 8,
    borderRadius: isTablet ? 12 : 8,
  },
  notificationIcon: {
    fontSize: isTablet ? 26 : 22, // Larger icon on tablets
  },
  notificationTitle: {
    fontSize: isTablet ? 18 : 16, // Larger text on tablets
  },
  notificationDetails: {
    fontSize: isTablet ? 16 : 14, // Larger text for tablets
  },
  notificationTime: {
    fontSize: isTablet ? 14 : 12, // Larger text for tablets
  },
});

