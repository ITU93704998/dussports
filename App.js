import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Home from './src/Pages/Home/index';
import Jogo from './src/Pages/Jogo/Index';
import Config from './src/Pages/Config/Index';
import Partida from './src/Pages/Partida/Index';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
       />
      <Stack.Navigator>
        <Stack.Screen name="Seus Jogos" component={Home} options={{
          title: "Seus Jogos",
          backgroundColor: '#ffff',
          headerTransparent: true,
          
       }} />

        <Stack.Screen name="Jogo" component={Jogo} options={{
          title: "Jogos",
          backgroundColor: '#ffff',
          headerTransparent: false,
          
       }}/>

        <Stack.Screen name="Partida" component={Partida}ptions={{
          title: "Partida",
          backgroundColor: '#ffff',
          headerTransparent: false,
          
       }} />

        <Stack.Screen name="Confi" component={Config} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}