import { StyleSheet,Platform,StatusBar} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colours from "../constants/Colours";



export default StyleSheet.create({
    safeAreaView:{flex:1,
      // backgroundColor: Colours.BeanLightGrey,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,},
    container: {
      flex: 1,
      // width: wp("100%"),
      // height: hp("100%"),      
    },

    //Logo in 
    logoContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center'
  },
  formContainer: {
      flex: 4,
      justifyContent: 'flex-start',
      alignItems: 'center'
  },
  logo: {
      width: 250,
      height: 250,
      resizeMode: 'contain'
  },
  logoTitle: {
      fontSize: 28,
      color: Colours.BeanLightBlue,
      fontWeight: 'bold'
  },
  logoSmall:{
    width:70,
    height: "auto",
    resizeMode: "contain",
  },
  // logoSubTitle: {
  //     fontSize: 24,
  //     fontWeight: 500,
  //     color: Colours.BeanLightBlue
  // },
  textInput: {
    height: 40,
    borderRadius: 4,
    backgroundColor: "white",
    width: wp("80%"),
    marginBottom: 15,
    paddingLeft: 5
},
textInputSmall: {
    height: 40,
    borderRadius: 4,
    backgroundColor: "white",
    width: 150,


},
loginButton: {
    backgroundColor: Colours.BeanLightBlue,
    height: 40,
    borderRadius: 4,
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20
},
loginButtonText: {
    color: Colours.White,
    fontSize: 18,
    paddingBottom: 5
},

GoldButtonText: {
    color: "white",
    fontSize: 16,
    padding: 5
},
errorContainer: {
  alignItems: "center"
},
errorText: {
  color: "red",
  fontSize: 20,
  marginTop: 10,
  fontWeight: "bold",
},
 // Header layout styles
 headerContainer: {
  flexDirection: "row",
  paddingHorizontal: 7,
  paddingVertical:5,
  backgroundColor: Colours.BeanLightBlue,
  justifyContent: "space-between",
  borderBottorm: "5px solid",
  borderBottomColor: Colours.BeanDarkBlue
},
//Category layout styles
categoryContainer: {
  flexDirection: "row",
  padding: 7.5,
  backgroundColor: Colours.BeanPaleGold,
  justifyContent: "space-between"
},
// diatary container
dietaryContainer: {
  width:wp("80%"),
  flexWrap:"wrap",
flexDirection: "row",
alignItems: "center",
gap: 20,
marginBottom: 5,
},
dietaryBox:{
  flexDirection: "row",
  alignItems: "center",
  gap:5
},
checkBox:{
  Margin:8
},

categoryTab:{
  borderRadius:10,
padding:5,
marginHorizontal:10,
backgroundColor:Colours.BeanLightGrey
},

categoryTabEdit:{
backgroundColor:Colours.BeanLightBlue

},

navBarIcon:{
  marginBottom: -5,
},

/////////

darkText: {
  color: Colours.BeanDarkBlue,
  fontSize: 14,
  fontWeight: "bold",
},

goldContainer: {
  backgroundColor: Colours.BeanGold,
  padding: 5.5,
  borderRadius:5
},
pageTitleContainer: {
  flexDirection: "row",
  padding: 5,
  backgroundColor: Colours.BeanLightGrey,
  justifyContent: "space-between",
  alignItems:"center",
  borderBottomWidth:1,
  borderBottomColor:Colours.BeanDarkBlue,
},
titleText: {
  fontSize: 20,
  fontWeight: "bold"
},
itemListContainer: {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: Colours.BeanDarkBlue,
  // flexWrap:"wrap",


},

itemListContainerGrey: {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: Colours.BeanDarkBlue,
  backgroundColor:Colours.BeanLightGrey,
  // flexWrap:"wrap",
},

rowHorizotal: {
  flexDirection: "row",
  gap:10,
  paddingHorizontal:15,
  justifyContent: "center",
  alignItems: "center",
},

fontBold: {
  fontWeight: "bold",
  fontSize: 18
},
actualFormContainerWithSpacing: {
  marginTop: 20,
  alignItems: "center",
  flex: 1,
},
blueMessage: {
  fontSize: 20,
  color: Colours.BeanLightBlue,
  fontWeight: "bold",
  marginTop: 20
},
alignCenter: {
  alignItems: "center",
  width:wp("80%")
},
alignCenterSearch:{
marginTop: 20,
alignSelf: "center",
},
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)"
},
modalContent: {
  backgroundColor: "white",
  padding: 20,
  alignItems: "center"
},
modalText: {
  fontSize: 18
},
modalButtons: {
  flexDirection: "row"
},
modalButton: {
  backgroundColor: Colours.BeanLightBlue,
  padding: 10,
  marginRight: 10,
  marginTop: 10,
  borderRadius:5
},
deleteModalButton: {
  backgroundColor: Colours.BeanGold
},
//test
//screen option styles
BeanLightBlueBackground: {
  backgroundColor: Colours.BeanLightBlue
},
headerStyleText: {
  color: "white",
  paddingRight: 15,
  fontWeight: "bold",
  fontSize: 20
},
tabBarLabelStyle: {
  fontSize: 18,
  fontWeight: "bold",
},
SearchResult:{
  flexDirection:"row",
  justifyContent:"space-between",
  padding:5,
  borderBottomWidth:1,
  borderBottomColor:"white"

},
orderListRow:{
  // backgroundColor:"#f2f2f2",
  borderBottomColor:Colours.BeanDarkBlue,
  borderBottomWidth:1,
  padding:15,
  justifyContent:'space-between'

},
fontBoldSmall:{
  fontWeight:"bold",
  fontSize:16
},

minusContainer:{
  backgroundColor: Colours.BeanLightBlue,
  // width:30,
  // borderTopLeftRadius:5,
  // borderBottomLeftRadius:5,
  borderRadius:35,
  alignItems:"center",
  justifyContent:"center"

},

// plusContainer:{
//   backgroundColor: Colours.BeanLightBlue,
//   width:30,
//   borderTopRightRadius:5,
//   borderBottomRightRadius:5,
//   borderRadius:"100%",
//   alignItems:"center",
//   justifyContent:"center"
// },

itemQuantity:{
  fontSize:16,
  paddingLeft:5,
  paddingRight:5
},

orderListLeftColumn:{
  // width:wp("65%"),

  flex:3
},

orderListRightColumn:{
// width:wp("20%"),
flex:1,
alignItems:"center",
justifyContent:"center", 
},
contentContainer:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  padding:16
  },
  darkTextLarge:{
      color:Colours.BeanDarkBlue,
      fontSize:24
  },
  cartContainerList:{
      flexDirection:"row",
      paddingTop:10,
      paddingBottom:10,
      borderBottomColor:Colours.BeanDarkBlue,
      borderBottomWidth:1,
      justifyContent:"space-between",
      width:wp("80%")
  },
  textInputMultiLine:{
  borderRadius:4,
  marginTop:15,
  backgroundColor:"white",
  width:wp("80%"),
  marginBottom:15,
  paddingLeft:5
  },
  orangeButtonShort:{
      backgroundColor:"#e74c3c",
      height:40,
      borderRadius:4,
      width:wp("40%"),
      alignItems:"center",
      justifyContent:"center",
      fontSize:20
  },
  height10:{
      margin:10
  },
  labelContainer:{
    flexDirection:"row",
    // justifyContent:"space-between",
    padding:20,
    borderBottomWidth:1,
    borderBottomColor:Colours.BeanDarkBlue,
    alignItems:"center"
},
flex1:{
flex:1
},
labelItem:{
fontWeight:"bold",
fontSize:18
},
labelItemSmall:{
    fontSize:16,
    fontWeight:"bold",
    color:Colours.BeanDarkBlue
},
dropDownContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end"
},
width30:{
    width:wp("30%"),
},
whiteContainer:{
  backgroundColor:'white'
},

headerStyleTextBlack:{
  color:'black',
  paddingRight:15,
  fontWeight:"bold",
  fontSize:20
},
chartLabel:{
  fontSize: 13,
  fontWeight:"bold:"
},
orangeText:{
  color:'#e74c3c',
  marginRight:2
},
height20:{
  marginBottom:20
},
padding10:{
  padding:10
},
padding20:{
  padding:20
},
marginBottom10:{
  marginBottom:10,
  fontWeight:'bold'
}
  });
  