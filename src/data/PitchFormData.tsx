import { toast } from "react-toastify";

export interface FormData {
  name: string;
  amountPerHour: string;
  discount: string;
  address: string;
  category_id: string;
  contact: string;
  openingHours: string;
  closingHours: string;
  size: string;
  // pitchManager: string;
  // managerContact: string;
  owner_id: string;
  manager_id: string;
  location: { latitude: string; longitude: string };
  amenities: any[] | null;
  facilities: any[] | null;
  image: File | any | null;
  // gallery: any[];
  [key: string]: any; // Add index signature
}

export const defaultValues = {
  name: "",
  amountPerHour: "",
  discount: "",
  address: "",
  category_id: "",
  contact: "",
  openingHours: "",
  closingHours: "",
  size: "",
  // pitchManager: "",
  // managerContact: "",
  owner_id: "",
  manager_id: "",
  location: { latitude: "", longitude: "" },
  amenities: [],
  facilities: [],
  image: null,
  // gallery: [],
};

export const fetchData = async (
  clientMethod: (arg0: any) => any,
  params: any,
  formatter: (arg0: any) => any,
  setState: (arg0: any) => void,
  errorMessage: any,
  setIsLoading: (arg0: boolean) => void
) => {
  setIsLoading(true);
  try {
    const response = await clientMethod(params);
    const formattedData = formatter(response.data);
    setState(formattedData);
  } catch (error) {
    toast.error(errorMessage);
    console.error("Error:", error);
  } finally {
    setIsLoading(false);
  }
};

export const amenitiesOptions = [
  { label: "Changing Room", value: "Changing Room" },
  { label: "Capacity", value: "Capacity" },
  { label: "Sitting Area", value: "Sitting Area" },
];

export const facilitiesOptions = [
  { label: "Swimming Pool", value: "Swimming Pool" },
  { label: "Garden", value: "Garden" },
  { label: "Tennis Court", value: "Tennis Court" },
  { label: "Gym", value: "Gym" },
  { label: "Wifi", value: "Wifi" },
  { label: "Spa", value: "Spa" },
  { label: "Restaurant", value: "Restaurant" },
];
