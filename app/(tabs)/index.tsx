import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";

export default function Index() {

  const { toggleDarkMode, colors } = useTheme();

  const homestyles = createHomeStyles(colors)

  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodos);
  const clearAllTodo = useMutation(api.todos.deleteAlltodos);
  console.log(todos)

  return (
    <LinearGradient colors={colors.gradients.background} style={homestyles.container}>

      <SafeAreaView style={homestyles.safeArea}

      >
        <Header />


      </SafeAreaView >
    </LinearGradient>
  );
}


