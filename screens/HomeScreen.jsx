import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import mainImage from './main.jpg'
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';

function HomeScreen({ navigation }) {
  const navigate = useNavigation()

  const mode = useSelector(state => state.settingsReducer.mode)
  const tasks = useSelector(state => state.taskReducer.tasks)

  let pending = tasks.filter(item => item.completed === false).length;
  let completed = tasks.filter(item => item.completed === true).length
  let important = tasks.filter(item => item.important === true).length
  console.log((important / tasks.length) * 100)
  return (
    <>
      <View style={{ ...styles.container, backgroundColor: mode === 'light' ? '#fff' : '#000' }}>
        <Image style={{ width: '100%', height: '50%' }} source={mainImage} />
        <View style={{ borderRadius: 30, width: '100%', backgroundColor: mode === 'light' ? '#fff' : '#000', marginTop: -30, paddingTop: 30, paddingHorizontal: 10 }}>
          <List.Item
            title="Tasks"
            style={{
              backgroundColor: '#0d78f2',
              marginVertical: 5,
              borderRadius: 10
            }}
            titleStyle={{

              color: 'white'
            }}
            descriptionStyle={{
              color: mode === 'light' ? '#404040' : '#c7c7c7'
            }}
            left={props => <FontAwesome5 name="tasks" size={24}  {...props} color={"white"} />}
            right={props => <AntDesign name="right" {...props} size={20} color={"white"} />}
            onPress={() => navigation.navigate("Tasks")}
          />
          <List.Item
            title="Settings"
            style={{
              backgroundColor: '#5f5f5f',
              marginVertical: 5,
              borderRadius: 10
            }}
            titleStyle={{
              color: 'white'
            }}
            descriptionStyle={{
              color: '#c7c7c7'
            }}
            left={props => <AntDesign name="setting" size={24}  {...props} color={"white"} />}
            right={props => <AntDesign name="right" {...props} size={20} color={"white"} />}
            onPress={() => navigation.navigate("Settings")}
          />

          <View style={{
            width: "100%",
            flexDirection: 'column',
            flexWrap: 'wrap',
            paddingTop: 10,
            alignItems: 'center',
            paddingHorizontal: 70
          }}>
            <Text style={{color: mode === 'light' ? '#000' : '#fff'}}>Total: {tasks.length}</Text>
            <View
              style={{
                backgroundColor: '#0d78f2',
                height: 5,
                width: 200,
                marginTop: 5,
                marginBottom: 10
              }}
            ></View>

            <Text style={{color: mode === 'light' ? '#000' : '#fff'}}>Pending: {pending}</Text>
            <View
              style={{
                backgroundColor: '#de7811',
                height: 5,
                width: ((pending / tasks.length) * 100)*2 || 2,
                marginTop: 5,
                marginBottom: 10
              }}
            ></View>

            <Text style={{color: mode === 'light' ? '#000' : '#fff'}}>Important: {important}</Text>
            <View
              style={{
                backgroundColor: '#ff0400',
                height: 5,
                width: ((important / tasks.length) * 100)*2 || 2,
                marginTop: 5,
                marginBottom: 10
              }}
            ></View>

            <Text style={{color: mode === 'light' ? '#000' : '#fff'}}>Completed: {completed}</Text>
            <View
              style={{
                backgroundColor: '#28a718',
                height: 5,
                width: ((completed / tasks.length) * 100)*2 || 2,
                marginTop: 5
              }}
            ></View>
          </View>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    borderBottomWidth: 1
  }
})

export default HomeScreen