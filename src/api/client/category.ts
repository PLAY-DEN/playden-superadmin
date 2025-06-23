import { ApiClient } from ".";
import { objectToFormData } from "../../utils/utils";
import { IParams } from "../../types/client";
import API_ENDPOINTS from "./_endpoint";

const categoryClient = {
  getCategories: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_CATEGORIES, params),

  getCategory: (params: IParams, id: string): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_CATEGORY.replace(":id", id), params),
  createCategory: (data: any): Promise<any> => {
    const formData = objectToFormData(data);
    return ApiClient.post(API_ENDPOINTS.CREATE_CATEGORY, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateCategory: (data: any, id: string): Promise<any> => {
    const formData = objectToFormData(data);
    return ApiClient.post(
      API_ENDPOINTS.UPDATE_CATEGORY.replace(":id", id) + "?_method=PUT",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  deleteCategory: (id: string): Promise<any> =>
    ApiClient.delete(API_ENDPOINTS.DELETE_CATEGORY.replace(":id", id)),
};

export default categoryClient;
