import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colours from "../constants/Colours";


export default StyleSheet.create({
    safeAreaView:{flex:1},
    container: {
      flex: 1,
      width: wp("100%"),
      height: hp("100%"),      
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
    color: Colours.BeanLightGrey,
    fontSize: 18,
    paddingBottom: 5
},

orangeButtonText2: {
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
  fontWeight: "400"
},
 // Header layout styles
 headerContainer: {
  flexDirection: "row",
  paddingHorizontal: 7,
  paddingVertical:5,
  backgroundColor: Colours.BeanLightBlue,
  justifyContent: "space-between"
},
//Category layout styles
categoryContainer: {
  flexDirection: "row",
  padding: 7.5,
  backgroundColor: Colours.BeanPaleGold,
  justifyContent: "space-between"
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
  fontWeight: "500"
},

orangeContainer: {
  backgroundColor: "#e74c3c"
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
  borderBottomColor: Colours.BeanDarkBlue
},

itemListContainerGrey: {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: Colours.BeanDarkBlue,
  backgroundColor:Colours.BeanLightGrey
},

rowHorizotal: {
  flexDirection: "row"
},

fontBold: {
  fontWeight: "bold",
  fontSize: 18
},
actualFormContainerWithSpacing: {
  marginTop: 20,
  alignItems: "center",
  flex: 1
},
blackMessage: {
  fontSize: 20,
  color: "black",
  fontWeight: "bold",
  marginTop: 20
},
alignCenter: {
  alignItems: "center",
  justifyContent: "center"
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
  backgroundColor: "black",
  padding: 10,
  marginRight: 10,
  marginTop: 10
},
deleteModalButton: {
  backgroundColor: "#e74c3c"
},
//test
//screen option styles
BeanLightBlueBackground: {
  backgroundColor: Colours.BeanLightBlue
},
headerStyleText: {
  color: "white",
  paddingRight: 15,
  fontWeight: 500,
  fontSize: 20
},
tabBarLabelStyle: {
  fontSize: 18,
  fontWeight: 500
},
SearchResult:{
  flexDirection:"row",
  justifyContent:"space-between",
  padding:5,
  borderBottomWidth:1,
  borderBottomColor:"white"

}
  });
  