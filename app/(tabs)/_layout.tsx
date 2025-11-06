
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'

const TabsLayout = () => {

    const { colors } = useTheme();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                height: 90,
                paddingBottom: 30,
                paddingTop: 10,

            }
        }}>
            <Tabs.Screen name='index' options={{
                title: "Todos",
                tabBarIcon: ({ color, size }) => <Ionicons name="flash-outline" size={size} color={color} />
            }} />
            <Tabs.Screen
                name="setting"
                options={{
                    title: "Setting",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                }}
            />

        </Tabs >
    )
}

export default TabsLayout