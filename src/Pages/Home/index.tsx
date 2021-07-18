import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, CheckBox, Modal} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { theme } from '../../global/styles/theme';
import Corpojogo from '../Components/CorpoJogo';

export default function Home({navigation}) {

    const db = SQLite.openDatabase('jogosd.db');
    const [name, setName] = useState(new Date().getDate());
    const [dados, setDados] = useState([]);
    const [att, setatt] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [erroCampo, seterroCampo] = useState(false);
    const [nometime01, setnometime01] = useState('Verde');
    const [nometime02, setnometime02] = useState('Vermelho');

    const [nuberJogadoresTime, setnuberJogadoresTime] = useState('');
    const [modalView, setModalView] = useState(false);
    
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
  
        
       const  finaldata =  date + '/' + month + '/' + year;
  


useEffect(() => {
    db.transaction(tx => {
        tx.executeSql(
          `select * from partida where controle = ?;`,
          ['dussports'],
          (_, { rows: { _array } }) => setDados(_array)
        );
      });
}, [att, dados])


    function register(){

        if(nuberJogadoresTime == ''){
            
            seterroCampo(true)
        }else{
        seterroCampo(false)

        db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS partida (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, data VARCHAR(40), tempo INT,  nomeTime01 TEXT, nomeTime02 TEXT, quant_time INT, total_jogos INT, id_grupo INT, controle TEXT)'
            )
          })

        setModalView(false);

        if(isSelected != true){

            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO partida (name, data, nomeTime01, nomeTime02, quant_time, total_jogos, controle ) VALUES (?, ?, ?, ? ,? , ?, ?) ',
                    [name, finaldata, 'Time 01', 'Time 02', nuberJogadoresTime, 1 , 'dussports'],
                    (tx, result) => {
                        if(result.rowsAffected > 0){
                            setatt(!att)
                        }else{
                            alert('erro!!')
                        }
                    }
                )
            })

        }else{
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO partida (name, data, nomeTime01, nomeTime02, quant_time, total_jogos, controle ) VALUES (?, ?, ?, ? ,? , ?, ?) ',
                    [name, finaldata, nometime01, nometime02, nuberJogadoresTime, 0 , 'dussports'],
                    (tx, result) => {
                        if(result.rowsAffected > 0){
                            setatt(!att)
                        }else{
                            alert('erro!!')
                        }
                    }
                )
            })

        }

        }

    }

    function AbrirRegister(){
        setModalView(true);
    }

 return (
   <View style={{flex: 1, backgroundColor: '#fffff', }}>


       <Modal
            visible={modalView}
            animationType="slide"
            transparent
       >
            <View style={{flex: 1, backgroundColor: theme.cores.rgba}}>
        <View style={{flex: 1, marginTop: 80, backgroundColor: theme.cores.branco,}}>
            <View style={{width: 39, height: 2, borderRadius: 2, backgroundColor: theme.cores.segunda, alignSelf: 'center', marginTop: 13,}} />

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 50, justifyContent: 'flex-start'}}>

                <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Quantos jogadores por time? </Text>

                    { erroCampo == true?  
                        <TextInput 
                        placeholder={'00'}
                        keyboardType="numeric"
                        maxLength = {2}
                        value={nuberJogadoresTime}
                        onChangeText={ t=> setnuberJogadoresTime(t)}
                        style = {{backgroundColor: '#dcdcdc',width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 34,marginTop: 5, borderWidth: 2, borderColor: 'red', }}
                        />
                    : 
                        <TextInput 
                        placeholder={'00'}
                        keyboardType="numeric"
                        maxLength = {2}
                        value={nuberJogadoresTime}
                        onChangeText={ t=> setnuberJogadoresTime(t)}
                        style = {{backgroundColor: '#dcdcdc',width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 34,marginTop: 5, borderWidth: 1, borderColor: '#dcdcdc', }}
                        />
                    }
                </View>

                <View style={{flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: theme.cores.azulescuro}}>Tem colete/uniforme para os time? </Text>
                    
                    
                </View>

                <View style={{marginTop: '5%'}}>
                    {
                        isSelected == true ?
                        <View style={{backgroundColor: '#696969', padding: 10, borderRadius: 6}}>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center'}}>
                            <Text style={{color:'#ffff', fontSize: 15, fontWeight: 'bold'}}>Cor do colete primeiro time:  </Text>
                            <TextInput 
                                placeholder={'Verde'}
                                maxLength = {20}
                                value={nometime01}
                                onChangeText={ t=> setnometime01(t)}
                                style = {{backgroundColor: '#ffff', width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 44,marginTop: 5,}}
                            />
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center'}}>
                            <Text style={{color:'#ffff', fontSize: 15, fontWeight: 'bold'}}>Cor do colete segundo time:  </Text>
                            <TextInput 
                                placeholder={'Vermelho'}
                                maxLength = {20}
                                value={nometime02}
                                onChangeText={ t=> setnometime02(t)}
                                style = {{backgroundColor: '#ffff', width: '40%', borderRadius: 6, paddingHorizontal: 10, height: 44,marginTop: 5,}}
                            />
                        </View>

                        </View>
                        :
                        <View style={{backgroundColor: '#696969', padding: 10, borderRadius: 6}}>
                            <Text style={{color:'#ffff', fontSize: 15, fontWeight: 'bold'}}>Por padrão, os times são nomeados como:  Time 01 e Time 02</Text>
                        </View>
                    }

                <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', marginTop: '50%'}}>
                    <TouchableOpacity onPress={() => {setModalView(false), seterroCampo(false)}} style={{width: '40%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                        <Text style={{color: theme.cores.azulescuro, fontWeight: 'bold', fontSize: 16}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => register()} style={{width: '40%', backgroundColor: theme.cores.azulescuro, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center',shadowColor: theme.cores.azulescuro,}}>
                        <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 16}}>Criar Jogo</Text>
                    </TouchableOpacity>
                </View>

                </View>

                   
            </View>
        </View>
       </View>

       </Modal>


    <View   style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%'}}>
            <TouchableOpacity onPress={() => AbrirRegister()}   style={{backgroundColor: theme.cores.azulescuro, padding: 10, borderRadius: 6, width: '45%',alignItems:'center'}}>
            <Text style={{color: theme.cores.branco, fontSize: 15, fontWeight:'bold'}}>Criar Jogo</Text>
            </TouchableOpacity>
    </View>
       

  <View style={{marginTop: 10}}>

    <FlatList
    
        data={dados}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -10}}>
                 <TouchableOpacity style={{padding:10, width: '100%'}} onPress={() => navigation.navigate('Jogo', {idjogo: item.id, totalcadatime:  item.quant_time})}>
                   <Corpojogo name={item.data} grupo='01' />
                </TouchableOpacity>
            </View>
        ) }
    />
  </View>     


   </View>
  );
}