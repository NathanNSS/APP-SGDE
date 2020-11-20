import React,{useState,useEffect} from 'react';
import { View, SafeAreaView, Text, FlatList, RefreshControl, TouchableOpacity, StyleSheet, BackHandler, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config.json';

export default function telasPrincipais ({navigation}){
  const [funcionario, setFuncionario] = useState(null)
  const [idEmpresa, setIdEmpresa] = useState(null)
  const [listaOper, setListaOper] = useState([]);
  const [atualizar, setAtualizar] = useState(false);

  useEffect(()=>{
    async function getFuncionario(){
    let response = await AsyncStorage.getItem('dadosUsuario');
    let json = JSON.parse(response);
    
    setFuncionario(json.nome);
    }
    getFuncionario()
  },[])

  useEffect(()=>{
    sendBusca();
  },[]);

  const aoAtualizar=()=>{
    setAtualizar(true);
    sendBusca()
    
}
//Busca Produtos
async function sendBusca(){

  let response = await fetch(config.urlRoot+'buscaOperacao',{
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idEmpresa : idEmpresa
      })
    });
    let json = await response.json();
      if(json === ''){
          console.log('error')
          await AsyncStorage.clear();
      }else{
          await AsyncStorage.setItem('dadosOperacao', JSON.stringify(json))
          let dadosOper = await AsyncStorage.getItem('dadosOperacao');

          let oper = await JSON.parse(dadosOper);
          setListaOper(oper);
          //console.log("Operação Storage",listaOper)
          //console.log("Operação Lista",listaOper)
      }

    setTimeout(()=>{setAtualizar(false)},1000);
}
  

    return(
      <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center"}}
      >
        <Text> Tela Inicial </Text>
        <Text> Bem Vindo {funcionario} </Text>
        
        <FlatList refreshControl={
        <RefreshControl refreshing={atualizar} onRefresh={aoAtualizar}/>
        } 
          // marginHorizontal={10}
          showsVerticalScrollIndicator={false}
          data={listaOper}
          keyExtractor={(item) => String(item.id)  }
          renderItem={({item}) => {
            return(
              <View style={estiloFeed.container}>
                <Text style={estiloFeed.txt}>Nome: {item.nomeProduto}</Text>
                <Text style={estiloFeed.txt}>Quantidade:{item.quantidade}</Text>
                <Text style={estiloFeed.txt}>R$ {item.valor}</Text>
                <Text style={estiloFeed.txt}>Funcionario: {item.idFuncionario}</Text>
                {/* <Text style={estiloFeed.txt}> {item.dataHora}</Text> */}
              </View>
            )
        }}/>        
      </SafeAreaView>
    );
  }

  const estiloFeed = StyleSheet.create({
    container:{
      height:180,
      width:300,
      backgroundColor:"#ffffff",
      borderWidth:1,
      borderRadius:8,
      borderColor:"#66bcf5e0",
      marginTop:20,
      marginBottom:20,
      padding:10,
      elevation:2
    },
    txt:{
      fontSize:16,
      backgroundColor:"#edededb0",
      borderRadius:5,
      marginVertical: 4,
      width: '100%',
      padding:5
    }
  })
  //Empedi que o usuario volte com btn voltar
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Atenção !", "Você Tem Certeza que quer Sair ?", [
  //       {
  //         text: "Cancelar",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "Sair", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);
