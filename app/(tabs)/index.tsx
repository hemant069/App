import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";

type Todo = Doc<"todos">
export default function Index() {

  const { toggleDarkMode, colors } = useTheme();

  const homestyles = createHomeStyles(colors)

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodos);

  console.log(todos)

  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {

      await toggleTodo({ id });
    } catch (error) {

      console.log("Error toggling todo", error)
      Alert.alert("Error", "Failed to toggle todo");

    }
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {

    return (
      <View style={homestyles.todoItemWrapper} >
        <LinearGradient colors={colors.gradients.surface}
          style={homestyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}

        >
          <TouchableOpacity
            style={homestyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient colors={item.iscompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                homestyles.checkboxInner,
                { borderColor: item.iscompleted ? 'transparent' : colors.border }
              ]}

            >
              {item.iscompleted && <Ionicons name="checkmark" size={18} color={"#fff"} />}

            </LinearGradient>

          </TouchableOpacity>
          <View>
            <Text style={[homestyles.todoText, item.iscompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6 }]}>
              {item.text}
            </Text>
            <View style={homestyles.todoActions}>
              <TouchableOpacity onPress={() => { }} activeOpacity={0.7} >
                <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                  <Ionicons name="pencil" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }} activeOpacity={0.7} >
                <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                  <Ionicons name="trash" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

      </View>
    )

  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homestyles.container}>

      <SafeAreaView style={homestyles.safeArea}

      >
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homestyles.todoList}
          contentContainerStyle={homestyles.todoListContent}
          ListEmptyComponent={<EmptyState />}

        />

      </SafeAreaView >
    </LinearGradient>
  );
}


