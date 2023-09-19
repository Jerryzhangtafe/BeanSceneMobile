import Colours from "../constants/Colours"
import styles from "../styles/MainStyle"
import { Text } from "react-native"
export default function ScreenOptionStyle(){

    return {
        headerStyle: [styles.orangeBackground],
        headerRight: () => (
          <Text style={styles.headerStyleText}>BeanScene</Text>
        ),
        /////////// header disabled
        headerShown:false,
        headerTitleStyle: [styles.headerStyleText],
        tabBarStyle: [styles.BeanLightBlueBackground],
        tabBarLabelStyle: [styles.tabBarLabelStyle],
        tabBarActiveTintColor: Colours.BeanGold,
        tabBarInactiveTintColor: Colours.BeanDarkBlue
      }
}