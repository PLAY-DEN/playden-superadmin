import { ApiClient } from ".";
import { objectToFormData } from "../../utils/utils";
import { IParams } from "../../types/client";
import API_ENDPOINTS from "./_endpoint";

const pitchClient = {
    getPitches: (params: IParams): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.GET_PITCHES, params),

    getPitch: (params: IParams, id: any): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.GET_PITCH.replace(":id", id), params),
    createPitch: (data: any): Promise<any> => {
        const formData = objectToFormData(data);
        return ApiClient.post(API_ENDPOINTS.CREATE_PITCH, formData, { headers: { "Content-Type": "multipart/form-data" } })
    },
    updatePitch: (data: any, id: string): Promise<any> => {
        const formData = objectToFormData(data);
        return ApiClient.post(API_ENDPOINTS.UPDATE_PITCH.replace(":id", id) +
            "?_method=PUT", formData, { headers: { "Content-Type": "multipart/form-data" } })
    },
    deleteFarm: (id: string): Promise<any> =>
        ApiClient.delete(API_ENDPOINTS.DELETE_PITCH.replace(":id", id)),
    getOwnerPitches: (params: IParams, ownerId: string): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.GET_OWNER_PITCHES.replace(":ownerId", ownerId), params),
    getPitchBookings: (params: IParams, pitchId: string): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.GET_PITCH_BOOKINGS.replace(":pitchId", pitchId), params),
    getPitchOwners: (params: IParams): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.GET_USERS, params),

};

export default pitchClient;
