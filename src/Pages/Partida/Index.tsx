import React, {useEffect, useState} from 'react';
import { View , Text, ScrollView, TouchableOpacity, Image, FlatList, Modal} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Cron from './cron';
import * as SQLite from 'expo-sqlite';
import { theme } from '../../global/styles/theme';

export default function Partida({route}) {

const db = SQLite.openDatabase('jogosd.db');
const iddojogo = route.params?.idjogo;
const [dados, setDados] = useState([]);
const [dadosPartida, setdadosPartida] = useState([]);
const [att, setatt] = useState(false);

const [primeiro, setPrimeiro] = useState([]);
const [segundo, setSegundo] = useState([]);
const [proximo, setProximo] = useState([]);

const [modalView, setModalView] = useState(false);

var min= Math.floor((Math.random() * 10 ) + 1);

console.log(min)

const vezesjogada = 4;

const resposta = [
  { id: 42, name: 'Italo', vezes: 1,},
  { id: 412, name: 'Ana', vezes: 2,},
  { id: 422, name: 'Gomes', vezes: 3,},
  { id: 432, name: 'Cleiton', vezes: 4,},
  { id: 442, name: 'Navas', vezes: 1,}
]

useEffect(() => {

  db.transaction(tx => {
    tx.executeSql(
      `select * from user_partida where id_partida = ?;`,
      [iddojogo],
      (_, { rows: { _array } }) => setDados(_array)
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `select * from partida where id = ?;`,
      [iddojogo],
      (_, { rows: { _array } }) => setdadosPartida(_array)
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `select * from user_partida where time = ?;`,
      [1],
      (_, { rows: { _array } }) => setPrimeiro(_array)
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `select * from user_partida where time = ?;`,
      [2],
      (_, { rows: { _array } }) => setSegundo(_array)
    );
  });


}, [att])

 return (
   <View style={{flex:1, backgroundColor: '#ffff'}}>
          <Modal
            visible={modalView}
            animationType="slide"
            transparent
       >
             <View style={{flex: 1, backgroundColor: theme.cores.rgba, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ height: '40%', width: '80%', backgroundColor: theme.cores.branco, borderRadius:30, alignItems: 'center'}}>
                <Image
                style={{width: 150, height: 150}}
                source={require('../../assets/img/up.gif')}
                    />

            <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>O time <Text style={{color: 'red'}}> {dadosPartida.map(t => t.nomeTime01)} </Text> perdeu?</Text>
         
           <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '25%'}}>
                  <TouchableOpacity style={{width: '40%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                      <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalView(false)  } style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                      <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Não</Text>
                  </TouchableOpacity>
            </View>
            
        </View>
</View>

       </Modal>
    
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
    <Text style={{fontWeight: 'bold', color: theme.cores.azulescuro, fontSize: 17,}}>{dadosPartida.map(t => t.nomeTime01)}</Text>
    <Text style={{fontWeight: 'bold', color: theme.cores.azulescuro, fontSize: 17,}}>{dadosPartida.map(t => t.nomeTime02)}</Text>
    </View>

       <View style={{flexDirection:'row', justifyContent: 'center', padding: 10, height: '25%'}}>
          <View style={{width: '42%', backgroundColor: '#2E8B57', flexDirection: 'column', justifyContent: 'center'}} >
              <View style={{ flexDirection:'column', justifyContent: 'center', }}>
                 <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={{color:'white', fontWeight: 'bold', fontSize: 17}}>1°</Text>
                 </View>
              <FlatList
                data={resposta}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginLeft: 20, marginRight: 20, }}>
                  <Text style={{color: '#fff',fontWeight:'bold',}}>{item.name}  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                      <Text style={{color: '#dcdcdc',fontWeight:'bold',}}>{item.vezes}</Text>
                      <MaterialIcons name="rotate-right" size={14} color="#dcdcdc" />
                  </View>
                  
                  </TouchableOpacity>
                )}
                />
              </View>
              
          </View>

          <View style={{backgroundColor: "#2E8B57", width: '16%', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            
          <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../assets/img/campo_jogo.png')}
                    />
          </View>

          <View style={{width: '42%', backgroundColor: '#2E8B57', flexDirection: 'column', justifyContent: 'center'}}>
              
                 <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{color:'white', fontWeight: 'bold', fontSize: 17}}>2°</Text>
                 </View>
            <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'center', }}>
                
              <FlatList
                data={resposta}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginLeft: 20, marginRight: 20, }}>
                  <Text style={{color: '#fff',fontWeight:'bold',}}>{item.name}  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                      <Text style={{color: '#dcdcdc',fontWeight:'bold',}}>{item.vezes}</Text>
                      <MaterialIcons name="rotate-right" size={14} color="#dcdcdc" />
                  </View>
                  
                  </TouchableOpacity>
                )}
                />
              </View>
          </View>

       </View>


       <View style={{flexDirection:'row', justifyContent: 'space-evenly', padding: 10}}>
          <TouchableOpacity onPress={() => setModalView(true)  }   style={{backgroundColor: theme.cores.branco, padding: 10, borderRadius: 6,width: '37%',alignItems:'center', borderWidth:1, borderColor: theme.cores.azulescuro}}>
                <Text style={{color: theme.cores.azulescuro, fontSize: 12, fontWeight:'bold'}}>{dadosPartida.map(t => t.nomeTime01)} Perdeu</Text>
            </TouchableOpacity>

            <TouchableOpacity    style={{backgroundColor: '#d8d8d8', padding: 10, borderRadius: 6,width: '20%',alignItems:'center'}}>
                <Text style={{color: "#696969", fontSize: 12, fontWeight:'bold'}}>Empate</Text>
            </TouchableOpacity>

            <TouchableOpacity    style={{backgroundColor: theme.cores.branco, padding: 10, borderRadius: 6,width: '37%',alignItems:'center', borderWidth:1, borderColor: theme.cores.azulescuro}}>
                <Text style={{color: theme.cores.azulescuro, fontSize: 12, fontWeight:'bold'}}>{dadosPartida.map(t => t.nomeTime02)} Perdeu</Text>
            </TouchableOpacity>
       </View>

<View style={{marginRight: 10, marginLeft: 10, flex: 1}}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text style={{color: '#696969', fontWeight: 'bold', fontSize: 12}}>Porcentagem dos {vezesjogada} jogos:</Text>
        <Text style={{color: '#F08080', fontWeight: 'bold', fontSize: 12}}>-25%</Text>
        <Text style={{color: '#B0E0E6', fontWeight: 'bold', fontSize: 12}}>-50%</Text>
        <Text style={{color: '#3CB371', fontWeight: 'bold', fontSize: 12}}>+50%</Text>
      </View>
      <View style={{width: '20%', height: 1, borderRadius: 1, backgroundColor: '#dcdcdc', alignSelf: 'center', marginTop: 13,}} />

       <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={{fontWeight: 'bold', color: '#696969'}}>Próximos</Text>
       </View>
       <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
       <FlatList
                data={resposta}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                  <TouchableOpacity style={{ marginTop: 5, marginLeft: 20, marginRight: 20,  backgroundColor:item.vezes <= vezesjogada/4 ? '#F08080' : item.vezes <= vezesjogada/2 ? '#B0E0E6' : '#3CB371' , padding: 10, borderRadius: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}} >
                    <View>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',}}>
                      <Text>{item.vezes}</Text>
                      <MaterialIcons name="rotate-right" size={14} color="black" />
                    </View>
                  </View>
                  </TouchableOpacity>
                )}
                />
            
       </View>

       <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={{fontWeight: 'bold', color: '#696969'}}>Restantes</Text>
       </View>
       <View style={{height: 100, flexDirection: 'row', justifyContent: 'center'}}>
           <FlatList
                data={resposta}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                  <TouchableOpacity style={{ marginTop: 5, marginLeft: 20, marginRight: 20,  backgroundColor:item.vezes <= vezesjogada/4 ? '#F08080' : item.vezes <= vezesjogada/2 ? '#dcdcdc' : '#3CB371' , padding: 10, borderRadius: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}} >
                    <View>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',}}>
                      <Text>{item.vezes}</Text>
                      <MaterialIcons name="rotate-right" size={14} color="black" />
                    </View>
                  </View>
                  </TouchableOpacity>
                )}
                />
       </View>
</View>
   </View>
  );
}