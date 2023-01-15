import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, TouchableRipple, Portal, Modal } from 'react-native-paper'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../redux/taskSlice';

const Completed = () => {
  const tasks = useSelector(state => state.taskReducer.tasks)

  const [taskModalVisible, setTaskModalVisible] = React.useState(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };
  const [currentId, setCurrentId] = useState(null);
  const currentTaskIndex = tasks.findIndex(t => t.id === currentId);
  const dispatch = useDispatch();

  const mode = useSelector(state => state.settingsReducer.mode)
  return (
    <View style={{
      backgroundColor: mode === 'light' ? '#fff' : '#000',
      flex: 1
    }}>
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
        {tasks.filter(task => task.completed === true).length ?
          tasks.filter(task => task.completed === true).map(item => (<View key={item.id} style={{
            ...styles.cardContainer,
            backgroundColor: item.completed === true ? "#178917" : '#0d78f2',
            borderWidth: mode === 'light' ? 1 : 0,
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
              <Ionicons name="checkmark-done-circle-outline" size={24} color={item.completed === true ? "green" : "white"} />
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
          <Text style={{ color: mode === 'light' ? "black" : "white" }}>You haven't completed any tasks yet.</Text>
        }

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  addButton: {
    justifyContent: 'center',
    width: '18%',
    borderRadius: 5,
    marginTop: 5,
    padding: 4
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
    elevation: 10,
    shadowColor: '#303030',
    backgroundColor: 'white',
    marginVertical: 5,
    borderColor: '#cfcfcf',
    borderWidth: 1,
    position: 'relative'
  }
})
export default Completed