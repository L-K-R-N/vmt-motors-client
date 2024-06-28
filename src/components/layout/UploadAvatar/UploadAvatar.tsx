import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './UploadAvatar.module.scss';
import PersonService from '@/api/services/PersonService';
import { Button } from '@/components/UI/Button/Button';
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
            let formData = new FormData();
            await formData.append('file', avatarFile);
            console.log(formData.values(), avatarFile);

            if (formData.values()) {
               await PersonService.changePersonPhoto(formData);
               console.log(1);

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
         // console.log(e.target.files);
      }
   };

   useEffect(() => {
      if (avatarFile) {
         handleAvatarUpload();
      }
   }, [avatarFile]);

   return (
      <div className={cl.container}>
         <input
            title="Upload avatar"
            type="file"
            onChange={handleAvatarChange}
            className={cl.input}
            accept="image/*,.png,.jpg,.gif,.web,"
         />
         {/* <button>Upload Avatar</button> */}
         <button className={cl.btn} type="button" title="aaa">
            Change photo
         </button>
      </div>
   );
};
