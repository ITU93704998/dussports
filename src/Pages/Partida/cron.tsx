import React, {useState, useEffect} from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { Audio } from 'expo-av';
export default function Crono(){

  const vminto = 5
  const inicio = 0

  const [timerCount, setTimer] = useState(inicio)
  const [timerPause, settimerPause] = useState(0)
  const [comecou, setComecou] = useState(false)
  const [fpause, setFPause] = useState(false);
  const [sound, setSound] = useState();

  const soundObject = new Audio.Sound();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/apito/apito.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  

  if(timerCount == 0){
    if(comecou != false){
      if(fpause != true){
        playSound();
      }
      
    }
    
  }

  function Pauser(){
    setFPause(true)
    settimerPause(timerCount)
  }

  function Iniciar(){
    setComecou(true)
    setFPause(false)
    setTimer(vminto)
    
  }

  function Retomar(){
    setTimer(timerPause)
    setFPause(false)
  }

  function Recomecar(){
    setTimer(vminto)
    setComecou(false)
    setFPause(false)
  }

    useEffect(() => {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval)
            return lastTimerCount - 1
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval)
    }, [fpause, timerCount, timerPause, comecou, vminto]);
  



  return(
        <View style={{}}>
            <View>
                { 
                  comecou === false ?
                    <Text>Essa partida vai ter {vminto/60} minutos</Text>
                  :
                  fpause === true ?
                    <Text style={{fontSize: 20, color:  'red'}}>Jogo pausado:  {timerPause} segundos</Text>
                  :
                    <Text> Faltam {timerCount} segundos</Text>
                }
            </View>

            <View>

            
            {   

                comecou == false ?
                <TouchableOpacity onPress={Iniciar} >
                <Text>Iniciar Jogo</Text>
                </TouchableOpacity>
                :
                  fpause == false ?
                  <View>
                    <TouchableOpacity onPress={Pauser} >
                    <Text>Pausar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Recomecar}>
                    <Text>Recomeçar</Text>
                    </TouchableOpacity>
                  </View>
                  : 
                  <View>
                    <TouchableOpacity onPress={Retomar}>
                      <Text>Retomar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={Recomecar}>
                    <Text>Recomeçar</Text>
                    </TouchableOpacity>

                  </View>
            }
                
           </View>

           <View>
                
           </View>
                
            
          </View>
  )
}