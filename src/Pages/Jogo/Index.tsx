import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Image,Switch } from 'react-native';
import Corpojogador from '../Components/CorpoJogador';
import * as SQLite from 'expo-sqlite';
import { theme } from '../../global/styles/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function Jogo({ navigation, route }) {

  const db = SQLite.openDatabase('jogosd.db');
  const [name, setName] = useState('');
  const [att, setatt] = useState(false);
  const [dados, setDados] = useState([]);

  const [idtimedele, setIdTimedele] = useState('')
  const [timedele, settimedele] = useState('');

  const [dadosJogo, setDadosJogo] = useState([]);
  const [modalView, setModalView] = useState(false);
  const [modalViewConfig, setmodalViewConfig] = useState(false);
  const [modalViewMudar, setmodalViewMudar] = useState(false);
  const [modalViewCriando, setmodalViewCriando] = useState(false);
  const [modalViewDelete, setmodalViewDelete] = useState(false);
  const [modalViewDeleteUser, setmodalViewDeleteUser] = useState(false);

  const [idUserDelete, setIdUserDelete] = useState('');
  const [nameUserDelete, setNameUserDelete] = useState('');

  const iddojogo = route.params?.idjogo;
  const totalCadaTime = route.params?.totalcadatime;
  const totalJogadores = dados.length;

  const [dadosCriarTabela, setDadosCriarTabela] = useState([]);
  const [dadosCriarTabelaT1, setDadosCriarTabelaT1] = useState([]);
  const [dadosCriarTabelaT2, setDadosCriarTabelaT2] = useState([]);

  const [dadosTabelaATT, setdadosTabelaATT] = useState([]);

  const [attValoresJogadores, setattValoresJogadores] = useState('');
  const [attcolete01, setattcolete01] = useState('');
  const [attcolete02, setattcolete02] = useState('');

  const [criandojogo, setCriandoJogo] = useState(false);
  const [erroCampo, seterroCampo] = useState(false);

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
        `select * from user_partida where id_partida = ? and time not in (0, 0)`,
        [iddojogo],
        (_, { rows: { _array } }) => setdadosTabelaATT(_array)
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        `select * from user_partida where id_partida = ? and time not in (0, 0) ORDER BY id DESC LIMIT 1`,
        [iddojogo],
        (_, { rows: { _array } }) => setDadosCriarTabela(_array)
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        `select * from partida where id = ?;`,
        [iddojogo],
        (_, { rows: { _array } }) => setDadosJogo(_array)
      );
    });

  }, [att])

  function Add() {

    if (!name) {
      seterroCampo(true)
    } else {
      seterroCampo(false)

      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS user_partida (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, vazes_total INT, pagamento BOOL, time INT, time_antigo INT, id_partida INT )'
        )
      })


      if(dadosTabelaATT.length < totalCadaTime*2 ){

        if(parseInt(dadosCriarTabela.map(i => i.time).toString() ) % 2 == 0 ){

          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO user_partida (name, vazes_total, pagamento, time, time_antigo, id_partida) VALUES (?, ?, ?, ?, ?, ? ) ',
              [name, 1, false, 1, 0, iddojogo],
              (tx, result) => {
                if (result.rowsAffected > 0) {
                  setatt(!att)
                  setName('')
                } else {
                  alert('erro!!')
                }
              }
            )
          })

        }else{
          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO user_partida (name, vazes_total, pagamento, time, time_antigo, id_partida) VALUES (?, ?, ?, ?, ?, ? ) ',
              [name, 1, false, 2, 0, iddojogo],
              (tx, result) => {
                if (result.rowsAffected > 0) {
                  setatt(!att)
                  setName('')
                } else {
                  alert('erro!!')
                }
              }
            )
          })
        }

      }else{
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO user_partida (name, vazes_total, pagamento, time, time_antigo, id_partida) VALUES (?, ?, ?, ?, ?, ? ) ',
            [name, 0, false, 0, 0, iddojogo],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                setatt(!att)
                setName('')
              } else {
                alert('erro!!')
              }
            }
          )
        })
      }

    }
  }


  function DeletePartida(){
console.log('aqui')
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM user_partida WHERE id_partida=?;",
        [iddojogo],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            db.transaction((tx) => {
              //comando SQL modificável
              tx.executeSql(
                "DELETE FROM partida WHERE id=?;",
                [iddojogo],
                (tx, result) => {
                  if (result.rowsAffected > 0) {
                    setIdUserDelete('');
                    setatt(!att)
                    setmodalViewDeleteUser(false)
                    navigation.navigate('Seus Jogos')
                  } else {
                    alert('erro ao excluir partida - ERRO 002!!')
                  }
                }
              );
            });
          } else {
            alert('erro ao excluir partida - ERRO 002!!')
          }
        }
      );
    });


   
 

}

  function DeleteUser(){

      db.transaction((tx) => {
          //comando SQL modificável
          tx.executeSql(
            "DELETE FROM user_partida WHERE id=?;",
            [idUserDelete],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                setIdUserDelete('');
                setatt(!att)
                setmodalViewDeleteUser(false)
              } else {
                alert('erro ao excluir!!')
              }
            }
          );
        });
   

  }

  function AttNome(){

    db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "UPDATE user_partida SET name=? WHERE id=?; AND id_partida=?",
          [nameUserDelete, idUserDelete],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              setIdUserDelete('');
              setatt(!att)
              setmodalViewMudar(false)
            } else {
              alert('erro ao excluir!!')
            }
          }
        );
      });
}

function AttPartida(){

  db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE partida SET nomeTime01=?, nomeTime01=?, quant_time=? WHERE id=?;",
        [attcolete01, attcolete02,attValoresJogadores,  iddojogo],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            setattValoresJogadores(''),
            setattcolete01(''),
            setattcolete02(''),
            setatt(!att)
            setmodalViewConfig(false)
          } else {
            alert('erro ao excluir!!')
          }
        }
      );
    });


}


function GerarTime(){

 
  setmodalViewCriando(true) 

  function sayHi() {
    setmodalViewCriando(false);
    navigation.navigate('Partida', {idjogo: iddojogo})
  }
  
  let myGreeting = setTimeout(sayHi, 2000);

}
 


  return (
    <View style={{backgroundColor: '#ffff', flex: 1}}>
      <Modal
            visible={modalView}
            animationType="slide"
            transparent
       >
            <View style={{flex: 1, backgroundColor: theme.cores.rgba}}>
        <View style={{flex: 1, marginTop: 80, backgroundColor: theme.cores.branco,}}>
            <View style={{width: 39, height: 2, borderRadius: 2, backgroundColor: theme.cores.segunda, alignSelf: 'center', marginTop: 13,}} />

            {
              criandojogo == true ?
              <View>
                  <View style={{ flexDirection: 'column',alignItems: 'center', marginTop:'50%', alignContent: 'center',}}>
                        <Image
                    style={{width: 200, height: 200}}
                    source={require('../../assets/img/criando.gif')}
                        />
                  <Text style={{color: theme.cores.azulescuro, fontSize:20, fontWeight: 'bold'}}>Criando tabelas ...</Text>
                        
                </View>
              </View>
              :
              <View style={{ marginLeft: 20, marginRight: 20, marginTop: 50, justifyContent: 'flex-start'}}>

               <Text style={{fontWeight: 'bold', color: '#696969', fontSize: 20}}>Confirme os dados antes!</Text>

               <View>
                 <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Cada time vai ter <Text style={{color: 'red'}}>{dadosJogo.map(item => item.quant_time)}</Text> jogadores</Text>

                 <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>O primeiro time vai usar o colete <Text style={{color: 'red'}}>{dadosJogo.map(item => item.nomeTime01)}</Text></Text>

                 <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>O segundo time vai usar o colete <Text style={{color: 'red'}}>{dadosJogo.map(item => item.nomeTime02)}</Text></Text>
               </View>

               <View>
                 {
                   totalJogadores < totalCadaTime * 2 ?
                   <View style={{justifyContent: 'center', alignItems: 'center'}}>
                     <Text style={{fontSize: 12, fontWeight:'bold', color: 'red', marginTop: '25%'}}>Ainda não tem jogadores suficiente para formar time!</Text>
                      <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '25%'}}>
                        
                            <TouchableOpacity onPress={() => {setModalView(false)} } style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                                <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   :
                   <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '50%'}}>
                        <TouchableOpacity onPress={() => setModalView(false)} style={{width: '40%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                            <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setModalView(false), GerarTime()} } style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                            <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Tabelas</Text>
                        </TouchableOpacity>
                   </View>
                 }
               </View>
                   
            </View>
            }

            
        </View>
       </View>

       </Modal>
       <Modal
            visible={modalViewConfig}
            animationType="slide"
            transparent
       >
            <View style={{flex: 1, backgroundColor: theme.cores.rgba}}>
        <View style={{flex: 1, marginTop: 80, backgroundColor: theme.cores.branco,}}>
            <View style={{width: 39, height: 2, borderRadius: 2, backgroundColor: theme.cores.segunda, alignSelf: 'center', marginTop: 13,}} />

            <View style={{justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', marginTop: 20}} >

             <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Quantos jogadorespor time?</Text>
             <TextInput
                placeholderTextColor="#ffff"
                keyboardType="numeric"
                maxLength = {2}
                value={attValoresJogadores}
                onChangeText={ t=> setattValoresJogadores(t)}
                style = {{backgroundColor: '#dcdcdc', width: '20%', borderRadius: 6, paddingHorizontal: 10, height: 34,marginTop: 5,}}
              />
            </View>

            <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10}} >

            <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Cor colete primeiro time?</Text>
             <TextInput
                placeholderTextColor="#ffff"
                value={attcolete01}
                onChangeText={ t=> setattcolete01(t)}
                style = {{backgroundColor: '#dcdcdc', width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 44,marginTop: 5,}}
              />
            </View>

            <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} >

              <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Cor colete segundo time?</Text>
             <TextInput
                placeholderTextColor="#ffff"
                value={attcolete02}
                onChangeText={ t=> setattcolete02(t)}
                style = {{backgroundColor: '#dcdcdc', width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 44,marginTop: 5,}}
              />
            </View>
           
              
          
                 <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '50%'}}>
                        <TouchableOpacity onPress={() => setmodalViewConfig(false)} style={{width: '40%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                            <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {AttPartida() } } style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                            <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Atualizar</Text>
                        </TouchableOpacity>
                        
                   </View>
            
        </View>
       </View>

       </Modal>
       <Modal
            visible={modalViewMudar}
            animationType="slide"
            transparent
       >
            <View style={{flex: 1, backgroundColor: theme.cores.rgba}}>
        <View style={{flex: 1, marginTop: 80, backgroundColor: theme.cores.branco,}}>
            <View style={{width: 39, height: 2, borderRadius: 2, backgroundColor: theme.cores.segunda, alignSelf: 'center', marginTop: 13,}} />

            <View style={{justifyContent: 'center', flexDirection: 'column', marginTop: '20%', alignItems: 'center'}} >

            <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Atualizar nome do jogador</Text>
             <TextInput
                placeholder={'Nome'}
                maxLength = {20}
                value={nameUserDelete}
                onChangeText={ t=> setNameUserDelete(t)}
                style = {{backgroundColor: '#dcdcdc', width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 44,marginTop: 5,}}
              />
            </View>
           
              
          
                 <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '50%'}}>
                        <TouchableOpacity onPress={() => setmodalViewMudar(false)} style={{width: '30%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => AttNome() } style={{width: '30%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Atualizar</Text>
                        </TouchableOpacity>
                   </View>
            
        </View>
       </View>

       </Modal>
       <Modal
            visible={modalViewDelete}
            animationType="slide"
            transparent
       >
  <View style={{flex: 1, backgroundColor: theme.cores.rgba, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ height: '40%', width: '80%', backgroundColor: theme.cores.branco, borderRadius:30, alignItems: 'center'}}>
                <Image
                style={{width: 150, height: 150}}
                source={require('../../assets/img/delete.gif')}
                    />

            <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Deseja realmente excluir essa partida? </Text>
         
           <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '25%'}}>
                  <TouchableOpacity onPress={() => DeletePartida()} style={{width: '40%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                      <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {setmodalViewDelete(false) } } style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                      <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Não</Text>
                  </TouchableOpacity>
            </View>
            
        </View>
</View>

       </Modal>  
       <Modal
            visible={modalViewDeleteUser}
            animationType="slide"
            transparent
       >
  <View style={{flex: 1, backgroundColor: theme.cores.rgba, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ height: '40%', width: '80%', backgroundColor: theme.cores.branco, borderRadius:30, alignItems: 'center'}}>
                <Image
                style={{width: 150, height: 150}}
                source={require('../../assets/img/delete.gif')}
                    />

            <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Deseja realmente excluir<Text style={{color: 'red'}}> {nameUserDelete} </Text>?</Text>
         
           <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '25%'}}>
                  <TouchableOpacity onPress={() => DeleteUser()} style={{width: '40%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                      <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {setmodalViewDeleteUser(false) } } style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                      <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Não</Text>
                  </TouchableOpacity>
            </View>
            
        </View>
</View>

       </Modal> 
       <Modal
            visible={modalViewCriando}
            animationType="slide"
            transparent
       >
            <View style={{flex: 1, backgroundColor: theme.cores.rgba}}>
        <View style={{flex: 1, marginTop: 80, backgroundColor: theme.cores.branco,}}>
            <View style={{width: 39, height: 2, borderRadius: 2, backgroundColor: theme.cores.segunda, alignSelf: 'center', marginTop: 13,}} />

           
              <View>
                  <View style={{ flexDirection: 'column',alignItems: 'center', marginTop:'50%', alignContent: 'center',}}>
                        <Image
                    style={{width: 200, height: 200}}
                    source={require('../../assets/img/criando.gif')}
                        />
                  <Text style={{color: theme.cores.azulescuro, fontSize:20, fontWeight: 'bold'}}>Verificando tabelas ...</Text>
                        
                </View>
              </View>
              
           

            
        </View>
       </View>

       </Modal>
      
       <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: 10 , marginTop: '2%'}}>
         <TouchableOpacity onPress={() => setmodalViewDelete(true)} style={{}}>
          <MaterialIcons name="delete" size={30} color='#F08080' />
         </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: theme.cores.azulescuro, padding: 5, borderRadius: 6, alignItems: 'center', width: '50%'}} onPress={() => setModalView(true)} >
            <Text style={{color: theme.cores.branco, fontSize: 15, fontWeight:'bold',}}> Tebela de Time </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setattValoresJogadores(dadosJogo.map( t => t.quant_time).toString()),
            setattcolete01(dadosJogo.map( t => t.nomeTime01).toString()),
            setattcolete02(dadosJogo.map( t => t.nomeTime02).toString()),
            setmodalViewConfig(true)
            }} style={{}}>
          <MaterialIcons name="settings" size={30} color={theme.cores.azulescuro} />
         </TouchableOpacity>

      </View>


      <View style={{width: '70%', height: 2, borderRadius: 1, backgroundColor:'#dcdcdc', alignSelf: 'center', marginTop: 13,}} />
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>

      { erroCampo == true?  
        <TextInput 
        placeholder={'Atenção! Nome jogador'}
        maxLength = {20}
        value={name}
        onChangeText={ t=> setName(t)}
        style = {{backgroundColor: '#dcdcdc', width: '80%', paddingLeft: 5, borderRadius: 6, borderWidth: 2, borderColor: 'red', }}
        />
      : 
        <TextInput 
        placeholder={'Nome jogador'}
        maxLength = {20}
        value={name}
        onChangeText={ t=> setName(t)}
        style = {{backgroundColor: '#dcdcdc', width: '80%', paddingLeft: 5, borderRadius: 6, borderWidth: 1, borderColor: '#dcdcdc', }}
        />
      }

      
        

        <TouchableOpacity style={{backgroundColor: '#008080', padding: 10, borderRadius: 6}} onPress={() => Add()}>
            <MaterialIcons name="add" size={24} color="#ffff" />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text style={{fontWeight: 'bold', fontSize: 15, color: '#696969', marginRight: 20}}>{totalJogadores} jogadores</Text>
      </View>
      


<View style={{height: '80%'}}>
      <FlatList

        data={dados}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => { setIdUserDelete(item.id), setNameUserDelete(item.name),setmodalViewMudar(true)}} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginLeft: 20, marginRight: 20 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent:'space-between', backgroundColor: theme.cores.azulclaro, borderRadius: 6, padding: 10  }}>
             
              <View style={{ width: '33%',  flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center' }}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>
                <MaterialIcons name="edit" size={12} color="#696969" /> {item.name}</Text>
              </View>

              <View style={{ width: '33%', alignItems: 'flex-end'}}> 
              <TouchableOpacity  onPress={() =>{ setIdUserDelete(item.id), setNameUserDelete(item.name), setmodalViewDeleteUser(true) } } style={{marginRight:10}}>
                  <MaterialIcons name="delete" size={24} color='red' />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
</View>

    </View>
  );
}