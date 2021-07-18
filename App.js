import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Home from './src/Pages/Home/index';
import Jogo from './src/Pages/Jogo/Index';
import Config from './src/Pages/Config/Index';
import Partida from './src/Pages/Partida/Index';
import { theme } from './src/global/styles/theme';
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
        style="light"
       />
      <Stack.Navigator>
        <Stack.Screen name="Seus Jogos" component={Home}  options={{
          title: 'Seus Jogos',
          headerStyle: {
            backgroundColor: theme.cores.azulescuro,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },  
       }} />

        <Stack.Screen name="Jogo" component={Jogo} options={{
          title: 'Partida',
          headerStyle: {
            backgroundColor: theme.cores.azulescuro,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },  
       }}/>

        <Stack.Screen name="Partida" component={Partida} options={{
          title: 'Tabela',
          headerStyle: {
            backgroundColor: theme.cores.azulescuro,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
       }} />

        <Stack.Screen name="Confi" component={Config} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}