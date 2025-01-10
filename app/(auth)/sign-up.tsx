import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/common/screenWrapper'
import GoBackButton from '@/components/common/goBackButton'
import SignUpForm from '@/components/signUpComponents/signUpForm'


export default function SignUpScreen() {
  return (
    <ScreenWrapper>
        {/* back bouton */}
      <View className="pl-2">
        <GoBackButton />
      </View>
{/* litle image to show as header */}
      <View className="flex flex-col items-center">
        {/* <Image source={signInHeaderImage} style={{width: 200, height: 200}} resizeMode="cover" className="h-40 w-28 object-cover" /> */}
        <Text className="text-3xl font-semibold text-blue-600  text-center">
        Sign Up
        </Text>
      </View>
      {/* <View className="ml-8">
        <Text className="text-2xl font-medium text-center text-slate-600">
          
        </Text>
      </View> */}

<View className="px-4 mt-4 flex justify-center items-center">
    <Text className='text-slate-600 text-sm'>Don't forget your credentials, you will neeed them</Text>
<SignUpForm/>

</View>

    </ScreenWrapper>

  )
}