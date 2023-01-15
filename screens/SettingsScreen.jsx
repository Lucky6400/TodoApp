import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { taskAction } from '../redux/taskSlice';
import { settingsAction } from '../redux/settingsSlice';

function SettingsScreen() {
  const [expanded, setExpanded] = React.useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(mode !== 'light');
  const tasks = useSelector(state => state.taskReducer.tasks)
  const mode = useSelector(state => state.settingsReducer.mode)
  console.log(tasks)
  const dispatch = useDispatch();
  const onToggleSwitch = () => {
    if(isSwitchOn){
      setIsSwitchOn(false);
      dispatch(settingsAction.toggleMode('light'))
    } else {
      setIsSwitchOn(true)
      dispatch(settingsAction.toggleMode('dark'))
    }

  };
  const handlePress = () => setExpanded(!expanded);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  useEffect(() => {
    if(mode === 'dark') {
      setIsSwitchOn(true)
    } else {
      setIsSwitchOn(false)
    }
  }, [])
  return (
    <Provider>
      <View style={{
        backgroundColor: mode === 'light' ? '#fff' : '#000',
        flex: 1
      }}>
        <List.Section>
          <List.Subheader
            style={{
              color: mode === 'light' ? '#404040' : '#c7c7c7'
            }}
          >Theme</List.Subheader>
          <List.Item title="Dark Theme"
            titleStyle={{
              color:  mode === 'light' ? 'black' : 'white'
            }}
            descriptionStyle={{
              color:  mode === 'light' ? '#404040' : '#c7c7c7'
            }}
            left={() => <MaterialCommunityIcons name="theme-light-dark" size={40} color={mode === 'light' ? "black" : "white"} />}
            description="Enable/disable dark theme"
            right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
          />
          <List.Item
            onPress={showDialog}
            titleStyle={{
              color:  mode === 'light' ? 'black' : 'white'
            }}
            descriptionStyle={{
              color:  mode === 'light' ? '#404040' : '#c7c7c7'
            }}
            title="Reset data" left={() => <MaterialCommunityIcons name="lock-reset" size={40} color={mode === 'light' ? "black" : "white"} />}
            description="Remove all your tasks and start from beginning"
          />
        </List.Section>
        <Portal>
          <Dialog style={{backgroundColor: 'white'}} visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Warning <Ionicons name="warning" size={24} color="red" /></Dialog.Title>
            <Dialog.Content>
              <Paragraph>This will delete all your tasks and you will never be able to get them back. Are you sure you want to continue?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button textColor='black' onPress={hideDialog}>Cancel</Button>
              <Button textColor='black' onPress={() => {
                dispatch(taskAction.resetData());
                hideDialog();
              }}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  )
}

export default SettingsScreen