import React,{useState} from 'react';
import { View, Alert, SafeAreaView, Text, TextInput,TouchableOpacity, Image, StyleSheet} from 'react-native';
import config from '../../config/config.json';


//componentes
import InptRadio from '../components/inputRadio.js';
//Estilo do Login
import eCadUser from '../style/estiloCadUser.js';
import eLogin from '../style/estiloLogin.js'

export default function CadUser ({navigation}){
  const [nome,setNome] = useState(null);
  const [email,setEmail] = useState(null);
  const [cpf,setCpf] = useState(null);
  const [senha,setSenha] = useState(null);
  const [confSenha,setConfSenha] = useState(null);
  
  const [msg, setMsg] = useState ();

  async function sendForm(){
    if(senha != confSenha || ""){
      alert('Erro ao confirma a Senha, Verifique os Campos Nova Senha e Confimação de Senha')
    }else{
      let response = await fetch(`${config.urlRoot}cadFuncionario`,{
        method:"POST",
        body:JSON.stringify({
          nome:nome,
          email:email,
          cpf:cpf,
          senha:senha
        }),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let json = await response.json();

      setMsg(json)
      setTimeout(()=>{
        setMsg(null)
      },3000)
    }
  }

  return(
    <SafeAreaView style={{flex:1, justifyContent:"flex-start", alignItems:"center", backgroundColor:"#FFF"}}>
      <View style={eCadUser.txtAlin}>

        <Image style={eCadUser.logoApp} 
          source={require('../img/logoApp.png')}
        />
        <Text style={eCadUser.txtCor}>SGDE</Text>
      </View>
      <Text style={eLogin.msg}>{msg}</Text>
      <View style={eCadUser.container}>
        <TextInput
          style={eCadUser.inputs}
          placeholder="Nome do Funcionario"
          onChangeText={texto => setNome(texto)}
          autoCapitalize="words"
          autoFocus={true}
        />
        <TextInput
          style={eCadUser.inputs}
          placeholder="E-mail"
          onChangeText={texto => setEmail(texto)}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <TextInput
          style={eCadUser.inputs}
          placeholder="CPF"
          onChangeText={texto => setCpf(texto)}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          autoCompleteType="tel"
        />

        <TextInput
          style={eCadUser.inputs}
          placeholder="Senha"
          onChangeText={(text)=>setSenha(text)}
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
          //keyboardType="visible-password"
        />
        
        <TextInput
          style={eCadUser.inputs}
          placeholder="Confirma Senha"
          onChangeText={(text)=>setConfSenha(text)}
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
          //keyboardType="visible-password"
        />

        <TouchableOpacity style={eCadUser.btnLogin} onPress={()=>sendForm()}>
          <Text style={eCadUser.txtButton}>Cadastrar</Text>
        </TouchableOpacity>
        
      </View>

    </SafeAreaView>
  );
}


function RadioButton(props) {
  return (
    <View style={[{
      height: 18,
      width: 18,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
    }, props.style]}>
        {
          props?
          <View style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#000',
          }}/>
          : null
        }
      </View>
  );
}
