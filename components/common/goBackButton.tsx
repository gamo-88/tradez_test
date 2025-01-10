import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function GoBackButton({size=32}) {
  return (
<Pressable onPress={()=>router.back()} className='bg-[rgba(0,0,0,0.07)] w-9  md:w-fit  md:h-fit rounded flex  items-center justify-center' 
  accessibilityLabel="Retour">
<Ionicons name="chevron-back-outline" size={size}  />
</Pressable>
  )
}