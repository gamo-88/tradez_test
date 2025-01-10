import { View, Text, TextInput } from 'react-native'
import React from 'react'


interface InputProps {
    icon?: React.ReactNode; // L'icône peut être n'importe quel élément React
    wholeInputTailwindStyle?: string; // Styles pour le conteneur
    textInputTailwindStyle?: string; // Styles pour le TextInput
    inputRef?: React.Ref<TextInput>; // Référence pour le TextInput
    onChangeText?: (text: string) => void; // Fonction de gestion du texte
    value?: string; // Valeur du TextInput
    placeholder?: string; // Texte de placeholder
    secureTextEntry?: boolean; // Pour masquer le texte saisi (utile pour les mots de passe)
  }
  
export default function Input({
    icon,
    wholeInputTailwindStyle,
    textInputTailwindStyle,
    inputRef,
    onChangeText,
    value,
    placeholder,
    secureTextEntry,
}:InputProps) {
  return (
    <View className={`flex items-center justify-center gap-3 px-4  rounded-[15px] flex-row h-[4rem] bg-[rgba(0,0,0,0.07)] ${wholeInputTailwindStyle}`}>
      {/* Affichage de l'icône si elle est présente */}
      {icon && <View className='flex justify-center items-center'>{icon}</View>}
      
      {/* Le TextInput avec les props */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className={`flex flex-1 h-full border-none outline-none ${textInputTailwindStyle}`}
      />
    </View>
  )
}