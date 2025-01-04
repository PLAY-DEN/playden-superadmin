
import { format } from 'date-fns';


export function objectToFormData<T extends Record<string, any>>(
  obj: T
): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value); // Append files or blobs directly
    } else {
      formData.append(key, value?.toString()); // Convert other values to strings
    }
  });

  return formData;
}

export const formatDate = (dateString: string, dateFormat = 'MMMM dd, yyyy, hh:mm a') => {
  const date = new Date(dateString);
  return format(date, dateFormat);
};