import * as yup from "yup";


export const validationSchema = yup.object({
  momoNumber: yup
    .string()
    .required("Momo number is required")
    .min(10, "Momo number must be at least 10 digits long"),
  provider: yup
    .string()
    .required("Provider is required"),
});
