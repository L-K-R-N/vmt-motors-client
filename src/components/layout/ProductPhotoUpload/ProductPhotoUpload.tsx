import React, { useState } from 'react';

interface ImageUploadProps {
   maxImages: number;
   maxImageSize: number;
   onImageUpload: (images: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
   maxImages,
   maxImageSize,
   onImageUpload,
}) => {
   const [images, setImages] = useState<File[]>([]);

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
         const validImages = Array.from(files).filter(
            (file) => file.size <= maxImageSize * 1024 * 1024,
         );
         if (validImages.length + images.length <= maxImages) {
            setImages([...images, ...validImages]);
            onImageUpload(validImages);
         } else {
            alert(
               `Вы можете загрузить максимум ${maxImages} изображений размером до ${maxImageSize} МБ.`,
            );
         }
      }
   };

   const handleRemoveImage = (index: number) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
   };

   return (
      <div>
         <input
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
         />
         <div>
            {images.map((image, index) => (
               <div key={index}>
                  <img
                     src={URL.createObjectURL(image)}
                     alt={`Image ${index}`}
                     width={100}
                     height={100}
                  />
                  <button
                     type="button"
                     onClick={() => handleRemoveImage(index)}
                  >
                     Удалить
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ImageUpload;
