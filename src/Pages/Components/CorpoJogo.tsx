import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

export default function Corpojogo( props, {navigation}) {
 return (
   <View style={{backgroundColor: theme.cores.azulclaro, borderRadius: 6, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color:theme.cores.azulescuro}}> Jogo dia {props.name}</Text>
          </View>
          <View>
              {
                  props.grupo == '' ?
                    <MaterialIcons name="accessibility-new" size={24} color={theme.cores.azulescuro} />
                  :
                    <MaterialIcons name = "groups" size = {24} color = {theme.cores.azulescuro} />
              }
              
              
          </View>
   </View>
  );
}