import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'


interface ButtonProps {
    buttonStyleInTailwind?: string;
    textStyleInTailwind?: string;
    title: string;
    onPress?: (e: GestureResponderEvent) => void;
    loading?: boolean;
  }
export default function Button({buttonStyleInTailwind, textStyleInTailwind, title, onPress, loading = false}: ButtonProps) {
  return (
    <Pressable onPress={onPress} className={buttonStyleInTailwind}>
      <Text className={textStyleInTailwind}>{title}</Text>
    </Pressable>
  )
}