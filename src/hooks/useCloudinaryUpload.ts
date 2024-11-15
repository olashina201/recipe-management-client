import { useMutation } from "@tanstack/react-query";

if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
  throw new Error('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not defined');
}

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined');
}

export const useCloudinaryUpload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.secure_url as string;
    },
  });
};