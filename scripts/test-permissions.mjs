import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length > 0) {
        let val = values.join("=").trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key.trim()] = val;
      }
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function testCollections() {
  const email = "admin@dadasit.com";
  const pass = "Admin@123456";
  await signInWithEmailAndPassword(auth, email, pass);
  console.log("Logged in as admin:", auth.currentUser.email);

  const collectionsToTest = [
    "enquiries",
    "quotes",
    "admins",
    "categories",
    "services",
    "products",
    "projects",
    "websiteContent"
  ];

  for (const coll of collectionsToTest) {
    try {
      if (coll === "enquiries") {
        await addDoc(collection(db, coll), {
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
          inquiryType: "technical",
          message: "Testing enquiry submission with valid schema.",
          status: "new",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        console.log(`✓ Write to '${coll}' succeeded!`);
      } else if (coll === "quotes") {
        await addDoc(collection(db, coll), {
          fullName: "Test Customer",
          email: "test@example.com",
          phone: "+919820012345",
          productName: "Test Switch",
          quantity: 1,
          status: "new",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        console.log(`✓ Write to '${coll}' succeeded!`);
      } else {
        await setDoc(doc(db, coll, "test_doc"), {
          test: true,
          updatedAt: serverTimestamp(),
        });
        console.log(`✓ Write to '${coll}' succeeded!`);
      }
    } catch (err) {
      console.log(`✗ Write to '${coll}' failed:`, err.code, err.message);
    }
  }
}

testCollections().then(() => process.exit(0)).catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
