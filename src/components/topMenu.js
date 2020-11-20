import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function MenuTop (props){
    return(
      <SafeAreaView style={estilo.container}>
        <View style={estilo.txtAlin}>

            <Image style={estilo.tinyLogo} 
            source={require('../img/logoApp.png')}
            />

            <Text style={estilo.txtCor}>SGDE</Text>
        </View>
      </SafeAreaView>
    );
  }

const estilo = StyleSheet.create({
    container:{
        backgroundColor:"#FFF",
        justifyContent:"flex-start",
        alignItems:'center',
        height:80,
        elevation:3
    },
    txtAlin:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        marginTop:28
      },
    txtCor:{
        color: "#158CD5",
        fontSize: 30,
        textAlign:"justify",
        fontWeight: "bold",
    },
    tinyLogo: {
      marginRight:10,
      height:42,
      width:36
    },
  })