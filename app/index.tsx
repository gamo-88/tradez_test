import { View, Text,  } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/common/screenWrapper'
import { router } from 'expo-router'
import Button from '@/components/common/button'

export default function WelcomeScreen() {
  return (
    <ScreenWrapper>
    <View>
      <Text className='text-2xl'>Welcome page</Text>
<Button title='test' buttonStyleInTailwind='bg-green-500 p-3 w-[40%] rounded' textStyleInTailwind='text-white text-2xl text-center'/>        

    </View>
    </ScreenWrapper>
  )
}