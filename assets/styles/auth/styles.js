import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

 const style = StyleSheet.create({
  logo:{
    color: Colors.PRIMARY,
    fontSize: 100,
    fontFamily: "Inter-Bold",
    alignSelf: "center",
    width:'100%',
    textAlign:'center',
    paddingBottom:40,
    textShadowColor:'grey',
    textShadowOffset:{height:10,width:0},
    textShadowRadius:15
  },
  container: {
    height: "100%",
    backgroundColor:Colors.BACKGROUND,
    justifyContent: "flex-start",
  },
  textInput: {
    backgroundColor: "white",
    marginBottom: 30,
    padding: 15,
    marginHorizontal: 20,
    borderWidth: 0.3,
    borderRadius: 10,
  },
  login: {
    width: "50%",
    marginLeft: "25%",
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
  },
  loginText: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontFamily: "Inter-Bold",
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
});
export default style;
