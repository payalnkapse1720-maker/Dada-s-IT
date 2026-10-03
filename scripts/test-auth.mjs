import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from "firebase/auth";
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

async function testAuth() {
  console.log("Testing Auth with project:", firebaseConfig.projectId);

  // Try creating an admin account or signing in
  const email = "admin@dadasit.com";
  const pass = "Admin@123456";

  try {
    console.log(`Attempting sign in with ${email}...`);
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    console.log("✓ Signed in successfully as:", userCred.user.email, userCred.user.uid);
    return userCred.user;
  } catch (err) {
    console.log("Sign-in failed with error code:", err.code);
    if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
      try {
        console.log(`Attempting to create user ${email}...`);
        const userCred = await createUserWithEmailAndPassword(auth, email, pass);
        console.log("✓ Created user successfully:", userCred.user.email, userCred.user.uid);
        return userCred.user;
      } catch (createErr) {
        console.log("User creation error:", createErr.code, createErr.message);
      }
    }
  }

  // Try anonymous
  try {
    console.log("Attempting anonymous sign in...");
    const anon = await signInAnonymously(auth);
    console.log("✓ Anonymous sign in successful:", anon.user.uid);
    return anon.user;
  } catch (anonErr) {
    console.log("Anonymous sign-in error:", anonErr.code, anonErr.message);
  }
}

testAuth().then(() => process.exit(0)).catch((err) => {
  console.error("Test auth fatal error:", err);
  process.exit(1);
});
