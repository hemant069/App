import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const { colors } = useTheme()
    const homestyles = createHomeStyles(colors);

    const todos = useQuery(api.todos.getTodos);

    const completedCount = todos ? todos.filter((todo) => todo.iscompleted).length : 0;
    const totolCount = todos ? todos.length : 0;
    const progressPercentage = totolCount > 0 ? (completedCount / totolCount) * 100 : 0;
    return (
        <View style={homestyles.header}>
            <View style={homestyles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={homestyles.iconContainer}>
                    <Ionicons name='flash-outline' size={28} color={"#ffff"} />
                </LinearGradient>

                <View style={homestyles.titleTextContainer}>
                    <Text style={homestyles.title}>Today&apos;s Task 👀 </Text>
                    <Text style={homestyles.subtitle}>{completedCount} of {totolCount} Completed</Text>
                </View>

            </View>

            {

                <View style={homestyles.progressContainer}>
                    <View style={homestyles.progressBarContainer} >
                        <View style={homestyles.progressBar}>
                            <LinearGradient colors={colors.gradients.success} style={[homestyles.progressFill, { width: `${progressPercentage}%` }]} />
                        </View>
                        <Text style={homestyles.progressText}>{Math.round(progressPercentage)}%</Text>
                    </View>
                </View>

            }
        </View>
    )
}

export default Header