
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='index' options={{ title: "Home" }} />
            <Tabs.Screen name='setting' options={{ title: "Setting  " }} />
        </Tabs>
    )
}

export default TabsLayout