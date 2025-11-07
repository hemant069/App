import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { useState } from "react";

type Todo = Doc<"todos">
export default function Index() {

  const { colors } = useTheme();

  const homestyles = createHomeStyles(colors)
  const [editTextId, setEditTextId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodos);
  const deleteTodos = useMutation(api.todos.deleteTodos);
  const updateTodos = useMutation(api.todos.updateToods);


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

  const handleDeleteTodo = async (id: Id<"todos">) => {

    Alert.alert("Delete Todo", "Are you sure about the delete todo", [
      { text: "cancel", style: "cancel" },
      { text: "delete", style: "destructive", onPress: () => deleteTodos({ id }) }

    ])

  }

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditTextId(todo._id)
  }

  const handleSaveEdit = async () => {

    if (editTextId) {
      try {

        await updateTodos({ id: editTextId, text: editText.trim() });
        setEditTextId(null)
        setEditText("")

      } catch (error) {

        console.log("Error", "Error", error);
        Alert.alert("Error", "Todo is not update");

      }
    }

  }

  const handleCancelEdit = () => {
    setEditTextId(null)
    setEditText("");
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {

    const isEditing = editTextId === item._id

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

          {
            isEditing ? (
              <View style={homestyles.editContainer} >

                <TextInput
                  style={homestyles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                  autoFocus
                  multiline
                  placeholder="Edit your todo.."
                  placeholderTextColor={colors.textMuted}
                />

                <View style={homestyles.editButton}>
                  <TouchableOpacity onPress={() => handleSaveEdit()} activeOpacity={0.7} >
                    <LinearGradient colors={colors.gradients.success} style={homestyles.editButton}>
                      <Ionicons name="checkmark" size={14} color={"#fff"} />
                      <Text style={homestyles.editButtonText} >Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleCancelEdit()} activeOpacity={0.7} >
                    <LinearGradient colors={colors.gradients.muted} style={homestyles.editButton}>
                      <Ionicons name="close" size={14} color={"#fff"} />
                      <Text style={homestyles.editButtonText} >Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>


                </View>

              </View>
            ) : (
              <View style={homestyles.todoTextContainer}>
                <Text style={[homestyles.todoText, item.iscompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6 }]}>
                  {item.text}
                </Text>
                <View style={homestyles.todoActions}>
                  <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.7} >
                    <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                      <Ionicons name="pencil" size={14} color={"#fff"} />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.7} >
                    <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                      <Ionicons name="trash" size={14} color={"#fff"} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </LinearGradient >

      </View >
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


