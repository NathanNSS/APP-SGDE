import React,{useState,useEffect} from 'react';
import { View, SafeAreaView,ScrollView, FlatList, Text, RefreshControl, TouchableHighlight, TouchableOpacity, TextInput, StyleSheet, Modal, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import config from '../../config/config.json';
//Componentes
import TopMenu from '../components/topMenu.js';

//Estilos
import  eProduto from '../style/estiloProduto.js';


export default function telaProdutos ({navigation}){

  const [visivel, setVisivel] = useState(false);

  //Dados dos Clientes
  const [codigoClie, setCodigoClie] = useState(null);
  const [nomeClie, setNomeClie] = useState(null);
  const [cpfCnpjClie, setCpfCnpjClie] = useState(null);
  const [emailClie, setEmailClie] = useState(null);
  const [telefoneClie, setTelefoneClie] = useState(null);
  const [enderecoClie, setEnderecoClie] = useState(null);
  //const [imgClie, setImgClie] = useState(null);

  //Id
  const [idFun, setIdFun] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);

  const [listaClie, setListaClie] = useState([])
  const [atualizar, setAtualizar] = useState(false);

  
 
  useEffect(()=>{
    getUser();
  },[]);
  
  useEffect(()=>{
    sendBusca();
  },[]);

  const aoAtualizar=()=>{
    setAtualizar(true); 
    sendBusca() 
}

  //pega Id funcioanrio
  async function getUser(){
    let response = await AsyncStorage.getItem('dadosUsuario');
    let json = JSON.parse(response);
    setIdFun(json.id);
  }

 //Busca Produtos
  async function sendBusca(){
    let response = await fetch(config.urlRoot+'buscaCliente',{
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
            await AsyncStorage.setItem('dadosCliente', JSON.stringify(json))
            let dadosClie = await AsyncStorage.getItem('dadosCliente');

            let clie = await JSON.parse(dadosClie);
             setListaClie(clie);
            
            //console.log("Clientes Storage",clie)
            //console.log("Clientes Lista",listaClie)
        }

      setTimeout(()=>{setAtualizar(false)},1000);
  }

 //Envia Formulario
  async function sendForm(){
    let response = await fetch(config.urlRoot+'createCliente',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          codigoClie: codigoClie,
          nomeClie: nomeClie,
          cpfCnpjClie: cpfCnpjClie,
          //imgClie:imgClie,
          emailClie:emailClie,
          telefoneClie:telefoneClie,
          enderecoClie:enderecoClie,
          idFun:idFun,
          //idEmpresa:idEmpresa
        })
      }
      )
      

  }

    return(
      <SafeAreaView >
        <TopMenu/>
        <View style={eProduto.container}>
        
            <TextInput
                style={eProduto.inpPesq}
                placeholder="Pesquisar..."
                //onChangeText={texto => setNome(texto)}
                autoCapitalize="words"
                autoFocus={false}
            />
          <TouchableOpacity style={eProduto.btnLogin} onPress={() => setVisivel(true)}>
            <Text style={eProduto.txtButton}>  Cadastrar Cliete</Text>
          </TouchableOpacity>
        </View>
        
        
                        {/* */}

        
        <FlatList refreshControl={
        <RefreshControl refreshing={atualizar} onRefresh={aoAtualizar}/>
        }
        marginHorizontal={20}
        showsVerticalScrollIndicator={false}
          data={listaClie}
          keyExtractor={(item) => String(item.id)  }
          renderItem={({item}) => {
            return(
              <View style={estiloClie.container2}>
                <Text style={estiloClie.txt}>{item.nomeCliente}</Text>
                <Text style={estiloClie.txt}>{item.cpfCnpj}</Text>
              </View>
            )
          }}/> 
      

        <Modal  animationType="slide" transparent={false} visible={visivel}>
          <SafeAreaView style={eProduto.containerModal}>
            <View style={eProduto.txtAlin}>
                <Image style={eProduto.tinyLogo} 
                source={require('../img/logoApp.png')}
                />
                <Text style={eProduto.txtCor}>SGDE</Text>
            </View>
            <View style={{alignSelf:"flex-start",top:-30,marginLeft:20}}>
              <TouchableOpacity style={{alignItems:"flex-start"}} onPress={()=>setVisivel(false)}>
              <Ionicons name="md-arrow-round-back" size={24} color="black" />
              </TouchableOpacity>
            </View>

            
          </SafeAreaView>
          <ScrollView>
          <View style={eProduto.container}>
            <View>
                <Text>{nomeClie}</Text>
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Nome do Cliete"
                  onChangeText={text => setNomeClie(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="CPF/CNPJ"
                  onChangeText={text => setCpfCnpjClie(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="E-mail"
                  onChangeText={text => setEmailClie(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Telefone"
                  onChangeText={text => setTelefoneClie(text)}
                />
                
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Endereço"
                  onChangeText={text => setEnderecoClie(text)}
                />
            </View>
            <TouchableOpacity style={eProduto.btnLogin} onPress={sendForm}>
              <Text style={eProduto.txtButton}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    );
  }

  const estiloClie = StyleSheet.create({
    container2:{
      alignItems:"center",
      justifyContent:"center",
      height:90,
      width:250,
      backgroundColor:"#ffffff",
      borderWidth:1,
      borderRadius:8,
      borderColor:"#66bcf5e0",
      marginVertical:20,
      padding:10,
      elevation:2,
      marginLeft:55,
      marginBottom:10
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