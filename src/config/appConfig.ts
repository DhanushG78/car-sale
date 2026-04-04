import { AppConfig } from '../types/config';

export const appConfig: AppConfig = {
  appName: "AutoBazaar",

  entity: {
    name: "Car",
    route: "cars",
  },

  fields: [
    { name: "title", label: "Title", type: "text", required: true, placeholder: "e.g. 2022 Honda City V MT" },
    { name: "brand", label: "Brand", type: "text", required: true, placeholder: "e.g. Honda" },
    { name: "model", label: "Model", type: "text", required: true, placeholder: "e.g. City" },
    { name: "year", label: "Year", type: "number", required: true, placeholder: "e.g. 2022" },
    { name: "price", label: "Price", type: "number", required: true, placeholder: "e.g. 1200000" },
    { name: "fuelType", label: "Fuel Type", type: "select", required: true, options: ["petrol", "diesel", "electric"] },
    { name: "transmission", label: "Transmission", type: "select", required: true, options: ["manual", "automatic"] },
    { name: "kmDriven", label: "KM Driven", type: "number", required: true, placeholder: "e.g. 15000" },
    { name: "ownerType", label: "Owner Type", type: "select", required: true, options: ["1st", "2nd", "3rd"] },

    { name: "location", label: "Location", type: "text", required: true, placeholder: "e.g. Mumbai, Maharashtra" },
    { name: "color", label: "Color", type: "text", required: false, placeholder: "e.g. Pearl White" },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "image", label: "Car Image", type: "file", required: true, placeholder: "Upload car image" },
  ],

  features: {
    auth: true,
    admin: true,
  },
};