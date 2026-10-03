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
console.log("🔥 Cloud Firestore Live Populator & Verification Engine");
console.log("   Target Firebase Project:", firebaseConfig.projectId);
console.log("===============================================================\n");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function run() {
  const email = process.env.ADMIN_EMAIL || "admin@dadasit.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123456";

  console.log(`1. Authenticating as administrator (${email})...`);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log(`   ✓ Authenticated successfully! UID: ${userCredential.user.uid}\n`);

  console.log("2. Writing documents to Cloud Firestore...\n");

  // -------------------------------------------------------------
  // 1. ADMINS COLLECTION
  // -------------------------------------------------------------
  console.log("   --> Populating 'admins' collection...");
  const admins = [
    {
      adminId: "admin_001",
      name: "Main Admin",
      email: "admin@dadasit.com",
      role: "super_admin",
      isActive: true,
      profileImage: "",
    },
    {
      adminId: "admin_002",
      name: "Content Manager",
      email: "content@dadasit.com",
      role: "content_manager",
      isActive: true,
      profileImage: "",
    },
  ];

  for (const admin of admins) {
    await setDoc(
      doc(db, "admins", admin.adminId),
      {
        ...admin,
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created admin: admins/${admin.adminId}`);
  }

  // -------------------------------------------------------------
  // 2. CATEGORIES COLLECTION
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'categories' collection...");
  const categories = [
    {
      categoryId: "cat_001",
      name: "Computers & Laptops",
      slug: "computers-laptops",
      description: "Computers, laptops and related IT systems.",
      image: "https://dada-s-it.vercel.app/images/services/computer-repair.jpg",
      icon: "laptop",
      isActive: true,
      order: 1,
    },
    {
      categoryId: "cat_002",
      name: "Desktops & Workstations",
      slug: "desktops-workstations",
      description: "High performance desktop computers and enterprise workstations.",
      image: "",
      icon: "monitor",
      isActive: true,
      order: 2,
    },
    {
      categoryId: "cat_003",
      name: "Computer Components",
      slug: "computer-components",
      description: "RAM, SSDs, GPUs, motherboards and internal hardware components.",
      image: "",
      icon: "cpu",
      isActive: true,
      order: 3,
    },
    {
      categoryId: "cat_004",
      name: "Networking Equipment",
      slug: "networking-equipment",
      description: "Managed switches, routers, firewalls, and structured cabling equipment.",
      image: "",
      icon: "network",
      isActive: true,
      order: 4,
    },
    {
      categoryId: "cat_005",
      name: "CCTV & Security",
      slug: "cctv-security",
      description: "4K IP surveillance cameras, NVRs, DVRs and security monitoring systems.",
      image: "",
      icon: "video",
      isActive: true,
      order: 5,
    },
    {
      categoryId: "cat_006",
      name: "Access Control & Attendance",
      slug: "access-control-attendance",
      description: "Biometric attendance terminals, RFID readers and electronic door locks.",
      image: "",
      icon: "fingerprint",
      isActive: true,
      order: 6,
    },
    {
      categoryId: "cat_007",
      name: "Servers & Storage",
      slug: "servers-storage",
      description: "Rack servers, blade servers, NAS and enterprise SAN storage.",
      image: "",
      icon: "server",
      isActive: true,
      order: 7,
    },
    {
      categoryId: "cat_008",
      name: "Printers & Scanners",
      slug: "printers-scanners",
      description: "Enterprise laser printers, multifunction scanners and thermal printers.",
      image: "",
      icon: "printer",
      isActive: true,
      order: 8,
    },
    {
      categoryId: "cat_009",
      name: "UPS & Power Backup",
      slug: "ups-power-backup",
      description: "Online UPS, industrial power backup and voltage regulation systems.",
      image: "",
      icon: "zap",
      isActive: true,
      order: 9,
    },
    {
      categoryId: "cat_010",
      name: "Accessories",
      slug: "accessories",
      description: "IT accessories, cables, adapters, peripherals and mounting kits.",
      image: "",
      icon: "package",
      isActive: true,
      order: 10,
    },
  ];

  for (const cat of categories) {
    await setDoc(
      doc(db, "categories", cat.categoryId),
      {
        ...cat,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created category: categories/${cat.categoryId} (${cat.name})`);
  }

  // -------------------------------------------------------------
  // 3. SERVICES COLLECTION (Matching screenshot format)
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'services' collection...");
  const services = [
    {
      serviceId: "srv_001",
      name: "Computer Repair & Maintenance",
      slug: "computer-repair-maintenance",
      description:
        "Complete computer repair and maintenance services including hardware & software troubleshooting, OS installation, performance optimization and regular servicing for personal and business systems.",
      icon: "laptop",
      image: "https://dada-s-it.vercel.app/images/services/computer-repair.jpg",
      isActive: true,
      order: 1,
    },
    {
      serviceId: "srv_002",
      name: "CCTV Installation",
      slug: "cctv-installation",
      description:
        "Professional HD & IP CCTV camera installation, configuration, remote mobile viewing setup, and ongoing maintenance for homes and commercial facilities.",
      icon: "video",
      image: "https://dada-s-it.vercel.app/images/services/cctv-installation.jpg",
      isActive: true,
      order: 2,
    },
    {
      serviceId: "srv_003",
      name: "Networking Solutions",
      slug: "networking-solutions",
      description:
        "End-to-end structured cabling, LAN/WAN setup, Wi-Fi deployment, managed switches, routers, and secure VPN connections for business infrastructure.",
      icon: "network",
      image: "https://dada-s-it.vercel.app/images/services/networking-solutions.jpg",
      isActive: true,
      order: 3,
    },
    {
      serviceId: "srv_004",
      name: "Automation & Smart Devices",
      slug: "automation-smart-devices",
      description:
        "Smart home and workplace automation, IoT device integration, biometric access control, smart lighting, and centralized monitoring systems.",
      icon: "cpu",
      image: "https://dada-s-it.vercel.app/images/services/automation.jpg",
      isActive: true,
      order: 4,
    },
    {
      serviceId: "srv_005",
      name: "IT Support & AMC",
      slug: "it-support-amc",
      description:
        "Annual Maintenance Contracts (AMC), on-site and remote technical support, system health monitoring, and emergency IT troubleshooting.",
      icon: "headphones",
      image: "https://dada-s-it.vercel.app/images/services/it-support-amc.jpg",
      isActive: true,
      order: 5,
    },
    {
      serviceId: "srv_006",
      name: "Software Installation",
      slug: "software-installation",
      description:
        "Genuine operating system installation, antivirus deployment, enterprise software licensing, ERP setup, and system configuration.",
      icon: "file-code",
      image: "https://dada-s-it.vercel.app/images/services/software-installation.jpg",
      isActive: true,
      order: 6,
    },
    {
      serviceId: "srv_007",
      name: "Data Recovery",
      slug: "data-recovery",
      description:
        "Advanced data recovery from corrupted hard drives, SSDs, memory cards, RAID arrays, and accidental file deletion with strict privacy compliance.",
      icon: "hard-drive",
      image: "https://dada-s-it.vercel.app/images/services/data-recovery.jpg",
      isActive: true,
      order: 7,
    },
    {
      serviceId: "srv_008",
      name: "Website & IT Consulting",
      slug: "website-it-consulting",
      description:
        "Custom web development, domain and cloud hosting management, IT consulting, digital infrastructure audit, and technology roadmap planning.",
      icon: "globe",
      image: "https://dada-s-it.vercel.app/images/services/web-consulting.jpg",
      isActive: true,
      order: 8,
    },
  ];

  for (const srv of services) {
    await setDoc(
      doc(db, "services", srv.serviceId),
      {
        ...srv,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created service: services/${srv.serviceId} (${srv.name})`);
  }

  // -------------------------------------------------------------
  // 4. PRODUCTS COLLECTION
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'products' collection...");
  const products = [
    {
      productId: "product_001",
      name: "Enterprise 48-Port PoE+ Managed Gigabit Switch",
      slug: "enterprise-48-port-poe-managed-switch",
      categoryId: "cat_004",
      categoryName: "Networking Equipment",
      brand: "Cisco / Ubiquiti",
      description:
        "Layer 3 managed switch featuring 48 Gigabit Ethernet PoE+ ports and 4x 10G SFP+ uplink ports. Designed for heavy enterprise campus backbones and IP CCTV power delivery.",
      shortDescription: "48-Port PoE+ Layer 3 Gigabit Managed Switch with 4x 10G SFP+ Uplinks.",
      price: 0,
      mrp: 0,
      discount: 0,
      currency: "INR",
      sku: "NET-SW-48POE",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      ],
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      specifications: {
        Ports: "48x RJ45 GbE PoE+ (370W / 740W budget), 4x 10G SFP+",
        "Switching Capacity": "176 Gbps",
        "Forwarding Rate": "130.95 Mpps",
        "Layer Support": "Layer 2+ / Layer 3 Static Routing & DHCP Server",
        Warranty: "3-Year Advanced Hardware Replacement",
      },
      features: [
        "48 Gigabit PoE+ Ports with up to 740W power budget",
        "4x 10G SFP+ Uplinks for ultra-high-speed stacking",
        "Advanced VLAN, QoS, and ACL security controls",
        "Automated PoE scheduling and port watchdog",
      ],
      availability: "in_stock",
      stockQuantity: 15,
      condition: "new",
      warranty: "3-Year Manufacturer Warranty",
      isFeatured: true,
      isActive: true,
    },
    {
      productId: "product_002",
      name: "4K Ultra HD AI Starlight IP Dome Camera",
      slug: "4k-ultra-hd-ai-starlight-ip-dome-camera",
      categoryId: "cat_005",
      categoryName: "CCTV & Security",
      brand: "Hikvision / CP Plus / Dahua",
      description:
        "8MP (3840x2160) Starlight AI Dome Camera with motor-driven varifocal lens, ColorVu low-light sensor, perimeter tripwire detection, and IP67 / IK10 weatherproof vandal casing.",
      shortDescription: "8MP 4K UHD Starlight AI IP Dome Camera with Motorized Zoom & Night Vision.",
      price: 0,
      mrp: 0,
      discount: 0,
      currency: "INR",
      sku: "CCTV-CAM-4K-AI",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC9djt2MVNla-2Fe45oT-ZKwGVSqbkLy36Zbv8dWlS4Y8ldzM2IcW9IIXl-JiUi81KBBy6s8Y7CNvSdnQMxd_vfRqaRTbpv2IrU-XzlcO4p1V3K5QgZJe1NvJ79oOQ4hrslqLw1QrMNeh3-eiGZnu8Fxvi-14aBt8tzAFzJLXu1s6Vo8gSEk5-043GYfe9ojeKMgY7rrBujMuiN5s4kXpLr3rK4caT9jsBq6QijhG9QeVY_W8EBpe65JA",
      ],
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC9djt2MVNla-2Fe45oT-ZKwGVSqbkLy36Zbv8dWlS4Y8ldzM2IcW9IIXl-JiUi81KBBy6s8Y7CNvSdnQMxd_vfRqaRTbpv2IrU-XzlcO4p1V3K5QgZJe1NvJ79oOQ4hrslqLw1QrMNeh3-eiGZnu8Fxvi-14aBt8tzAFzJLXu1s6Vo8gSEk5-043GYfe9ojeKMgY7rrBujMuiN5s4kXpLr3rK4caT9jsBq6QijhG9QeVY_W8EBpe65JA",
      specifications: {
        Resolution: "8 Megapixels (3840 x 2160) @ 30fps",
        Lens: "2.8mm - 12mm Motorized Varifocal",
        "Night Vision": "Smart IR up to 50 meters + ColorVu Night Visibility",
        "AI Features": "Human/Vehicle Target Classification, ANPR Ready",
        Rating: "IP67 Weatherproof, IK10 Vandal-Proof",
      },
      features: [
        "Real-time 4K 8MP resolution with Starlight low-light clarity",
        "Motorized varifocal optical zoom lens",
        "AI human and vehicle shape classification",
        "Heavy-duty IK10 vandal-proof dome enclosure",
      ],
      availability: "in_stock",
      stockQuantity: 40,
      condition: "new",
      warranty: "2-Year Manufacturer Warranty",
      isFeatured: true,
      isActive: true,
    },
    {
      productId: "product_003",
      name: "AI Face Recognition & Touchless Biometric Terminal",
      slug: "ai-face-recognition-touchless-biometric-terminal",
      categoryId: "cat_006",
      categoryName: "Access Control & Attendance",
      brand: "ZKTeco / eSSL / Suprema",
      description:
        "High-speed multi-modal attendance & access controller with dual-camera anti-spoofing facial recognition, RFID reader, and cloud attendance software integration.",
      shortDescription: "High-speed AI facial recognition and contactless RFID time-attendance terminal.",
      price: 0,
      mrp: 0,
      discount: 0,
      currency: "INR",
      sku: "BIO-FAC-TERM-01",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      ],
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      specifications: {
        Capacity: "10,000 Faces, 10,000 Fingerprints, 50,000 Cards",
        "Recognition Speed": "< 0.2 seconds per user",
        Display: "5-inch IPS Touchscreen with Anti-glare Glass",
        Connectivity: "TCP/IP, Wi-Fi, RS485, Wiegand Out",
        "Software Sync": "Direct API for ERP, SAP & Payroll Software",
      },
      features: [
        "Instant face recognition under 0.2 seconds",
        "Anti-spoofing live face liveness detection",
        "Integrated RFID smart card and pin entry support",
        "Seamless ERP / HRMS payroll integration",
      ],
      availability: "in_stock",
      stockQuantity: 25,
      condition: "new",
      warranty: "2-Year On-Site AMC Support",
      isFeatured: true,
      isActive: true,
    },
    {
      productId: "product_004",
      name: "Enterprise 2U Rack Server (Dual Intel Xeon / 128GB ECC)",
      slug: "enterprise-2u-rack-server-dual-xeon",
      categoryId: "cat_007",
      categoryName: "Servers & Storage",
      brand: "Dell PowerEdge / HPE ProLiant",
      description:
        "High-density 2U dual-socket rack server optimized for virtualization, database hosting, and high-performance computing workloads. Equipped with redundant titanium power supplies.",
      shortDescription: "Enterprise 2U Rack Server with Dual Intel Xeon Processors & 128GB ECC RAM.",
      price: 0,
      mrp: 0,
      discount: 0,
      currency: "INR",
      sku: "SRV-RACK-2U-XEON",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
      ],
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
      specifications: {
        Processor: "Dual Intel Xeon Silver / Gold Scalable (up to 64 Cores)",
        Memory: "128GB DDR5 ECC Registered (Expandable to 2TB)",
        "Drive Bays": "8x 3.5\" / 16x 2.5\" Hot-plug SAS/SATA/NVMe SSD bays",
        RAID: "Hardware PERC H755 with 8GB NV Flash Backed Cache",
        Management: "Dedicated iDRAC9 Enterprise / HPE iLO 6",
      },
      features: [
        "Dual Intel Xeon Scalable Multi-Core Architecture",
        "Hot-swappable redundant power supplies & fans",
        "Hardware RAID controller with battery cache backup",
        "Enterprise remote out-of-band management console",
      ],
      availability: "in_stock",
      stockQuantity: 8,
      condition: "new",
      warranty: "3-Year ProSupport Mission Critical Onsite",
      isFeatured: true,
      isActive: true,
    },
    {
      productId: "product_005",
      name: "Business Executive Laptop (Intel Core i7 / 16GB / 512GB SSD)",
      slug: "business-executive-laptop-i7",
      categoryId: "cat_001",
      categoryName: "Computers & Laptops",
      brand: "Dell Latitude / Lenovo ThinkPad / HP EliteBook",
      description:
        "Engineered for corporate durability and high performance, featuring military-grade MIL-STD testing, enterprise security TPM 2.0 chip, and all-day battery life.",
      shortDescription: "Premium business laptop with Intel Core i7, 16GB RAM, 512GB NVMe SSD.",
      price: 0,
      mrp: 0,
      discount: 0,
      currency: "INR",
      sku: "LAP-BUS-I7-16G",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      ],
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      specifications: {
        Processor: "Intel Core i7 13th / 14th Gen vPro",
        RAM: "16GB DDR5 5200MHz (Upgradable to 64GB)",
        Storage: "512GB PCIe Gen4 NVMe M.2 SSD",
        Display: '14.0" FHD+ (1920 x 1200) Anti-Glare IPS 400 nits',
        Security: "Fingerprint Reader, TPM 2.0, Privacy Shutter",
      },
      features: [
        "MIL-STD-810H tested rugged business chassis",
        "Hardware-level TPM 2.0 data encryption",
        "Fast charging with up to 12 hours battery life",
        "Preloaded Windows 11 Pro 64-bit Genuine",
      ],
      availability: "in_stock",
      stockQuantity: 30,
      condition: "new",
      warranty: "3-Year Onsite Next Business Day Warranty",
      isFeatured: false,
      isActive: true,
    },
    {
      productId: "product_006",
      name: "Enterprise 10kVA Online Double Conversion UPS",
      slug: "enterprise-10kva-online-ups",
      categoryId: "cat_009",
      categoryName: "UPS & Power Backup",
      brand: "APC / Eaton / Vertiv",
      description:
        "Zero-transfer-time online double-conversion UPS safeguarding sensitive server rooms, network racks, and medical IT systems from surges, sags, and prolonged outages.",
      shortDescription: "10kVA / 10kW Online Double Conversion UPS for Data Centers & Server Rooms.",
      price: 0,
      mrp: 0,
      discount: 0,
      currency: "INR",
      sku: "UPS-ONL-10KVA",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
      ],
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
      specifications: {
        Capacity: "10 kVA / 10 kW Pure Sine Wave",
        Topology: "True Online Double Conversion with DSP Control",
        "Input Voltage": "Three-Phase 400V / Single-Phase 230V Wide Range",
        "Transfer Time": "0 ms (Zero Transfer Time)",
        Management: "SNMP Card Slot, USB, RS232, LCD Status Panel",
      },
      features: [
        "Zero millisecond transfer time for continuous clean power",
        "High power factor (PF 1.0) for maximum efficiency",
        "Network management SNMP monitoring card integration",
        "Hot-swappable external battery cabinet scalability",
      ],
      availability: "in_stock",
      stockQuantity: 6,
      condition: "new",
      warranty: "2-Year Comprehensive Warranty including Batteries",
      isFeatured: false,
      isActive: true,
    },
  ];

  for (const prod of products) {
    await setDoc(
      doc(db, "products", prod.productId),
      {
        ...prod,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created product: products/${prod.productId} (${prod.name})`);
  }

  // -------------------------------------------------------------
  // 5. PROJECTS COLLECTION
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'projects' collection...");
  const projects = [
    {
      projectId: "project_001",
      title: "Enterprise Multi-Facility Network & CCTV Modernization",
      slug: "ador-welding-network-cctv",
      clientName: "Ador Welding Ltd.",
      location: "Pune & Mumbai Facilities",
      category: "Heavy Manufacturing & Industrial",
      description:
        "Engineered a high-throughput fiber backbone network and comprehensive AI-assisted CCTV surveillance system across multi-acre manufacturing plants, integrating central command monitoring with 99.9% uptime SLA.",
      services: ["Structural Networking", "CCTV Surveillance", "ITFMS Managed IT", "Access Control"],
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCIopu5eeWs0FbQ1ZlTLOn2fBKlmX1D-0aQX71PTGQmC1ycUCBWXI6geO2kQy5WigFAWA6OpcNCd9AzqrLdGV4nHymtFb1ykQNDMslAU7k-crYNmDrJKurla0U7FznKaCiHI2kE9DXN7gndRWkABtid_0566K--XgWRq8R1G-kkjSEiEt3fzCW_u4oJbNLCIRGKoyB4cChgZMzdlCV6CsMwGxP48xotUDJ9ou1IUL3T02eYsAU4gKNQ0w",
      ],
      technologies: ["10G Armored Fiber", "Cisco Catalyst", "Hikvision 4K IP", "ZKTeco Biometrics"],
      year: "2024",
      isFeatured: true,
      isActive: true,
    },
    {
      projectId: "project_002",
      title: "High-Security Access Control & Stadium Surveillance Infrastructure",
      slug: "mca-mumbai-security-surveillance",
      clientName: "MCA Mumbai",
      location: "Mumbai",
      category: "Sports & Public Infrastructure",
      description:
        "Designed and deployed a state-of-the-art turnstile access control and stadium-wide 4K PTZ surveillance system capable of processing high-volume spectator ingress with zero latency.",
      services: ["Access Control", "High-Density CCTV", "Biometrics", "Perimeter Security"],
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWtX4-Ox2hlUr-8KDDMO0LCvdFdw7oHPPNsScX8yKkfRlgr24sq_u0qtkyQ6FFyZq4nKDehhUqCl5_Hx5IMW5tdHa3NPBfyePX8DiRuJ1EC7b1odrhRjb1oARa18Btsj1GcHD3u-VH999X4aJiAwxbuZwxuiy56sboOJzQwHT8Y_ipwMNwXrd4UGqM0-tJIgtHYPJhn2jiLAiwEoZxfgyYj-Qjxt6PpMkD6IOzek7PBsRqt5AIun9bZQ",
      ],
      technologies: ["Optical Turnstiles", "4K PTZ Tracking", "Video Wall Controller", "RFID Readers"],
      year: "2023",
      isFeatured: true,
      isActive: true,
    },
    {
      projectId: "project_003",
      title: "Industrial Campus IT Infrastructure & Biometric Attendance Integration",
      slug: "godrej-lawkim-campus-infrastructure",
      clientName: "Godrej Lawkim",
      location: "Shirwal Facility",
      category: "Precision Engineering & Manufacturing",
      description:
        "Complete plant-wide structured cabling overhaul, enterprise server rack deployments, and centralized multi-gate biometric workforce attendance synchronized with corporate SAP ERP.",
      services: ["Structured Cabling", "Biometric Solutions", "Server Deployment", "AMC Contract"],
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
      ],
      technologies: ["Single Mode Fiber", "Dell PowerEdge", "SAP API Sync", "AI Face Terminals"],
      year: "2023",
      isFeatured: true,
      isActive: true,
    },
    {
      projectId: "project_004",
      title: "Turnkey Server Virtualization & Comprehensive IT Facility Management",
      slug: "emh-tools-virtualization-itfms",
      clientName: "EMH Tools",
      location: "Industrial Zone",
      category: "Industrial Tooling & Machinery",
      description:
        "Consolidated legacy bare-metal server infrastructure onto high-availability VMware clusters with automated disaster recovery and resident engineer ITFMS support.",
      services: ["Server Management", "ITFMS", "AMC Maintenance", "Data Backup"],
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
      ],
      technologies: ["VMware vSphere", "RAID 10 NVMe", "Veeam Backup", "Dell PowerEdge 2U"],
      year: "2024",
      isFeatured: false,
      isActive: true,
    },
  ];

  for (const proj of projects) {
    await setDoc(
      doc(db, "projects", proj.projectId),
      {
        ...proj,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created project: projects/${proj.projectId} (${proj.title})`);
  }

  // -------------------------------------------------------------
  // 6. ENQUIRIES COLLECTION
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'enquiries' collection...");
  const enquiries = [
    {
      enquiryId: "enquiry_001",
      id: "enquiry_001",
      name: "Rajesh Sharma",
      firstName: "Rajesh",
      lastName: "Sharma",
      email: "rajesh.sharma@example.com",
      mobile: "+91 98201 12345",
      phone: "+91 98201 12345",
      company: "Apex Engineering Works",
      type: "service",
      inquiryType: "technical",
      productId: "",
      productName: "",
      serviceId: "srv_003",
      serviceName: "Networking Solutions",
      message:
        "We require structured Cat6A cabling and managed switch setup for our new 5,000 sq ft office in Navi Mumbai.",
      status: "new",
      source: "website",
    },
    {
      enquiryId: "enquiry_002",
      id: "enquiry_002",
      name: "Sunil Patil",
      firstName: "Sunil",
      lastName: "Patil",
      email: "sunil.patil@example.com",
      mobile: "+91 98202 67890",
      phone: "+91 98202 67890",
      company: "Patil Logistics & Warehousing",
      type: "service",
      inquiryType: "amc",
      productId: "",
      productName: "",
      serviceId: "srv_002",
      serviceName: "CCTV Installation",
      message:
        "Looking for 32-camera IP CCTV installation with remote surveillance and Annual Maintenance Contract.",
      status: "pending",
      source: "website",
    },
  ];

  for (const enq of enquiries) {
    await setDoc(
      doc(db, "enquiries", enq.enquiryId),
      {
        ...enq,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created enquiry: enquiries/${enq.enquiryId} (${enq.name})`);
  }

  // -------------------------------------------------------------
  // 7. QUOTES COLLECTION
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'quotes' collection...");
  const quotes = [
    {
      quoteId: "quote_001",
      id: "quote_001",
      name: "Vikram Mehta",
      fullName: "Vikram Mehta",
      email: "vikram.mehta@example.com",
      mobile: "+91 98330 45678",
      phone: "+91 98330 45678",
      company: "Mehta Infotech Pvt Ltd",
      companyName: "Mehta Infotech Pvt Ltd",
      productId: "product_001",
      productName: "Enterprise 48-Port PoE+ Managed Gigabit Switch",
      quantity: 4,
      message: "Please share bulk quote with 3-year warranty and on-site delivery in Pune.",
      notes: "Please share bulk quote with 3-year warranty and on-site delivery in Pune.",
      status: "pending",
      source: "website",
    },
    {
      quoteId: "quote_002",
      id: "quote_002",
      name: "Anita Deshmukh",
      fullName: "Anita Deshmukh",
      email: "anita.deshmukh@example.com",
      mobile: "+91 98211 98765",
      phone: "+91 98211 98765",
      company: "Deshmukh Hospitals",
      companyName: "Deshmukh Hospitals",
      productId: "product_002",
      productName: "4K Ultra HD AI Starlight IP Dome Camera",
      quantity: 16,
      message: "Need 16 units of 4K AI dome cameras with 30-day recording NVR storage.",
      notes: "Need 16 units of 4K AI dome cameras with 30-day recording NVR storage.",
      status: "pending",
      source: "website",
    },
  ];

  for (const q of quotes) {
    await setDoc(
      doc(db, "quotes", q.quoteId),
      {
        ...q,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created quote: quotes/${q.quoteId} (${q.name})`);
  }

  // -------------------------------------------------------------
  // 8. WEBSITE CONTENT COLLECTION
  // -------------------------------------------------------------
  console.log("\n   --> Populating 'websiteContent' collection...");
  const websiteContent = {
    homepage: {
      heroTitle: "Integrated IT Service & Security Infrastructure",
      heroSubtitle: "Enterprise Technology Solutions",
      heroDescription:
        "Delivering mission-critical IT infrastructure, 4K AI CCTV surveillance, enterprise networking, biometric access control, and 24/7 managed support across Maharashtra & Goa.",
      heroImage: "https://dada-s-it.vercel.app/images/services/computer-repair.jpg",
      ctaText: "Explore Solutions",
      ctaLink: "/services",
    },
    contact: {
      address:
        "Shop No. 04, Ground Floor, Sai Plaza, Near Old Toll Naka, Panvel, Navi Mumbai, Maharashtra 410206",
      phone: "+91 (0) 20 2500 XXXX / +91 98XXX XXXXX",
      email: "contact@dadasit.com",
      whatsapp: "+91 98200 00000",
    },
    about: {
      title: "About DADA'S TECHHUB",
      description:
        "DADA'S TECHHUB is a premier technology integration and managed IT services enterprise specializing in structured cabling, high-security CCTV surveillance, biometric automation, server infrastructure, and end-to-end hardware procurement.",
      image: "https://dada-s-it.vercel.app/images/services/computer-repair.jpg",
    },
  };

  for (const [section, data] of Object.entries(websiteContent)) {
    await setDoc(
      doc(db, "websiteContent", section),
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`       ✓ Created section: websiteContent/${section}`);
  }

  console.log("\n===============================================================");
  console.log("3. VERIFYING FIRESTORE DATA DIRECTLY FROM DATABASE...");
  console.log("===============================================================\n");

  const collectionsToVerify = [
    "admins",
    "categories",
    "services",
    "products",
    "projects",
    "enquiries",
    "quotes",
    "websiteContent",
  ];

  for (const collName of collectionsToVerify) {
    const snap = await getDocs(collection(db, collName));
    console.log(`📁 Collection: [${collName}] -> ${snap.docs.length} documents found`);
    snap.docs.forEach((docSnap) => {
      const d = docSnap.data();
      const label = d.name || d.title || d.heroTitle || d.email || docSnap.id;
      console.log(`   └─ Document ID: "${docSnap.id}" | Label: "${label}"`);
    });
    console.log("");
  }

  console.log("===============================================================");
  console.log("✅ ALL 8 FIRESTORE COLLECTIONS CONFIRMED & VERIFIED LIVE!");
  console.log("===============================================================\n");

  process.exit(0);
}

run().catch((err) => {
  console.error("\n❌ Fatal error during Firestore database operation:", err);
  process.exit(1);
});
