
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

const firebaseConfig = {
  apiKey: "AIzaSyChKxuISWieAxRlIBGMESoerRLGcUfTWBo",
  authDomain: "used-car-marketplace-9b3a4.firebaseapp.com",
  projectId: "used-car-marketplace-9b3a4",
  storageBucket: "used-car-marketplace-9b3a4.firebasestorage.app",
  messagingSenderId: "422898935713",
  appId: "1:422898935713:web:43441285d5b3c8645a0de0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function publishCar() {
  const imagePath = "d:/Internship/Projects/car-sale/public/car-verna.jpg";
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  const carData = {
    title: "Hyundai Verna SX – Well Maintained, Single Owner",
    brand: "Hyundai",
    model: "Verna",
    year: 2019,
    price: 950000,
    fuelType: "petrol",
    transmission: "manual",
    kmDriven: 45000,
    ownerType: "1st",
    location: "Mumbai, MH",
    color: "White",
    description: "Well-maintained Hyundai Verna in excellent condition. The car has been regularly serviced and driven carefully. No major accidents or issues. Smooth engine performance, comfortable interiors, and great mileage. Ideal for city as well as highway driving. All documents are up to date.",
    image: base64Image,
    sellerId: "manual_upload",
    createdAt: new Date().toISOString(),
    status: "available"
  };

  try {
    const docRef = await addDoc(collection(db, "cars"), carData);
    console.log("Document written with ID: ", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("Error adding document: ", e);
    process.exit(1);
  }
}

publishCar();
