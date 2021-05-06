import React,{useState,useEffect} from 'react';
import { View, SafeAreaView,ScrollView, FlatList, Text, RefreshControl,TouchableHighlight, TouchableOpacity, TextInput, StyleSheet, Modal, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCart} from '../components/cart.js';
import config from '../../config/config.json';
import { Ionicons } from '@expo/vector-icons'; 
//Componentes
import TopMenu from '../components/topMenu.js';

//Estilos
import  eProduto from '../style/estiloProduto.js';


export default function telaProdutos ({navigation}){

  const [visivel, setVisivel] = useState(false);

  //Produto
  const [codigoProd, setCodigoProd] = useState(null);
  const [nomeProd, setNomeProd] = useState(null);
  const [quantidadeProd, setQuantidadeProd] = useState(null);
  //const [imgProd, setImgProd] = useState(null);
  const [valorProd, setValorProd] = useState(null);
  const [descricaoProd, setDescricaoProd] = useState(null);

  //Fornecedor
  const [nomeFor, setNomeFor] = useState(null);
  const [cnpjFor, setCnpjFor] = useState(null);
  const [telefoneFor, setTelefoneFor] = useState(null);
  const [emailFor, setEmailFor] = useState(null);
  const [enderecoFor, setEnderecofor] = useState(null);
  //Id
  const [idFun, setIdFun] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);

  

  const [listaProd, setListaProd] = useState([])
  const [atualizar, setAtualizar] = useState(false);

  
 
  useEffect(()=>{
    getUser();
  },[]);
  
  useEffect(()=>{
    randomCod(11)
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
    setIdFun(json.cpf);
  }

  //Codigo para o Produto
  function randomCod(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    setCodigoProd(result);
 }

 //Busca Produtos
  async function sendBusca(){
    let response = await fetch(config.urlRoot+'buscaProduto',{
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
            await AsyncStorage.setItem('dadosProduto', JSON.stringify(json))
            let dadosProd = await AsyncStorage.getItem('dadosProduto');

            let prod = await JSON.parse(dadosProd);
             setListaProd(prod);
            
            //console.log("Produto Storage",prod)
            //console.log("Produtos Lista",listaProd)
        }

      setTimeout(()=>{setAtualizar(false)},1000);
  }
 //Envia Formulario
  async function sendForm(){
    let response = await fetch(config.urlRoot+'createProduto',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          codigoProd: codigoProd,
          nomeProd: nomeProd,
          quantidadeProd: quantidadeProd,
          //imgProd
          valorProd:valorProd,
          descricaoProd:descricaoProd,
          nomeFor:nomeFor,
          cnpjFor:cnpjFor,
          telefoneFor:telefoneFor,
          emailFor:emailFor,
          enderecoFor:enderecoFor,
          idFun:idFun,
          idEmpresa:idEmpresa
        })
      }
      )
      
      //console.log(nomeProd)
  }

  const {add} = useCart();
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
            <Text style={eProduto.txtButton}>  Cadastrar Produto</Text>
          </TouchableOpacity>
        </View>
        
        
                        {/* */}

        
                        
        <FlatList refreshControl={
        <RefreshControl refreshing={atualizar} onRefresh={aoAtualizar}/>
        }
          marginHorizontal={0}
          showsVerticalScrollIndicator={false}
          data={listaProd}
          keyExtractor={(item) => String(item.id)  }
          renderItem={({item}) => {
            return(
              <View style={eProduto.container2}>
                <Text style={eProduto.txt}>Nome: {item.nomeProduto}</Text>
                <Text style={eProduto.txt}>Quant:{item.quantidade}</Text>
                <Text style={eProduto.txt}>R$ {item.valor}</Text>
                <Text style={eProduto.txt}>Forne: {item.nomeFornecedor}</Text>
                <TouchableOpacity onPress={()=> add(item)}>
                  <Ionicons name={'md-cart'} size={25} color={'#000'} />
                </TouchableOpacity>
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
                <Text>Voltar</Text>
              </TouchableOpacity>
            </View>

            
          </SafeAreaView>
                <ScrollView>
          <View style={eProduto.container}>
            <View>
                
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Nome do Produto"
                  value={nomeProd}
                  onChangeText={text => setNomeProd(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Quantidade"
                  onChangeText={text => setQuantidadeProd(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Valor"
                  onChangeText={text => setValorProd(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Descrição"
                  onChangeText={text => setDescricaoProd(text)}
                />
            </View>

            {/* Fornecedor */}

            <View>
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Nome do Fornecedor"
                  onChangeText={text => setNomeFor(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="CNPJ"
                  onChangeText={text => setCnpjFor(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Telefone"
                  onChangeText={text => setTelefoneFor(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Email"
                  onChangeText={text => setEmailFor(text)}
                />
                <TextInput
                  style={eProduto.inpNomeP}
                  placeholder="Edereço"
                  onChangeText={text => setEnderecofor(text)}
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