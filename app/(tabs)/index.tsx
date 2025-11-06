import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const { toggleDarkMode } = useTheme();
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Hiii Hemant This is Your First Mobile Application.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",


  },
  heading: {
    fontSize: 16,

  }

})