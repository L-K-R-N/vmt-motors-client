import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './UploadAvatar.module.scss';
import PersonService from '@/api/services/PersonService';
interface AvatarUploadProps {
   onAvatarUpload: () => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
   onAvatarUpload,
}) => {
   const [avatarFile, setAvatarFile] = useState<File | null>(null);

   const handleAvatarUpload = async () => {
      if (avatarFile) {
         try {
            const formData = new FormData();
            formData.append('file', avatarFile);
            console.log(formData, avatarFile);

            if (formData) {
               await PersonService.changePersonPhoto(formData);

               onAvatarUpload();
            }
         } catch (error) {
            console.error('Error uploading avatar:', error);
         }
      }
   };
   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setAvatarFile(e.target.files[0]);
         console.log(e.target.files);
      }
   };

   useEffect(() => {
      handleAvatarUpload();
   }, [avatarFile]);

   return (
      <div>
         <input
            title="Upload avatar"
            type="file"
            onChange={handleAvatarChange}
         />
         {/* <button>Upload Avatar</button> */}
      </div>
   );
};
