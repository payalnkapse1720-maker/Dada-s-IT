import { Product } from "@/types";

export const productCategories = [
  "All Categories",
  "Networking Equipment",
  "CCTV & Surveillance",
  "Biometric & Access Control",
  "Servers & Storage",
  "Laptops & Desktops",
  "Computer Components (RAM/SSD/GPU)",
  "Power & UPS Automation"
];

export const productsData: Product[] = [
  {
    id: "net-01",
    name: "Enterprise 48-Port PoE+ Managed Gigabit Switch",
    slug: "enterprise-48-port-poe-managed-switch",
    category: "Networking Equipment",
    brand: "Cisco / Ubiquiti",
    price: "Custom Quote",
    rating: 4.9,
    inStock: true,
    featured: true,
    badge: "Enterprise Standard",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
    description: "Layer 3 managed switch featuring 48 Gigabit Ethernet PoE+ ports and 4x 10G SFP+ uplink ports. Designed for heavy enterprise campus backbones and IP CCTV power delivery.",
    specs: {
      "Ports": "48x RJ45 GbE PoE+ (370W / 740W budget), 4x 10G SFP+",
      "Switching Capacity": "176 Gbps",
      "Forwarding Rate": "130.95 Mpps",
      "Layer Support": "Layer 2+ / Layer 3 Static Routing & DHCP Server",
      "Warranty": "3-Year Advanced Hardware Replacement"
    }
  },
  {
    id: "cctv-01",
    name: "4K Ultra HD AI Starlight IP Dome Camera",
    slug: "4k-ultra-hd-ai-starlight-ip-dome-camera",
    category: "CCTV & Surveillance",
    brand: "Hikvision / CP Plus / Dahua",
    price: "Custom Quote",
    rating: 4.8,
    inStock: true,
    featured: true,
    badge: "Best Seller",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9djt2MVNla-2Fe45oT-ZKwGVSqbkLy36Zbv8dWlS4Y8ldzM2IcW9IIXl-JiUi81KBBy6s8Y7CNvSdnQMxd_vfRqaRTbpv2IrU-XzlcO4p1V3K5QgZJe1NvJ79oOQ4hrslqLw1QrMNeh3-eiGZnu8Fxvi-14aBt8tzAFzJLXu1s6Vo8gSEk5-043GYfe9ojeKMgY7rrBujMuiN5s4kXpLr3rK4caT9jsBq6QijhG9QeVY_W8EBpe65JA",
    description: "8MP (3840x2160) Starlight AI Dome Camera with motor-driven varifocal lens, ColorVu low-light sensor, perimeter tripwire detection, and IP67 / IK10 weatherproof vandal casing.",
    specs: {
      "Resolution": "8 Megapixels (3840 x 2160) @ 30fps",
      "Lens": "2.8mm - 12mm Motorized Varifocal",
      "Night Vision": "Smart IR up to 50 meters + ColorVu Night Visibility",
      "AI Features": "Human/Vehicle Target Classification, ANPR Ready",
      "Rating": "IP67 Weatherproof, IK10 Vandal-Proof"
    }
  },
  {
    id: "bio-01",
    name: "AI Face Recognition & Touchless Biometric Terminal",
    slug: "ai-face-recognition-touchless-biometric-terminal",
    category: "Biometric & Access Control",
    brand: "ZKTeco / eSSL / Suprema",
    price: "Custom Quote",
    rating: 4.9,
    inStock: true,
    featured: true,
    badge: "Contactless",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
    description: "High-speed multi-modal attendance & access controller with dual-camera anti-spoofing facial recognition, RFID reader, and cloud attendance software integration.",
    specs: {
      "Capacity": "10,000 Faces, 10,000 Fingerprints, 50,000 Cards",
      "Recognition Speed": "< 0.2 seconds per user",
      "Display": "5-inch IPS Touchscreen with Anti-glare Glass",
      "Connectivity": "TCP/IP, Wi-Fi, RS485, Wiegand Out",
      "Software Sync": "Direct API for ERP, SAP & Payroll Software"
    }
  },
  {
    id: "srv-01",
    name: "Enterprise 2U Rack Server (Dual Intel Xeon / 128GB ECC)",
    slug: "enterprise-2u-rack-server-dual-xeon",
    category: "Servers & Storage",
    brand: "Dell PowerEdge / HPE ProLiant",
    price: "Custom Quote",
    rating: 5.0,
    inStock: true,
    featured: true,
    badge: "Enterprise Core",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
    description: "High-density 2U dual-socket rack server optimized for virtualization, database hosting, and high-performance computing workloads. Equipped with redundant titanium power supplies.",
    specs: {
      "Processor": "Dual Intel Xeon Silver / Gold Scalable (up to 64 Cores)",
      "Memory": "128GB DDR5 ECC Registered (Expandable to 2TB)",
      "Drive Bays": "8x 3.5\" / 16x 2.5\" Hot-plug SAS/SATA/NVMe SSD bays",
      "RAID": "Hardware PERC H755 with 8GB NV Flash Backed Cache",
      "Management": "Dedicated iDRAC9 Enterprise / HPE iLO 6"
    }
  },
  {
    id: "vdp-01",
    name: "Multi-Apartment IP Video Door Phone & Intercom Station",
    slug: "multi-apartment-ip-video-door-phone",
    category: "Biometric & Access Control",
    brand: "Hikvision / Akuvox",
    price: "Custom Quote",
    rating: 4.7,
    inStock: true,
    featured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
    description: "IP-based video door station with 2MP wide-angle camera, keypad, RFID reader, and mobile app call forwarding for commercial towers and residential complexes.",
    specs: {
      "Camera": "2MP HD with WDR and Night Vision",
      "Screen": "7-inch Color Indoor Touchscreen Intercom included",
      "Unlocking Modes": "Card, PIN, Indoor Station, Mobile App",
      "Protection": "Aluminum Alloy, IP65 Waterproof Rating"
    }
  },
  {
    id: "nvr-01",
    name: "64-Channel 4K Network Video Recorder (NVR) with RAID",
    slug: "64-channel-4k-nvr-raid-support",
    category: "CCTV & Surveillance",
    brand: "Hikvision / Dahua / CP Plus",
    price: "Custom Quote",
    rating: 4.8,
    inStock: true,
    featured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9djt2MVNla-2Fe45oT-ZKwGVSqbkLy36Zbv8dWlS4Y8ldzM2IcW9IIXl-JiUi81KBBy6s8Y7CNvSdnQMxd_vfRqaRTbpv2IrU-XzlcO4p1V3K5QgZJe1NvJ79oOQ4hrslqLw1QrMNeh3-eiGZnu8Fxvi-14aBt8tzAFzJLXu1s6Vo8gSEk5-043GYfe9ojeKMgY7rrBujMuiN5s4kXpLr3rK4caT9jsBq6QijhG9QeVY_W8EBpe65JA",
    description: "High-capacity commercial NVR supporting up to 64 IP cameras with up to 12MP recording resolution, dual HDMI 4K video outputs, and 8 SATA HDD bays.",
    specs: {
      "Channels": "64 IP Camera Channels",
      "Bandwidth": "384 Mbps Incoming / 384 Mbps Outgoing",
      "HDD Capacity": "8x SATA interfaces, up to 16TB per HDD (128TB Total)",
      "RAID Support": "RAID 0, 1, 5, 6, 10 for absolute data safety",
      "Outputs": "2x HDMI (up to 4K), 2x VGA, Dual Gigabit LAN ports"
    }
  },
  {
    id: "comp-01",
    name: "Enterprise Business Workstation & Laptop Solutions",
    slug: "enterprise-business-workstations-laptops",
    category: "Laptops & Desktops",
    brand: "Dell Latitude / Lenovo ThinkPad / HP EliteBook",
    price: "Custom Quote",
    rating: 4.9,
    inStock: true,
    featured: true,
    badge: "Bulk Available",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWtX4-Ox2hlUr-8KDDMO0LCvdFdw7oHPPNsScX8yKkfRlgr24sq_u0qtkyQ6FFyZq4nKDehhUqCl5_Hx5IMW5tdHa3NPBfyePX8DiRuJ1EC7b1odrhRjb1oARa18Btsj1GcHD3u-VH999X4aJiAwxbuZwxuiy56sboOJzQwHT8Y_ipwMNwXrd4UGqM0-tJIgtHYPJhn2jiLAiwEoZxfgyYj-Qjxt6PpMkD6IOzek7PBsRqt5AIun9bZQ",
    description: "Commercial-grade laptops and desktop towers engineered for 24/7 reliability, MIL-SPEC durability, hardware encryption (TPM 2.0), and 3-Year ProSupport.",
    specs: {
      "Processors": "Intel Core i5/i7/i9 14th Gen or AMD Ryzen Pro",
      "RAM": "16GB / 32GB / 64GB DDR5 High-Speed",
      "Storage": "512GB / 1TB / 2TB PCIe Gen4 NVMe SSD",
      "Security": "vPro, TPM 2.0, Fingerprint & IR Webcam Face Login",
      "OS": "Windows 11 Pro Commercial License"
    }
  },
  {
    id: "ups-01",
    name: "Online Double-Conversion 10kVA - 30kVA Industrial UPS",
    slug: "online-double-conversion-industrial-ups",
    category: "Power & UPS Automation",
    brand: "APC Schneider / Vertiv / Emerson",
    price: "Custom Quote",
    rating: 4.9,
    inStock: true,
    featured: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
    description: "Zero-transfer-time online double-conversion three-phase UPS system with external battery bank provision, guaranteeing continuous clean power for server rooms.",
    specs: {
      "Topology": "True Online Double Conversion (Pure Sine Wave)",
      "Capacity": "10 kVA / 20 kVA / 30 kVA (3-Phase In / 1-Phase or 3-Phase Out)",
      "Power Factor": "0.99 Unity Power Factor",
      "Monitoring": "SNMP Card for Remote Network Health Alerts"
    }
  }
];
