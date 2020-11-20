import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    txtAlin:{
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor:"#FFF",
        //bottom: 120,
        marginTop: 40,
        padding:10,
        
      },
    txtCor:{
        color: "#158CD5",
        fontSize: 25,
        textAlign:"justify",
        //fontFamily: "Bahnschrift",
        fontWeight: 'bold',
        
    },
    logoApp:{
        marginRight:15,
        width:35,
        height:40,
    },
    btnRadio:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        bottom:100,
    },
    txtRadio:{
        fontSize:18,
        marginRight:10,
        marginLeft: 10
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:30
    },
    inputs:{
        color:"#000",
        backgroundColor:"#FFF",
        borderColor:"#8d8187",
        borderRadius:5,
        borderWidth:2,
        padding:10,
        marginTop:25,
        height:45,
        width:300,
        
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
        top:20
    },
    txtButton:{
        fontSize:18,
        color:"#FFF",
        fontWeight:"bold"
    },
});