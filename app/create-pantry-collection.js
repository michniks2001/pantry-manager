import { firestore } from "./firebaseconfig";

const pantries = firestore.collection("pantires");
export default pantries;
