import React,{useState,useEffect} from 'react';
import { View, SafeAreaView, Text, TextInput, FlatList, Modal, Image, ScrollView,TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopMenu from '../components/topMenu.js';
import {useCart} from '../components/cart.js';
import { Ionicons } from '@expo/vector-icons'; 
import  eProduto from '../style/estiloProduto.js';
import config from '../../config/config.json';


export default function telasCarrinho ({navigation}){
//Dados dos Clientes
  const [codigoClie, setCodigoClie] = useState(null);
  const [nomeClie, setNomeClie] = useState(null);
  const [cpfCnpjClie, setCpfCnpjClie] = useState(null);
  const [emailClie, setEmailClie] = useState(null);
  const [telefoneClie, setTelefoneClie] = useState(null);
  const [enderecoClie, setEnderecoClie] = useState(null);
  
  //Id
  const [idFun, setIdFun] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);
  
  //Id Produtos
  const [idProd, setIdProd] = useState([]);
  
  const [visivel, setVisivel] = useState(false);
  
  
  const {remove, cart, totalValue} = useCart();


  useEffect(()=>{
    getUser();
  },[]);

  useEffect(()=>{
    getIdProd();
  },[cart]);

  async function getIdProd(){
    let idP = await cart
    setIdProd(idP)
    console.log(idP);
  }
  
  
  //pega Id funcioanrio
  async function getUser(){
    let response = await AsyncStorage.getItem('dadosUsuario');
    let json = JSON.parse(response);
    setIdFun(json.id);
  }

  async function sendForm(){
    let response = await fetch(config.urlRoot+'carrinho',{
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
          idP:idP,
          //idEmpresa:idEmpresa
        })
      }
      )
      

  }
    return(
      <SafeAreaView style={{flex:1}}>
        <TopMenu/>
        <View>
          <FlatList 
            marginHorizontal={0}
            showsVerticalScrollIndicator={false}
            data={cart}
            keyExtractor={(item) => String(item.id)  }
            renderItem={({index, item}) => {
              return(
                <View style={estiloCart.container2}>
                  <Text style={estiloCart.txt}>{item.nomeProduto}</Text>
                  <TextInput style={estiloCart.txt}>{item.quantidade}</TextInput>
                  <Text style={estiloCart.txt}>R$ {item.valor}</Text>
                  <Text style={estiloCart.txt}>{item.nomeFornecedor}</Text>
                  <TouchableOpacity onPress={()=> remove(index)}>
                  <Ionicons name="md-close" size={25} color={'red'} />
                  </TouchableOpacity>
                </View>
              )
          }}/> 
        </View>
        <TouchableOpacity style={estiloCart.valorT}>
            <Text style={estiloCart.txtV}>R${totalValue}</Text>
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:"flex-end",alignItems:"center"}}>
          <TouchableOpacity style={eProduto.btnLogin} onPress={()=>setVisivel(true)}>
            <Text style={eProduto.txtButton}>Prosseguir</Text>
          </TouchableOpacity>
        </View>

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
                  <Text>Voltar</Text>
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
  
  const estiloCart = StyleSheet.create({
    container2:{
      alignItems:"center",
      justifyContent:"center",
      height:215,
      width:250,
      backgroundColor:"#ffffff",
      borderWidth:1,
      borderRadius:8,
      borderColor:"#66bcf5e0",
      marginVertical:20,
      padding:10,
      elevation:2,
      marginLeft:55
    },
    txt:{
      fontSize:16,
      backgroundColor:"#edededb0",
      borderRadius:5,
      marginVertical: 4,
      width: '100%',
      padding:5
    },
    valorT:{
    position:'absolute',
    alignItems:'center',
    fontSize:20,
    color:"#FFF",
    justifyContent:'center',
    right:15,
    bottom:80,
    elevation:4,
    zIndex:8,
    width:70,
    height:70,
    borderRadius:50,
    backgroundColor:'#0094FF',
    shadowColor:'#000',
    shadowOpacity: 0.2,
    shadowOffset:{ width:2,height:5,},
    },
    txtV:{
      zIndex:9,
      fontSize:14,
      color:"#FFF",
      fontWeight:"bold"
    },
    
  })