import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'

const SelectSemesterModal = ({ visible, setVisible, data, onHandle }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Semester</Text>
                    {data.map((item) => (
                        <TouchableOpacity
                            key={item.value} // Use value as a unique key
                            style={styles.modalOption}
                            onPress={() => {
                                onHandle(item.value);
                                setVisible(false); // Close modal after selection
                            }}
                        >
                            <Text style={styles.modalText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => setVisible(false)} // Close the modal
                    >
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default SelectSemesterModal


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    modalCloseText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});  