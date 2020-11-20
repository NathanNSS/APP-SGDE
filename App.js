import React from 'react';
import { View, SafeAreaView, Text, Button, StyleShee} from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import CartProvider from './src/components/cart.js';
import {useCart} from './src/components/cart.js'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 


const Pilha = createStackNavigator();
const Guia = createBottomTabNavigator();
const Gaveta = createDrawerNavigator();

//Importações de Telas
import Login from './src/screen/login.js';
import CadUser from './src/screen/cadastroUser.js';
import TelasPrincipais from './src/screen/telaPrincipais.js';
import TelaProdutos from './src/screen/telaProdutos.js';
import TelaClientes from './src/screen/telaClientes.js';
import TelaCarrinho from './src/screen/telaCarrinho.js';
import Perfil from './src/screen/telaPerfil.js';

function Guias (){
  return(

    <Guia.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Feed') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }else if (route.name === 'Produtos') {
          iconName = focused
            ? 'logo-dropbox'
            : 'logo-dropbox';
        }else if(route.name === 'Clientes'){
          iconName = focused
          ? 'ios-people' : 'ios-people';
        }else if (route.name === 'Carrinho'){
          iconName = focused
          ? 'md-cart' : 'md-cart';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
        //return <Foundation name={iconName} size={size} color={color} />;
      },
    })}>
      <Guia.Screen name="Feed" component={MenuLateral}/>
      <Guia.Screen name="Produtos" component={TelaProdutos}/>
      <Guia.Screen name="Clientes" component={TelaClientes}/>
      <Guia.Screen name="Carrinho" component={TelaCarrinho} /*options={{tabBarIcon: QuanItemCart}}*//>
    </Guia.Navigator>
  )
}

function MenuLateral(){
  return(
    <Gaveta.Navigator>
      <Gaveta.Screen name="Feed" component={TelasPrincipais} options={{headerShown:true}}/>
      <Gaveta.Screen name="Perfil" component={Perfil} options={{headerShown:true}}/>
    </Gaveta.Navigator>
  )
}
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>

        {/* Tela de Login */}
        <Pilha.Navigator>
          <Pilha.Screen
            name="Login"
            component={Login}
            options={{headerShown: false }}
          />

        {/* Cadastro de Usuario */}
          <Pilha.Screen
            name="CadUser"
            component={CadUser}
            options={{headerShown: false }}
          />
          
          <Pilha.Screen
            name="telasPrincipais"
            component={Guias}
            options={{headerShown: false }}
          />

        </Pilha.Navigator>
      </NavigationContainer> 
    </CartProvider>
  );
}
function QuanItemCart (){

  const {cart} = useCart()

  return(
    <View >
      <Text>{Object.keys(cart).length}</Text>
    </View>
  )
}
