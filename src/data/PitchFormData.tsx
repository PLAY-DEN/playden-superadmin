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
  // booking_above_2_hours_discount: number;
  hourlyDiscounts: { hours: number; discount: number } | any | null;
  discount_description: string | null;
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
  // booking_above_2_hours_discount: 0,
  hourlyDiscounts: null,
  discount_description: null,
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
  { label: "Bibs", value: "Bibs" },
  { label: "Football", value: "Football" },
  { label: "Rackets", value: "Rackets" },
];

// Facilities to add: toilet, parking
export const facilitiesOptions = [
  { label: "Swimming Pool", value: "Swimming Pool" },
  { label: "Garden", value: "Garden" },
  { label: "Tennis Court", value: "Tennis Court" },
  { label: "Gym", value: "Gym" },
  { label: "Wifi", value: "Wifi" },
  { label: "Spa", value: "Spa" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Toilet", value: "Toilet" },
  { label: "Parking", value: "Parking" },
];

export const validateHourlyDiscounts = (hourlyDiscounts: any[]) => {
  if (!hourlyDiscounts || hourlyDiscounts.length === 0) return null;

  const invalidDiscounts = hourlyDiscounts.filter(
    (item) =>
      !item.hours ||
      item.hours <= 0 ||
      item.discount === undefined ||
      item.discount === ""
  );

  return invalidDiscounts.length > 0
    ? "Each hourly discount must have a valid hours value (> 0) and a discount value."
    : null;
};
