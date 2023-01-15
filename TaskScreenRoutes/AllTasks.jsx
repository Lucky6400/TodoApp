import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Portal, Text, TouchableRipple } from 'react-native-paper'
import { TextInput, Modal, Provider } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../redux/taskSlice';

const AllTasks = () => {
    const tasks = useSelector(state => state.taskReducer.tasks)
    const [visible, setVisible] = React.useState(false);
    const [taskModalVisible, setTaskModalVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("")
    const [taskDescription, setTaskDescription] = useState("");

    const [invalidInput, setInvalidInput] = useState(false);
    const mode = useSelector(state => state.settingsReducer.mode);
    const [currentId, setCurrentId] = useState(null);
    const currentTaskIndex = tasks.findIndex(t => t.id === currentId);

    return (
        <Provider>

            <View style={{
                backgroundColor: mode === 'light' ? '#fff' : '#000',
                flex: 1
            }}>
                <View style={styles.inputContainer}>

                    <Button buttonColor={mode === 'light' ? 'black' : 'white'} style={styles.addButton} compact textColor={mode === 'light' ? 'white' : 'black'} mode="elevated" onPress={showModal}>
                        Add a new task
                    </Button>


                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <Text style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 10,
                                color: 'black'
                            }}>Add a new task</Text>
                            <TextInput textColor='#000' style={{ backgroundColor: 'white', color: 'black' }} placeholder="Task name" mode='outlined' onChangeText={e => setInputValue(e)} />

                            <TextInput textColor='#000' placeholder="Task Desc" multiline style={{ paddingVertical: 0, height: 100, backgroundColor: 'white', color: 'black' }} mode='outlined' onChangeText={e => setTaskDescription(e)} />
                            <Button buttonColor={'#0d78f2'} style={styles.addButton} compact textColor={"white"} mode="elevated" onPress={() => {
                                if (inputValue === "") {
                                    setInvalidInput(true);
                                } else {
                                    setInvalidInput(false);
                                    dispatch(taskAction.addTask({
                                        id: new Date().getMilliseconds(),
                                        text: inputValue,
                                        completed: false,
                                        important: false,
                                        desc: taskDescription
                                    }))
                                    setInputValue("")
                                    setVisible(false);
                                }

                            }
                            }>
                                Submit
                            </Button>
                            {invalidInput && <Text style={{ width: '100%', alignItems: 'center', textAlign: 'center', color: 'red' }}>Enter a value!</Text>}
                        </Modal>
                    </Portal>


                </View>

                <Portal>
                    <Modal visible={taskModalVisible} contentContainerStyle={{ ...containerStyle, height: 'auto' }} onDismiss={() => setTaskModalVisible(false)}>
                        <Text style={{
                            width: '100%',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 10,
                            color: 'black'
                        }}>{tasks[currentTaskIndex]?.text}</Text>
                        <Text style={{color: 'black'}}>{tasks[currentTaskIndex]?.desc}</Text>
                    </Modal>
                </Portal>

                <ScrollView style={styles.tasksContainer}>
                    {tasks.length ?
                        tasks.map(item => (<View key={item.id} style={{
                            ...styles.cardContainer,
                            backgroundColor: item.completed === true ? "#178917" : '#0d78f2',
                        }}>
                            {item.important && <FontAwesome
                                style={{
                                    position: 'absolute',
                                    top: -5,
                                    left: 0
                                }}
                                name="exclamation-circle" size={24} color="red" />}

                            <TouchableRipple
                                onPress={() => dispatch(taskAction.markTaskCompleted({
                                    id: item.id
                                }))}
                                rippleColor="#c9c9c951"
                            >
                                <Ionicons name="checkmark-done-circle-outline" size={24} color={"white"} />
                            </TouchableRipple>
                            <Text
                                style={{
                                    width: '75%',
                                    overflow: 'hidden',
                                    color: "white"
                                }}
                                onPress={() => {
                                    setCurrentId(item.id);
                                    setTaskModalVisible(true)
                                }}

                                onLongPress={() => dispatch(taskAction.markTaskImportant({ id: item.id }))}
                            >{item.text}</Text>
                            <TouchableRipple
                                onPress={() => dispatch(taskAction.deleteTask({ id: item.id }))}
                                rippleColor="#c9c9c951"
                            >
                                <AntDesign name="delete" size={24} color={"white"} />
                            </TouchableRipple>


                        </View>))

                        :
                        <Text>No tasks</Text>
                    }

                </ScrollView>



            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 40,
        marginTop: 20
    },
    addButton: {
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginTop: 5,
        width: '100%',

    },
    tasksContainer: {
        padding: 10
    },
    cardContainer: {
        display: 'flex',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 5,
        position: 'relative'
    }
})
export default AllTasks