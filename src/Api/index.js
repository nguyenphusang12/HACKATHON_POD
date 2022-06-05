import api from "./api";
import apiContants from "./apiContants";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("message", file, file.name);
  return api.post(apiContants.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPrice = async(data)=>{
  const res = await api.post(apiContants.GET_PRICE,data)
  return res
}