import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

function BotaoContador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 5) {
      console.log("Contador chegou a cinco cliques!");
    };
  }, [count]);


  return (
    <View style={{ marginTop: 50 }}>
      <Button
        title={`Contar`}
        onPress={() => setCount(count + 1)}
      />

      <Text style ={{textAlign:'center', color:'darkblue', fontSize:20, marginTop:20, fontStyle: 'italic'}}>Contador: { count} </Text>
      <Button 
        title={'Zerar'}
        onPress={() => setCount(0)}
        
      />
    </View> 
  )};
export default BotaoContador;
