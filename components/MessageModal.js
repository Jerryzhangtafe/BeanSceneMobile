import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Modal,
  } from "react-native";

import styles from "../styles/MainStyle";



export default function MessageModal({message, modalVisibility, setModalVisibility}) {

    function closeModal(){
        setModalVisibility(false);
    }

return<Modal visible={modalVisibility} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {message}
              </Text>
              <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.darkText}>Close</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
}