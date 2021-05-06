import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    btnLogin:{
        alignItems:"center",
        justifyContent:"center",
        padding: 10,
        marginBottom:10,
        backgroundColor:"#1976D2",
        borderRadius:7,
        elevation:5,
        height:45,
        width:300,
        top:15
    },
    txtButton:{
        fontSize:18,
        color:"#FFF",
        fontWeight:"bold"
    },
    inpPesq:{
        color:"#000",
        backgroundColor:"#FFF",
        borderColor:"#8d8187",
        borderRadius:5,
        borderWidth:1,
        padding:10,
        marginTop:30,
        height:35,
        width:300,
    },
    // Estilo Modal
    containerModal:{
        backgroundColor:"#FFF",
        justifyContent:"flex-start",
        alignItems:'center',
        height:75,
        elevation:1
    },
    txtAlin:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        marginTop:15
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
    inpNomeP:{
        color:"#000",
        backgroundColor:"#FFF",
        borderColor:"#8d8187",
        borderRadius:5,
        borderWidth:1,
        padding:10,
        marginTop:15,
        marginBottom:15,
        height:35,
        width:300,
    },
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
      }
});

//http://192.168.15.7:3000/