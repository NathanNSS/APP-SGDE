import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFF",
        top:20,
    },
    inputs:{
        color:"#000",
        backgroundColor:"#FFF",
        borderColor:"#8d8187",
        borderRadius:5,
        borderWidth:2,
        padding:10,
        margin:10,
        height:45,
        width:300,
        
    },
    btnLogin:{
        alignItems:"center",
        justifyContent:"center",
        padding: 10,
        margin:10,
        backgroundColor:"#4EC5F1",
        borderRadius:10,
        height:45,
        width:300,
        top:20
    },
    imgLogo:{
        bottom:40,
        // height:135,
        // width:120,
    },
    txtButton:{
        fontSize:20,
        color:"#000"
    },
    msgErro:(text='none')=>({
        fontSize:14,
        color:"#ca1212",
        display:text
    }),
    msg:{
        fontSize:14,
        color:"#ca1212",
    }

})  