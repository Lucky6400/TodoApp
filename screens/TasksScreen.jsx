import React, { useEffect } from 'react'
import { View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomNavigation, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AllTasks from '../TaskScreenRoutes/AllTasks';
import Pending from '../TaskScreenRoutes/Pending';
import Completed from '../TaskScreenRoutes/Completed';
import Important from '../TaskScreenRoutes/Important';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../redux/taskSlice';
import {
    MD3LightTheme as DefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';


function TasksScreen() {
    const mode = useSelector(state => state.settingsReducer.mode)
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'music', title: <Text style={{ color: mode === 'light' ? "#000" : "#fff" }}>All</Text>, focusedIcon: () => <FontAwesome name="tasks" size={24} color={mode === 'light' ? "black" : "white"} /> },
        { key: 'albums', title: <Text style={{ color: mode === 'light' ? "black" : "white" }}>Pending</Text>, focusedIcon: () => <MaterialIcons name="pending-actions" size={24} color={mode === 'light' ? "black" : "white"} /> },
        { key: 'recents', title: <Text style={{ color: mode === 'light' ? "black" : "white" }}>Completed</Text>, focusedIcon: () => <Ionicons name="checkmark-done" size={24} color={mode === 'light' ? "black" : "white"} /> },
        { key: 'notifications', title: <Text style={{ color: mode === 'light' ? "black" : "white" }}>Important</Text>, focusedIcon: () => <FontAwesome name="exclamation-circle" size={24} color={mode === 'light' ? "black" : "white"} /> },
    ]);
    
    const renderScene = BottomNavigation.SceneMap({
        music: AllTasks,
        albums: Pending,
        recents: Completed,
        notifications: Important,
    });

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#a1a1a1',
            secondary: '#0f4ff1',
            tertiary: '#a1b2c3',
        }, // Copy it from the color codes scheme and then use it here
    };
    return (
        <PaperProvider theme={theme}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                activeColor={mode === 'light' ? "#000" : "#fff"}
                labeled
                barStyle={{
                    backgroundColor: mode === 'light' ? '#fff' : '#000',
                    borderTopColor: '#707070',
                    borderTopWidth: 1,
                    color: 'white'
                }}
                theme={{
                    colors: {
                        secondaryContainer: 'transparent',
                    }
                }}
                sceneAnimationType="shifting"
                shifting
            />
        </PaperProvider>
    )
}

export default TasksScreen