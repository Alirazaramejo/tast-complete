import { child, get, push, ref, set,onValue } from "firebase/database"
import { db,imageDb } from "../Firebase/firebaseConfig"
import { productEntity } from "../lib/firebase.entities.js"
import { toast } from 'react-toastify';
import { ref as storageRef, uploadBytes ,getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const dbRef = ref(db)

export const getAllProducts = async () => {
    try {
        const response = await get(child(dbRef, productEntity))

        if (response.exists()) {
            const data = response.val()
            return Object.values(data)
        }
    } catch (error) {
        console.error('Error', error)
    }
}


export const addProduct = async (data) => {
    console.log(data); // Logging form data for debugging

    try {
        // Upload the image to Firebase Storage
        const imageFile = data.upload[0].originFileObj; // Extracting the image file from Ant Design Upload component
        const storageImageRef = storageRef(imageDb, `images/${imageFile.name}`);
        await uploadBytes(storageImageRef, imageFile);

        // Get the download URL of the uploaded image
        const downloadUrl = await getDownloadURL(storageImageRef);

        // Save product data along with the image URL to Firebase Realtime Database
        const productKey = push(ref(db, 'products')).key;
        const productRef = ref(db, `products/${productKey}`);

        // Set product data including image URL
        await set(productRef, {
            pid: productKey,
            imageUrl: downloadUrl,
            ...data
        });

        // Show success toast message
        toast.success('Product added successfully!');

        return { success: true, productId: productKey };
    } catch (error) {
        console.error('Error adding product:', error);

        // Show error toast message
        toast.error('Failed to add product.');

        return { success: false, error };
    }
};


export const getProductData = async (id) => {
    try {
        const response = await get(child(dbRef, productEntity+'/'+id))

        if (response.exists()) {
            const data = response.val()
            return Object.values(data)
        }
    } catch (error) {
        console.error('Error', error)
    }
  };