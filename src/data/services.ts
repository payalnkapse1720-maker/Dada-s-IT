import { Service } from "@/types";

export const servicesData: Service[] = [
  {
    id: "it-infrastructure",
    slug: "it-infrastructure",
    title: "IT Infrastructure & Networking",
    shortDescription: "End-to-end network design, structural cabling, and robust server installations for scalable enterprise operations.",
    fullDescription: "Future-proof your enterprise infrastructure with high-performance, secure, and infinitely scalable networking architecture. We engineer structured cabling (Cat6/Cat6A/Fiber), core switches, routers, firewalls, and server racks to ensure maximum throughput and zero downtime.",
    icon: "Router",
    category: "infrastructure",
    features: [
      "Structured Cabling (Cat6, Cat6A, 10G/40G Fiber Optic Backbone)",
      "Core & Edge Switch Deployment (Cisco, Ubiquiti, Aruba, D-Link)",
      "High-Throughput LAN/WAN & Multi-Site VPN Interconnects",
      "Server Rack Organization, Cable Dressing & Patch Management",
      "Network Firewall & Intrusion Prevention Configuration",
      "Load Balancing, Failover Redundancy & 99.99% Uptime SLAs"
    ],
    benefits: [
      {
        title: "Uncompromising Speed",
        description: "Ultra-low latency and 100G+ backbone capacity eliminating bottlenecks across disparate sites.",
        icon: "Zap"
      },
      {
        title: "Military-Grade Security",
        description: "Segmented VLAN architectures, next-gen firewalls, and end-to-end encrypted packet transmission.",
        icon: "ShieldCheck"
      },
      {
        title: "Absolute Reliability",
        description: "Dual-redundant power and self-healing link protocols for continuous operational continuity.",
        icon: "Activity"
      }
    ],
    specifications: [
      { label: "Cabling Standards", value: "TIA/EIA-568-C.2, ISO/IEC 11801 Class EA" },
      { label: "Bandwidth Capacity", value: "Up to 100 Gbps Core Backbone" },
      { label: "SLA Guarantee", value: "99.99% Network Uptime" },
      { label: "Deployment Scope", value: "Single Office to Multi-Acre Industrial Campuses" }
    ],
    sla: "99.99% SLA with 2-Hour Response Time",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA"
  },
  {
    id: "cctv-security",
    slug: "cctv-security",
    title: "Advanced CCTV & Surveillance",
    shortDescription: "High-definition IP surveillance systems with intelligent AI analytics, license plate recognition, and remote monitoring.",
    fullDescription: "Protect critical assets and facilities with intelligent 4K IP camera surveillance architectures. Our systems incorporate thermal imaging, edge AI analytics, perimeter intrusion detection, and multi-tier NVR/DVR storage redundancy.",
    icon: "Video",
    category: "security",
    features: [
      "4K Ultra HD & Starlight Night-Vision IP Cameras",
      "AI-Powered Object, Person & Automatic Number Plate Recognition (ANPR)",
      "High-Density NVR/DVR Setup with RAID Storage Redundancy",
      "Central Command Monitoring Stations & Mobile Real-Time Feeds",
      "Perimeter Intrusion Detection & Instant Tripwire Alerts",
      "Tamper-Proof Outdoor Enclosures (IP67 / IK10 Vandal-Proof)"
    ],
    benefits: [
      {
        title: "Forensic-Grade Clarity",
        description: "Crystal clear 4K footage ensuring indisputable visual evidence and precise recognition.",
        icon: "Eye"
      },
      {
        title: "AI Threat Prevention",
        description: "Automated anomaly detection alerts security teams before perimeter breaches occur.",
        icon: "ShieldAlert"
      },
      {
        title: "24/7 Remote Command",
        description: "Encrypted, low-latency live streaming accessible via secure desktop and mobile dashboards.",
        icon: "Smartphone"
      }
    ],
    specifications: [
      { label: "Resolution Options", value: "2MP, 4MP, 8MP (4K UHD), Thermal" },
      { label: "Storage Architecture", value: "RAID 5/6 with Cloud Offsite Mirroring" },
      { label: "Retention Period", value: "30 to 180+ Days Customizable" },
      { label: "Integration Protocols", value: "ONVIF Profile S/G/T Compliant" }
    ],
    sla: "24/7 Monitoring Assurance & Next-Day Hardware Swap",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9djt2MVNla-2Fe45oT-ZKwGVSqbkLy36Zbv8dWlS4Y8ldzM2IcW9IIXl-JiUi81KBBy6s8Y7CNvSdnQMxd_vfRqaRTbpv2IrU-XzlcO4p1V3K5QgZJe1NvJ79oOQ4hrslqLw1QrMNeh3-eiGZnu8Fxvi-14aBt8tzAFzJLXu1s6Vo8gSEk5-043GYfe9ojeKMgY7rrBujMuiN5s4kXpLr3rK4caT9jsBq6QijhG9QeVY_W8EBpe65JA"
  },
  {
    id: "access-control",
    slug: "access-control",
    title: "Access Control & Biometric Systems",
    shortDescription: "Biometric fingerprint, facial recognition, RFID, and video door phone systems granting logged physical access.",
    fullDescription: "Seamlessly regulate and audit employee, visitor, and vendor movement across restricted enterprise zones. We integrate multi-modal biometric authentication, smart card readers, turnstiles, electromagnetic locks, and video door intercoms.",
    icon: "Fingerprint",
    category: "security",
    features: [
      "Contactless AI Facial Recognition & Optical Fingerprint Scanners",
      "RFID / Smart Card / Mobile NFC Credential Readers",
      "Integrated Time-Attendance Tracking & Payroll Sync",
      "High-Definition Video Door Phones (VDP) with Multi-Apartment Routing",
      "Fail-Secure Electromagnetic & Drop-Bolt Locking Mechanisms",
      "Centralized Access Policy Management & Audit Logging"
    ],
    benefits: [
      {
        title: "Frictionless Entry",
        description: "Sub-second verification speeds prevent bottlenecking during peak shift transitions.",
        icon: "CheckCircle"
      },
      {
        title: "Automated Compliance",
        description: "Audit-ready timestamp logs for exact workforce attendance and security validation.",
        icon: "FileCheck"
      },
      {
        title: "Zone-Based Restriction",
        description: "Granular clearance hierarchies restricting server rooms, R&D labs, and executive suites.",
        icon: "Lock"
      }
    ],
    specifications: [
      { label: "Authentication Modes", value: "Face, Fingerprint, Card, PIN, BLE" },
      { label: "Recognition Speed", value: "< 0.3 seconds" },
      { label: "User Capacity", value: "Up to 50,000 users per controller" },
      { label: "Lock Compatibility", value: "EM Lock, Strike, Drop-bolt, Barrier Gates" }
    ],
    sla: "Immediate Remote Support & 4-Hour On-site Response",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA"
  },
  {
    id: "managed-it-amc",
    slug: "managed-it-amc",
    title: "Managed IT Services (ITFMS & AMC)",
    shortDescription: "Proactive Annual Maintenance Contracts, dedicated facility management, and rapid hardware restoration.",
    fullDescription: "Ensure uninterrupted business operations with comprehensive IT Facility Management Services (ITFMS) and SLA-backed Annual Maintenance Contracts (AMC). Our resident and on-call certified engineers oversee preventive maintenance, system upgrades, user support, and disaster recovery.",
    icon: "Headphones",
    category: "management",
    features: [
      "Comprehensive & Non-Comprehensive AMC Maintenance Plans",
      "On-Premises Dedicated Resident Engineers (ITFMS)",
      "Proactive Server, Network, & Workstation Health Monitoring",
      "Component-Level Laptop & Desktop Hardware Diagnostics/Repair",
      "Automated Operating System Patching & Anti-Malware Management",
      "Backup Strategy, Disaster Recovery Drills & Rapid Restoration"
    ],
    benefits: [
      {
        title: "Zero Unexpected Downtime",
        description: "Preventive maintenance detects thermal, storage, and circuit faults before outages occur.",
        icon: "Shield"
      },
      {
        title: "Predictable Operational Costs",
        description: "Fixed annual budgeting eliminates variable emergency repair expenditure.",
        icon: "Coins"
      },
      {
        title: "Priority 24/7 Escalation",
        description: "Direct access to senior infrastructure architects with defined SLA turnaround guarantees.",
        icon: "Clock"
      }
    ],
    specifications: [
      { label: "Coverage Plans", value: "Comprehensive (Parts + Labor) & Non-Comprehensive" },
      { label: "Support Hours", value: "24x7x365 or 9x6 Business Hours Options" },
      { label: "Hardware Supported", value: "Servers, Workstations, Laptops, Printers, Routers" },
      { label: "Preventive Audits", value: "Monthly Scheduled Physical & Logical Audits" }
    ],
    sla: "Guaranteed 15-Minute Remote Response & Standby Equipment Provision",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw"
  },
  {
    id: "cloud-digital",
    slug: "cloud-digital",
    title: "Web Development & Digital Solutions",
    shortDescription: "Bespoke, high-performance web applications, enterprise portals, and cloud integrations engineered to scale.",
    fullDescription: "Accelerate your digital transformation with secure, ultra-responsive web applications, enterprise intranets, e-commerce platforms, and cloud migrations. We combine modern front-end architectures with robust back-end APIs to deliver exceptional speed and conversion.",
    icon: "Globe",
    category: "digital",
    features: [
      "Custom Enterprise Web Applications & Client Portals",
      "High-Conversion Modern UI/UX Design Systems",
      "Next.js, React, Node.js & Cloud-Native Architectures",
      "Database Optimization (SQL/NoSQL) & API Integrations",
      "Search Engine Optimization (SEO) & Core Web Vitals Engineering",
      "Secure Cloud Hosting (AWS, GCP, Azure) & Automated CI/CD Pipelines"
    ],
    benefits: [
      {
        title: "Sub-Second Speed",
        description: "Optimized server-side rendering and asset streaming delivering 100/100 performance scores.",
        icon: "Gauge"
      },
      {
        title: "Top-Tier Security",
        description: "OWASP compliance, CSRF/XSS protection, and encrypted data handling throughout.",
        icon: "Lock"
      },
      {
        title: "Scalable Architecture",
        description: "Modular microservices ready to handle millions of page impressions effortlessly.",
        icon: "Layers"
      }
    ],
    specifications: [
      { label: "Frontend Stack", value: "Next.js 15, TypeScript, Tailwind CSS, Three.js" },
      { label: "Security Standard", value: "OWASP Top 10 Compliant, SSL/TLS 1.3" },
      { label: "Accessibility", value: "WCAG 2.1 AA Certified" },
      { label: "Hosting Support", value: "Vercel, AWS Amplify, GCP Cloud Run" }
    ],
    sla: "99.9% Uptime with Continuous Security Patching",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-KovNFV7mew9LmCVVJJZTDJat-UJs8za3pvdWkP-9ungLqajldrZ1EcO5wdRqh8DkkE7TCthJ1HopEc92EW9qHKknL2gp_vNUFwtO7mAQjBxrEKG5VuONa2YVW0ACMVYt9fURn7TluWUISHpl5dvyyfCeEYvXaXbaxZIP7KyWIAYgaOy6lpCIOA8hcDwar8O6EmQq-SkikJ06v9cdH_RiFXOdy2PYFgVr6Fhp2p2HsYj2glhxqd8HiQ"
  },
  {
    id: "server-sales-services",
    slug: "server-sales-services",
    title: "Server Sales, Deployment & Storage",
    shortDescription: "Custom rack and tower server procurement, RAID storage setups, and virtualization architectures.",
    fullDescription: "Procure and configure enterprise-grade rack, blade, and tower servers from leading manufacturers (Dell EMC, HPE, Lenovo). We handle hypervisor setup (VMware ESXi, Proxmox, Hyper-V), SAN/NAS storage arrays, and high-availability clustering.",
    icon: "Server",
    category: "infrastructure",
    features: [
      "Enterprise Rack & Tower Server Supply (Dell PowerEdge, HPE ProLiant)",
      "High-Performance SAN, NAS & DAS Storage Solutions (Synology, QNAP)",
      "VMware vSphere, Hyper-V & Proxmox Virtualization Deployments",
      "Hardware RAID Controller Configurations (RAID 0, 1, 5, 6, 10)",
      "Redundant Hot-Swappable Power Supplies & Enterprise ECC RAM",
      "Remote Server Management (iDRAC, iLO, IPMI) Setup"
    ],
    benefits: [
      {
        title: "Compute Density",
        description: "Maximize compute throughput while minimizing rack footprint and energy consumption.",
        icon: "Cpu"
      },
      {
        title: "Data Integrity",
        description: "Automated parity checking and instantaneous failover preserve critical enterprise databases.",
        icon: "HardDrive"
      },
      {
        title: "Effortless Scalability",
        description: "Modular chassis and expandable backplanes allow seamless memory and drive additions.",
        icon: "Maximize"
      }
    ],
    specifications: [
      { label: "Form Factors", value: "1U, 2U, 4U Rackmount & Tower Configurations" },
      { label: "Processors", value: "Intel Xeon Scalable / AMD EPYC Series" },
      { label: "Storage Interface", value: "NVMe U.2/U.3, SAS 12Gb/s, SATA 6Gb/s" },
      { label: "Virtualization", value: "VMware vSphere 8.x, Microsoft Hyper-V, Proxmox VE" }
    ],
    sla: "OEM Onsite Warranty + 4-Hour DADA'S I.T Engineer Response",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA"
  }
];
