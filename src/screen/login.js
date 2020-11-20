import React,{useEffect, useState} from 'react';
import { View, SafeAreaView, Text, TextInput,TouchableOpacity, Image, StyleSheet, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import config from '../../config/config.json';

//Estilo do Login
import eLogin from '../style/estiloLogin.js';

export default function Login ({navigation}){
    const [erro,setErro] = useState('none');
    const [cpf,setCpf] = useState(null);
    const [senha,setSenha] = useState(null);
    const [idEmpresa,setIdEmpresa] = useState(null);
    const [login,setLogin] = useState(false);

    //Responsalve pelo login
    async function sendForm(){
        let response = await fetch(`${config.urlRoot}login`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: cpf,
                senha: senha,
                idEmpresa: idEmpresa
            })
        });
        let json = await response.json();
        if(json === 'error'){
            setErro('flex');
            setTimeout(()=>{
                setErro('none')
            },3500);
            await AsyncStorage.clear();
        }else{
            await AsyncStorage.setItem('dadosUsuario', JSON.stringify(json))
            navigation.navigate('telasPrincipais')
        }
    }

    useEffect(()=>{
        verficaLogado()
    },[])

    useEffect(()=>{
        if(login === true){
            biometria()
        }
    },[login])

    async function verficaLogado(){
        let response = await AsyncStorage.getItem('dadosUsuario');
        let json = await JSON.parse(response);
        if(json !== null){
            setCpf(json.cpf);
            setSenha(json.senha);

            setLogin(true);
        }else{
            console.log("não logado")
        }
    }

    //Bioametria
    async function biometria(){
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if(compatible){
            let biometricRecords = await LocalAuthentication.isEnrolledAsync()
            if(!biometricRecords){
                alert('Biometria não Cadastro');
            }else{
                let result = await LocalAuthentication.authenticateAsync();
                if(result.success){
                    sendForm();
                }else{
                    setCpf(null);
                    setSenha(null);
                }
            }
        }
    }


    
  return(
    <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#FFF"}}>
        <View style={eLogin.container}>
            <View style={eLogin.imgLogo}>
                <Image style={eLogin.imgLogo}source={require('../img/logoApp.png')} />
            </View>
            <View>
                <Text style={eLogin.msgErro(erro)}>Verifique suas Informações</Text>
            </View>
            {/* <TextInput
                style={eLogin.inputs}
                placeholder="                 CNPJ/CPF da Empresa"
                onChangeText={(text)=>setIdEmpresa(text)}
                autoCapitalize="words"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                autoCompleteType="cc-number"
            /> */}
            <TextInput
                style={eLogin.inputs}
                placeholder="CPF"
                onChangeText={(text)=>setCpf(text)}
                autoCapitalize="words"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                autoCompleteType="cc-number"
            />
            
            <TextInput
                style={eLogin.inputs}
                placeholder="Senha"
                onChangeText={(text)=>setSenha(text)}
                autoCapitalize="words"
                autoCompleteType="password"
                textContentType="password"
                secureTextEntry={true}
                //keyboardType="visible-password"
            />

            <TouchableOpacity style={eLogin.btnLogin} onPress={() => sendForm()}>
                <Text style={eLogin.txtButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{top:100}} onPress={() => navigation.navigate('CadUser') }>
                <Text style={{justifyContent:"flex-end",alignItems:"center"}}>Cadastrar-se</Text>
            </TouchableOpacity>
        </View>

        <View>
            {/* <Modal animationType="fade" transparent={false} visible={visivel} >
                <View>
                    <Text>Olá Mundo = Hello Word </Text>
                    <TouchableOpacity onPress={() =>{setVisivel(false)}}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal> */}
        </View>

    </SafeAreaView>
  );
}



