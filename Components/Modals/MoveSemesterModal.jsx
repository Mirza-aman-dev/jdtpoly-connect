import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';

const MoveSemesterModal = ({ ModalOpen, setModalOpen, onPress, isSem6 }) => {

    const handleClick = (semesterClicked) => {
        // console.log(semesterClicked);
        // onPress(semesterClicked)
    }

    return (
        <Modal visible={ModalOpen} animationType="slide" transparent>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <Text style={{ position: 'absolute', top: 20, alignSelf: 'center', fontSize: 20 }}>Move Semester</Text>
                    {/* buttons */}
                    {
                        isSem6 ?
                            null
                            :
                            <>
                                <TouchableOpacity style={styles.button} onPress={() => onPress('semester1')} >
                                    <Text style={{ color: 'white' }} >Semester 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onPress('semester2')}>
                                    <Text style={{ color: 'white' }}>Semester 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onPress('semester3')}>
                                    <Text style={{ color: 'white' }}>Semester 3</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onPress('semester4')}>
                                    <Text style={{ color: 'white' }}>Semester 4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onPress('semester5')}>
                                    <Text style={{ color: 'white' }}>Semester 5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onPress('semester6')}>
                                    <Text style={{ color: 'white' }}>Semester 6</Text>
                                </TouchableOpacity>
                            </>
                    }
                    <TouchableOpacity style={styles.button} onPress={() => onPress('semester5')}>
                                    <Text style={{ color: 'white' }}>Semester 5</Text>
                                </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonP} onPress={() => handleRemove()}>
                        <Text style={{ color: 'white' }}>Pass Out</Text>
                    </TouchableOpacity>
                    {/* buttons */}
                    <TouchableOpacity style={{ position: 'absolute', top: 0, left: 20 }} onPress={() => setModalOpen(false)}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default MoveSemesterModal;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        width: 400,
        height: 500,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5, // Add shadow effect for better visibility
    },
    closeText: {
        marginTop: 20,
        color: '#007bff',
        fontSize: 16,
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    buttonP: {
        width: 150,
        height: 40,
        backgroundColor: '#dc3545',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    }
});
