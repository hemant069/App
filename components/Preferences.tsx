import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
    const [isAutoSync, setisAutoSync] = useState(true);
    const [isNotificationEnabled, setisNotificationEnabled] = useState(true)


    const { isDarkmode, colors, toggleDarkMode } = useTheme()

    const settingStyles = createSettingsStyles(colors);

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section} >
            <Text style={settingStyles.sectionTitle}>Preferences</Text>
            <View style={settingStyles.settingItem} >
                <View style={settingStyles.settingLeft} >
                    <LinearGradient colors={colors.gradients.primary} style={settingStyles.settingIcon}  >
                        <Ionicons name='moon' size={18} color={"#fff"} />
                    </LinearGradient>
                    <Text style={settingStyles.settingText} >Dark Mode</Text>
                </View>
                <Switch value={isDarkmode} onValueChange={toggleDarkMode} thumbColor={"#fff"}
                    trackColor={{ false: colors.border, true: colors.primary }}
                />
            </View>
            <View style={settingStyles.settingItem} >
                <View style={settingStyles.settingLeft} >
                    <LinearGradient colors={colors.gradients.warning} style={settingStyles.settingIcon}  >
                        <Ionicons name='notifications' size={18} color={"#fff"} />
                    </LinearGradient>
                    <Text style={settingStyles.settingText} >Notifactions</Text>
                </View>
                <Switch value={isNotificationEnabled} onValueChange={() => setisNotificationEnabled(!isNotificationEnabled)} thumbColor={"#fff"}
                    trackColor={{ false: colors.border, true: colors.warning }}
                />
            </View>
            <View style={settingStyles.settingItem} >
                <View style={settingStyles.settingLeft} >
                    <LinearGradient colors={colors.gradients.success} style={settingStyles.settingIcon}  >
                        <Ionicons name='notifications' size={18} color={"#fff"} />
                    </LinearGradient>
                    <Text style={settingStyles.settingText} >Auto Sync</Text>
                </View>
                <Switch value={isAutoSync} onValueChange={() => setisAutoSync(!isAutoSync)} thumbColor={"#fff"}
                    trackColor={{ false: colors.border, true: colors.success }}
                />
            </View>
        </LinearGradient>
    )
}

export default Preferences