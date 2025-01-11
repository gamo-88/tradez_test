import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ScreenWrapper from '@/components/common/screenWrapper';

export default function ProfileScreen() {

  const user = useSelector((state: RootState) => state.user);
  console.log(user)

  return (
    <ScreenWrapper>
      <Text>ProfileScreen  {user.isConnected ? user.username : 'Invité'}</Text>
    </ScreenWrapper>
  )
}