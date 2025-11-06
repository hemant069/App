import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "@/convex/_generated/api";
export default function Index() {

  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodos);
  const clearAllTodo = useMutation(api.todos.deleteAlltodos);
  console.log(todos)

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Hiii Hemant This is Your First Mobile Application.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "first todo" })}>
        <Text>Add todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodo()}>
        <Text>Clear All todo</Text>
      </TouchableOpacity>
    </View >
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