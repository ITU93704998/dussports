import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Corpojogador(props) {
 return (
   <View style={{backgroundColor: '#00D0D6', borderRadius: 6, padding: 2}}>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color:'#fff'}}>{props.name}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                <Text>{props.vezes}</Text>
            </View>
            
        </View>

        <View style={{ borderBottomColor: '#dcdcdc',borderBottomWidth: 1,}}/>

        <View>
            <Text style={{fontSize: 14}}>{props.pagamento}</Text>
        </View>
   </View>
  );
}