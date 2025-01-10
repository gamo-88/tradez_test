import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ScreenWrapperProps{
    children: React.ReactNode
}

export default function ScreenWrapper({children}:ScreenWrapperProps) {
    const { top } = useSafeAreaInsets()
    const paddingTop = top>0? top+5 : 30 
  return (
<View style={{paddingTop ,flex: 1}} >
    {children}
</View>
  )
}

const styles = StyleSheet.create({})