import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Portal, Text, TouchableRipple } from 'react-native-paper'
import { Modal, Provider } from 'react-native-paper';
import { TextInput  } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../redux/taskSlice';

const AllTasks = () => {
    const tasks = useSelector(state => state.taskReducer.tasks)
    const [visible, setVisible] = React.useState(false);
    const [taskModalVisible, setTaskModalVisible] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
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
    const [search, setSearch] = useState("");

    console.log(search)
    return (
        <Provider>

            <View style={{
                backgroundColor: mode === 'light' ? '#fff' : '#000',
                flex: 1
            }}>

                <Portal>
                    <Modal visible={visible} onDismiss={() => {
                        setInputValue("");
                        setTaskDescription("");
                        setEditing(false);
                        hideModal()
                    }} contentContainerStyle={containerStyle}>
                        <Text style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 10,
                            color: 'black'
                        }}>Add a new task</Text>
                        <TextInput autoCorrect={false} outlineColor='black'
                            placeholderTextColor={"gray"} value={inputValue} textColor='#000' style={{ backgroundColor: 'white', color: 'black', padding: 10, borderWidth: 2, borderColor: 'royalblue', borderRadius: 4, marginBottom: 10}} placeholder="Task name" mode='outlined' onChangeText={e => setInputValue(e)} />

                        <TextInput autoCorrect={false} outlineColor='black'
                            activeOutlineColor='royalblue'
                            placeholderTextColor={"gray"} value={taskDescription} textColor='#000' placeholder="Task Desc" multiline style={{ height: 100, backgroundColor: 'white', color: 'black', padding: 10, borderWidth: 2, borderColor: 'royalblue', borderRadius: 4 }} mode='outlined' onChangeText={e => setTaskDescription(e)} />
                        <Button buttonColor={'#0d78f2'} style={styles.addButton} compact textColor={"white"} mode="elevated" onPress={() => {
                            if (inputValue === "") {
                                setInvalidInput(true);
                            } else {
                                setInvalidInput(false);
                                if (editing) {
                                    dispatch(taskAction.editTask({
                                        id: currentId,
                                        task: {
                                            id: currentId,
                                            text: inputValue,
                                            desc: taskDescription,
                                            completed: false,
                                            important: false
                                        }
                                    }))
                                    setEditing(false);
                                } else {
                                    dispatch(taskAction.addTask({
                                        id: new Date().getMilliseconds(),
                                        text: inputValue,
                                        completed: false,
                                        important: false,
                                        desc: taskDescription
                                    }))
                                }
                                setInputValue("");
                                setTaskDescription("");
                                setVisible(false);
                            }

                        }
                        }>
                            Submit
                        </Button>
                        {invalidInput && <Text style={{ width: '100%', alignItems: 'center', textAlign: 'center', color: 'red' }}>Enter a value!</Text>}
                    </Modal>
                </Portal>




                <Portal>
                    <Modal visible={taskModalVisible} contentContainerStyle={{ ...containerStyle, height: 'auto' }} onDismiss={() => setTaskModalVisible(false)}>
                        <Text style={{
                            width: '100%',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 10,
                            color: 'black'
                        }}>{tasks[currentTaskIndex]?.text}</Text>
                        <Text style={{ color: 'black' }}>{tasks[currentTaskIndex]?.desc}</Text>
                    </Modal>
                </Portal>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                <TextInput autoCorrect={false} value={search} placeholderTextColor={"gray"} onChangeText={e => setSearch(e)} style={{ padding: 10, borderRadius: 4, borderWidth: 2, borderColor: 'gray', width: '95%', marginTop: 10}} placeholder='Search tasks...'/>
                </View>

                <ScrollView style={styles.tasksContainer}>
                    {tasks.length ?
                        tasks.filter(task => task.text.toLowerCase().includes(search.toLowerCase()) || task.desc.toLowerCase().includes(search.toLowerCase())).map(item => (<View key={item.id} style={{
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

                            <TouchableRipple
                                style={{ marginHorizontal: 10 }}
                                onPress={() => {
                                    setEditing(true);
                                    setInputValue(item.text);
                                    setTaskDescription(item.desc);
                                    setCurrentId(item.id)
                                    showModal();
                                }}
                                rippleColor="#c9c9c951"
                            >
                                <AntDesign name="edit" size={24} color={"white"} />
                            </TouchableRipple>
                        </View>))

                        :
                        <Text style={{ color: mode === "dark" ? "white" : "black"}}>No tasks</Text>
                    }

                </ScrollView>



            </View>

            <Button buttonColor={"#0d78f2"} style={{
                width: 55,
                height: 55,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 10,
                right: 10,
                position: "absolute",
                paddingTop: 0
            }} contentStyle={{marginTop: 5}} compact mode='elevated' textColor={mode === 'light' ? 'white' : 'black'} onPress={showModal}>
                <Ionicons name="add" size={28} color={mode === 'light' ? 'white' : 'black'} />
            </Button>
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