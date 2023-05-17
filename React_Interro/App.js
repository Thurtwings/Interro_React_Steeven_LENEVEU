import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import Backoffice from './screens/Backoffice';
import ScoreScreen from './screens/ScoreScreen';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function App() {


  return(


        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Quiz" component={QuizScreen}/>
            <Stack.Screen name="Score" component={ScoreScreen}/>
            <Stack.Screen name="Back" component={Backoffice}/>
          </Stack.Navigator>
        </NavigationContainer> 




  );

}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    flex: 1,
    alignItems: "center",
  }
});
