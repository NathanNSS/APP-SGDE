import React,{useState,useEffect} from 'react';
import { View, SafeAreaView, Text, TouchableOpacity,Modal, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/config.json';

//Estilos da Pagina
import eLogin from '../style/estiloLogin.js';
import eProduto from '../style/estiloProduto.js';


export default function funcionario ({navigation}){

    const [id, setId] = useState ();
    const [senhaAntiga, setSenhaAntiga] = useState ();
    const [novaSenha, setNovaSenha] = useState ();
    const [confNovaSenha, setConfNovaSenha] = useState ();
    const [cpf, setCpf] = useState ();
    const [visivel, setVisivel] = useState (false);
    const [msg, setMsg] = useState ();
    const [msg1, setMsg1] = useState ();

    useEffect(()=>{
      async function getId(){
        let response = await AsyncStorage.getItem('dadosUsuario');
        let json=JSON.parse(response);
        setId(json.id);
      }
      getId();
    })
    
    async function sendFormAutori(){
      if(cpf = null ){
        alert('Erro ao confirma a Senha, Verifique o Campo CPF')
      }else{
        console.log(cpf)
        let response = await fetch(`${config.urlRoot}autoFuncionario`,{
          method:"POST",
          body:JSON.stringify({
            cpf: cpf,
          }),
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        let json = await response.json();

        setMsg1(json)
        setTimeout(()=>{
          setMsg1(null)
        },3000)
      }
    }
    
    async function sendForm(){
      setVisivel(false)
      if(novaSenha != confNovaSenha){
        alert('Erro ao confirma a Senha, Verifique os Campos Nova Senha e Confimação de Senha')
      }else{
        let response = await fetch(`${config.urlRoot}editInfoUser`,{
          method:"POST",
          body:JSON.stringify({
            id: id,
            senhaAntiga: senhaAntiga,
            novaSenha: novaSenha
          }),
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setCpfF('')
        
        let json = await response.json();

        setMsg(json)
        setTimeout(()=>{
          setMsg(null)
        },3000)
      }
    }

    return(
      <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:25,color:"#121212",alignItems:'center',bottom:40,fontWeight:'bold'}}> Tela funcionario </Text>
        <View>
        <Text style={eLogin.msg}>{cpf}</Text>
        <Text style={eLogin.msg}>{msg}</Text>
        <TextInput
          style={eLogin.inputs}
          placeholder="Senha Antiga"
          onChangeText={(text)=>setSenhaAntiga(text)}
          autoCapitalize="words"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
        />

        <TextInput
          style={eLogin.inputs}
          placeholder="Nova Senha"
          onChangeText={(text)=>setNovaSenha(text)}
          autoCapitalize="words"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
        />

        <TextInput
          style={eLogin.inputs}
          placeholder="Confirma Nova Senha"
          onChangeText={(text)=>setConfNovaSenha(text)}
          autoCapitalize="words"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={sendForm} style={estiloPef.btnLogin}>
          <Text style={eProduto.txtButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisivel(true)} style={estiloPef.btnLogin}>
          <Text  style={eProduto.txtButton}>Autorizar Cadastro de Funcionario </Text>
        </TouchableOpacity>

        </View>
        <Modal animationType="slide" transparent={true} visible={visivel}>
          <View style={estiloPef.modal}>
            <Text>{cpf}</Text>
          <TextInput
            style={eLogin.inputs}
            placeholder="CPF do Funcionario"
            onChangeText={texto => setCpf(texto)}
            autoCapitalize="none"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            autoCompleteType="tel"
          />
          <TouchableOpacity onPress={sendFormAutori} style={estiloPef.btnLogin}>
            <Text style={eProduto.txtButton}>Permitir</Text>
          </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  const estiloPef = StyleSheet.create({
    btnLogin:{
      alignItems:"center",
      justifyContent:"center",
      padding: 10,
      marginBottom:10,
      marginLeft:10,
      backgroundColor:"#1976D2",
      borderRadius:7,
      elevation:5,
      height:45,
      width:300,
      top:20
  },
  modal:{
    alignItems:'center',
    
    justifyContent:'flex-start',
    top:100,
    height:300,
    padding:20,
    margin:20,
    backgroundColor:"#292828e0",
    borderRadius:20,
    elevation:10,
    
    
  },

  })