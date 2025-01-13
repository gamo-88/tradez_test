 
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
 
 
 export const usePickImage = ()=> {

      const [profilePicture, setProfilePicture] = useState<string | undefined>();
    
    const pickImage = async () => {
        // demander la permission pour ouvrir la camera sur mobile
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (status !== "granted") {
          alert("Permission d'accès à la galerie refusée.");
          return;
        }
    
        // Ouvrir la galerie pour sélectionner une image
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setProfilePicture(result.assets[0].uri);
        }
      };

      return {pickImage, profilePicture}
 }
