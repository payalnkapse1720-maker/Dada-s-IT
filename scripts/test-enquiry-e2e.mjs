import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length > 0) {
        let val = values.join("=").trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
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

console.log("===============================================================");
console.log("🧪 Public Enquiry -> Live Firestore -> Admin Real-Time Listener E2E Test");
console.log("   Target Firebase Project:", firebaseConfig.projectId);
console.log("===============================================================\n");

// 1. Initialize unauthenticated public app
const publicApp = initializeApp(firebaseConfig, "PublicApp");
const publicDb = getFirestore(publicApp);

// 2. Initialize authenticated admin app (simulating Admin Panel / Enquiries page)
const adminApp = initializeApp(firebaseConfig, "AdminApp");
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);

async function testE2E() {
  const email = process.env.ADMIN_EMAIL || "admin@dadasit.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123456";

  console.log(`1. Admin Panel Logging In (${email})...`);
  const adminUser = await signInWithEmailAndPassword(adminAuth, email, password);
  console.log(`   ✓ Admin Authenticated! UID: ${adminUser.user.uid}\n`);

  // Step 2: Set up Admin real-time listener (same query as AdminEnquiriesPage)
  console.log("2. Admin Panel: Subscribing to live 'enquiries' collection via onSnapshot...");
  let resolveListenerReceived;
  const listenerPromise = new Promise((resolve) => {
    resolveListenerReceived = resolve;
  });

  const testTicketEmail = `e2e.test.${Date.now()}@corporateclient.com`;
  const testTicketName = "Mahesh Deshpande";
  let createdDocId = null;

  const q = query(collection(adminDb, "enquiries"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      console.log(`   [Admin Real-Time Listener Triggered] Total tickets in view: ${snapshot.docs.length}`);
      const found = snapshot.docs.find((d) => d.data().email === testTicketEmail);
      if (found) {
        console.log(`   🎯 [MATCH DETECTED] Real-time listener received newly created enquiry!`);
        console.log(`      ID: ${found.id}`);
        console.log(`      Name: ${found.data().name}`);
        console.log(`      Email: ${found.data().email}`);
        console.log(`      Message: ${found.data().message}`);
        console.log(`      Status: ${found.data().status}`);
        resolveListenerReceived(found.id);
      }
    },
    (err) => {
      console.error("   ❌ Admin listener error:", err);
    }
  );

  // Give listener a moment to initialize
  await new Promise((r) => setTimeout(r, 1500));

  // Step 3: Simulate public unauthenticated visitor submitting Consultation Form
  console.log("\n3. Public Visitor: Submitting Consultation Form (Unauthenticated)...");
  const docRef = doc(collection(publicDb, "enquiries"));
  createdDocId = docRef.id;

  const publicPayload = {
    enquiryId: createdDocId,
    id: createdDocId,
    name: testTicketName,
    firstName: "Mahesh",
    lastName: "Deshpande",
    email: testTicketEmail,
    mobile: "+91 99887 66554",
    phone: "+91 99887 66554",
    company: "Deshpande Engineering & Tech",
    type: "technical",
    inquiryType: "technical",
    productId: "",
    productName: "",
    serviceId: "srv_003",
    serviceName: "Networking Solutions",
    message: "Requirement for 10G fiber backbone installation and structured cabling for 2-acre manufacturing plant.",
    status: "new",
    source: "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, publicPayload);
  console.log(`   ✓ Form successfully submitted to Firestore with doc ID: ${createdDocId}\n`);

  // Step 4: Wait for Admin real-time listener to receive the update
  console.log("4. Waiting for Admin Panel onSnapshot to receive the new document...");
  const receivedId = await Promise.race([
    listenerPromise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout waiting for real-time listener")), 10000)),
  ]);

  console.log(`\n5. Verifying direct Firestore document read for ID: "${receivedId}"...`);
  const snap = await getDoc(doc(adminDb, "enquiries", receivedId));
  if (snap.exists()) {
    console.log(`   ✓ Direct getDoc verified! Record is fully intact in live database.`);
  } else {
    throw new Error("Document was not found in Firestore getDoc");
  }

  // Clean up listener
  unsubscribe();

  console.log("\n===============================================================");
  console.log("✅ FULL END-TO-END ENQUIRY WORKFLOW TEST PASSED WITH 100% SUCCESS!");
  console.log("===============================================================\n");

  process.exit(0);
}

testE2E().catch((err) => {
  console.error("\n❌ E2E Test Failed:", err);
  process.exit(1);
});
