import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/common/screenWrapper'
import GoBackButton from '@/components/common/goBackButton'

export default function SignInScreen() {
  return (
    <ScreenWrapper>
    <View className='ml-8'>
      <Text>SignInScreen</Text>
      <GoBackButton size={32}/>
    </View>
    </ScreenWrapper>
  )
}