import {ManageMoviePayload} from "@/src/types";

export const createFormData = (data: ManageMoviePayload) => {
  const formData = new FormData();
  
  formData.append('title', data.title);
  formData.append('year', data.year.toString());
  
  if (data.file) {
    formData.append('file', data.file);
  }
  
  return formData;
};
