import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useMutation } from 'convex/react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const TodoInput = () => {

    const { colors } = useTheme()
    const homestyles = createHomeStyles(colors);
    const [newTodo, setnewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodos);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                await addTodo({ text: newTodo.trim() })
                setnewTodo("")
            } catch (error) {

                Alert.alert("Error", "Failed to Add todo");

            }
        }
    }

    return (
        <View style={homestyles.inputSection}>
            <View style={homestyles.inputWrapper}>
                <TextInput
                    style={homestyles.input}
                    placeholder='What needs to be done'
                    value={newTodo}
                    onChangeText={setnewTodo}
                    onSubmitEditing={handleAddTodo}
                    placeholderTextColor={colors.textMuted}


                />
                <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}>
                    <LinearGradient colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted} style={[homestyles.addButton, !newTodo.trim() && homestyles.addButtonDisabled]}>
                        <Ionicons name='add' size={24} color={"#fff"} />

                    </LinearGradient>

                </TouchableOpacity>
            </View>

        </View>
    )
}

export default TodoInput