import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const announcements = [
  {
    id: '1',
    title: 'Event Notification',
    description: 'Join us for the Annual Tech Fest this Friday at 10 AM.',
    date: '15 Nov 2024',
  },
  {
    id: '2',
    title: 'New Policy Update',
    description: 'Fifth Semester Exam will start work-from-home policy has been updated. Please check your email.',
    date: '14 Nov 2024',
  },
  {
    id: '3',
    title: 'App Release',
    description: 'The new version of the company app has been released. Update now!',
    date: '13 Nov 2024',
  },
  {
    id: '4',
    title: 'Event Notification',
    description: 'Join us for the Annual Tech Fest this Friday at 10 AM.',
    date: '15 Nov 2024',
  },
  {
    id: '5',
    title: 'New Policy Update',
    description: 'Fifth Semester Exam will start work-from-home policy has been updated. Please check your email.',
    date: '14 Nov 2024',
  },
  {
    id: '6',
    title: 'App Release',
    description: 'The new version of the company app has been released. Update now!',
    date: '13 Nov 2024',
  },
];

export default function AnnouncementTab() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter announcements based on the search term
  const filteredAnnouncements = announcements.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderAnnouncementCard = ({ item }) => (
    <View style={styles.announcementCard}>
      <View style={styles.announcementContent}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
        <Text style={styles.announcementDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>

        {/* Premium Responsive Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#555" style={styles.searchIcon} />
          <TextInput
            placeholder="Search announcements..."
            style={styles.searchInput}
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Announcement List */}
        <FlatList
          data={filteredAnnouncements}
          renderItem={renderAnnouncementCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginTop:20
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
  },
  announcementDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
});
