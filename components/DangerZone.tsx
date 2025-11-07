import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const DangerZone = () => {

    const { isDarkmode, colors, toggleDarkMode } = useTheme()

    const settingStyles = createSettingsStyles(colors);
    const clearAllTodo = useMutation(api.todos.deleteAlltodos)

    const handleResetApp = async () => {
        Alert.alert("Reset App", "⚠️ This will delete All Your Todos permanentely. This action cannot be undone",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {

                            const res = await clearAllTodo();
                            Alert.alert("App Reset", `Successfully deleted ${res.deletecount} todo${res.deletecount === 1 ? "" : "s"} Your app has been reset`)

                        } catch (error) {
                            console.log("Error", error)
                            Alert.alert("Error", "Failed to reset App");

                        }
                    }
                }
            ]
        )
    }



    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section} >
            <Text style={settingStyles.sectionTitleDanger}>Danger Zone</Text>
            <TouchableOpacity
                style={[settingStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
                activeOpacity={0.7}
            >
                <View
                    style={settingStyles.actionLeft}

                >
                    <LinearGradient colors={colors.gradients.danger} style={settingStyles.actionIcon} >
                        <Ionicons name='trash' size={18} color={"#fff"} />

                    </LinearGradient>
                    <Text style={settingStyles.actionTextDanger} >
                        Reset App
                    </Text>
                </View>
                <Ionicons name='chevron-forward' size={18} color={colors.textMuted} />

            </TouchableOpacity>

        </LinearGradient>
    )
}

export default DangerZone