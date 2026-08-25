import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "ador-welding",
    title: "Enterprise Multi-Facility Network & CCTV Modernization",
    slug: "ador-welding-network-cctv",
    client: "Ador Welding Ltd.",
    location: "Pune & Mumbai Facilities",
    industry: "Heavy Manufacturing & Industrial",
    services: ["Structural Networking", "CCTV Surveillance", "ITFMS Managed IT", "Access Control"],
    description: "Engineered a high-throughput fiber backbone network and comprehensive AI-assisted CCTV surveillance system across multi-acre manufacturing plants, integrating central command monitoring with 99.9% uptime SLA.",
    challenge: "Outdated legacy cabling and blind spots across heavy industrial machinery zones caused packet loss and safety monitoring gaps.",
    solution: "Deployed 10G armored fiber backbone, 350+ IP67 industrial AI cameras, and unified network management with automated link failover.",
    metrics: [
      { label: "Uptime Achieved", value: "99.98%" },
      { label: "Industrial Cameras", value: "350+" },
      { label: "Bandwidth Uplink", value: "10 Gbps" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIopu5eeWs0FbQ1ZlTLOn2fBKlmX1D-0aQX71PTGQmC1ycUCBWXI6geO2kQy5WigFAWA6OpcNCd9AzqrLdGV4nHymtFb1ykQNDMslAU7k-crYNmDrJKurla0U7FznKaCiHI2kE9DXN7gndRWkABtid_0566K--XgWRq8R1G-kkjSEiEt3fzCW_u4oJbNLCIRGKoyB4cChgZMzdlCV6CsMwGxP48xotUDJ9ou1IUL3T02eYsAU4gKNQ0w",
    tag: "Manufacturing"
  },
  {
    id: "mca-mumbai",
    title: "High-Security Access Control & Stadium Surveillance Infrastructure",
    slug: "mca-mumbai-security-surveillance",
    client: "MCA Mumbai",
    location: "Mumbai",
    industry: "Sports & Public Infrastructure",
    services: ["Access Control", "High-Density CCTV", "Biometrics", "Perimeter Security"],
    description: "Designed and deployed a state-of-the-art turnstile access control and stadium-wide 4K PTZ surveillance system capable of processing high-volume spectator ingress with zero latency.",
    challenge: "Managing massive crowd ingress during tournament events while enforcing strict credential verification and zone security.",
    solution: "Installed high-speed optical turnstiles with dual RFID/barcode scanners, facial recognition access at VIP pavilions, and centralized command room video wall integration.",
    metrics: [
      { label: "Ingress Verification", value: "<0.4s" },
      { label: "4K PTZ Cameras", value: "180+" },
      { label: "Command Latency", value: "Zero Delay" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWtX4-Ox2hlUr-8KDDMO0LCvdFdw7oHPPNsScX8yKkfRlgr24sq_u0qtkyQ6FFyZq4nKDehhUqCl5_Hx5IMW5tdHa3NPBfyePX8DiRuJ1EC7b1odrhRjb1oARa18Btsj1GcHD3u-VH999X4aJiAwxbuZwxuiy56sboOJzQwHT8Y_ipwMNwXrd4UGqM0-tJIgtHYPJhn2jiLAiwEoZxfgyYj-Qjxt6PpMkD6IOzek7PBsRqt5AIun9bZQ",
    tag: "Public Infrastructure"
  },
  {
    id: "godrej-lawkim",
    title: "Industrial Campus IT Infrastructure & Biometric Attendance Integration",
    slug: "godrej-lawkim-campus-infrastructure",
    client: "Godrej Lawkim",
    location: "Shirwal Facility",
    industry: "Precision Engineering & Manufacturing",
    services: ["Structured Cabling", "Biometric Solutions", "Server Deployment", "AMC Contract"],
    description: "Complete plant-wide structured cabling overhaul, enterprise server rack deployments, and centralized multi-gate biometric workforce attendance synchronized with corporate SAP ERP.",
    challenge: "Complex campus topology with multiple disconnected production sheds requiring unified network connectivity and tamper-proof shift attendance logging.",
    solution: "Interconnected all buildings via underground single-mode optical fiber conduits, deployed centralized Dell PowerEdge servers, and installed contactless AI biometric attendance terminals.",
    metrics: [
      { label: "ERP Sync Speed", value: "Real-Time" },
      { label: "Workforce Logged", value: "1,200+" },
      { label: "SLA Adherence", value: "100%" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
    tag: "Engineering"
  },
  {
    id: "emh-tools",
    title: "Turnkey Server Virtualization & Comprehensive IT Facility Management",
    slug: "emh-tools-virtualization-itfms",
    client: "EMH Tools",
    location: "Industrial Zone",
    industry: "Industrial Tooling & Machinery",
    services: ["Server Management", "ITFMS", "AMC Maintenance", "Data Backup"],
    description: "Consolidated legacy bare-metal server infrastructure onto high-availability VMware clusters with automated disaster recovery and resident engineer ITFMS support.",
    challenge: "Physical server sprawl with high hardware failure rates and absence of automated backup routines.",
    solution: "Implemented 2U dual Xeon servers with RAID 10 NVMe storage, virtualized 15 business workloads, and configured hybrid local-to-cloud automated backups.",
    metrics: [
      { label: "Hardware Cost Cut", value: "40%" },
      { label: "Recovery Time (RTO)", value: "<15 Mins" },
      { label: "Data Redundancy", value: "Triple Tier" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
    tag: "IT Management"
  },
  {
    id: "group-inteltek",
    title: "Corporate Headquarters LAN/WAN, Firewall & Video Conferencing Setup",
    slug: "group-inteltek-corporate-infrastructure",
    client: "Group Inteltek",
    location: "Corporate Hub",
    industry: "Corporate & Technology",
    services: ["Structural Networking", "Next-Gen Firewall", "Web Development", "Hardware Supply"],
    description: "Architected modern enterprise corporate IT setup including gigabit PoE networking, redundant Fortinet UTM firewall, smart boardroom video conferencing, and full workstation deployment.",
    challenge: "Need for seamless hybrid collaboration, low-latency cross-branch VPNs, and strict zero-trust network access.",
    solution: "Configured dual-ISP SD-WAN load balancing, deployed Wi-Fi 6 enterprise access points, and equipped 120+ workstations with managed security endpoints.",
    metrics: [
      { label: "Network Latency", value: "<1ms" },
      { label: "Endpoints Protected", value: "150+" },
      { label: "VPN Throughput", value: "Gigabit" }
    ],
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuY0m9zhbV3jsYR9SUQ-Dn7QBK0UFpw1D9xKz4IDzg74ZKralAS0_Rq27PqOPnwjt-XwdUW8GwjCCHrJu8rD1M1iw_cvs8QMPg0y1b5WhEgWwJQ3QbJz3Q7nJk571IiwjOA3DPfGvK9Kx8Yo8wsrUoNbi6JimztdqK4XwM-erKEn6SM_oyJ-XAbWADo_KkkO_AwNlgZD-2IweMHAL89qjAme_pDZl9VPQ3fPKhIY7HmZDKtDUDyNuwoUD3C",
    tag: "Corporate"
  },
  {
    id: "flower-valley",
    title: "Smart Residential Complex CCTV & IP Video Door Phone Network",
    slug: "flower-valley-smart-surveillance-vdp",
    client: "Flower Valley",
    location: "Luxury Township",
    industry: "Residential & Smart Real Estate",
    services: ["CCTV Surveillance", "Video Door Phones", "Access Control", "Boom Barriers"],
    description: "Deployed 200+ IP video door phones connecting apartments to central security, integrated with automated boom barriers and perimeter night-vision CCTV coverage.",
    challenge: "Large-scale township requiring direct audio-video verification between gate security and individual apartment residences.",
    solution: "Installed fiber-to-the-home intercom backbone, ANPR license plate cameras at vehicle gates, and cloud-assisted resident app notifications.",
    metrics: [
      { label: "Homes Connected", value: "240+" },
      { label: "Gate Automation", value: "100%" },
      { label: "Incident Resolution", value: "<10 Mins" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9djt2MVNla-2Fe45oT-ZKwGVSqbkLy36Zbv8dWlS4Y8ldzM2IcW9IIXl-JiUi81KBBy6s8Y7CNvSdnQMxd_vfRqaRTbpv2IrU-XzlcO4p1V3K5QgZJe1NvJ79oOQ4hrslqLw1QrMNeh3-eiGZnu8Fxvi-14aBt8tzAFzJLXu1s6Vo8gSEk5-043GYfe9ojeKMgY7rrBujMuiN5s4kXpLr3rK4caT9jsBq6QijhG9QeVY_W8EBpe65JA",
    tag: "Real Estate"
  },
  {
    id: "konark-indrayu-phase2",
    title: "Integrated Perimeter Security & Access Management Architecture",
    slug: "konark-indrayu-phase-2-security",
    client: "Konark Indrayu Phase 2",
    location: "Residential Complex",
    industry: "Residential Real Estate",
    services: ["CCTV Installation", "Biometric Access", "Intercom Networks", "AMC Maintenance"],
    description: "Multi-building optical fiber security network including clubhouse biometric access control, basement parking surveillance, and 24/7 central security monitoring.",
    challenge: "Complex multi-level parking and expansive common areas prone to security blind spots.",
    solution: "Strategic placement of wide-angle starlight dome cameras, high-decibel intrusion alarms, and remote DVR health diagnostics.",
    metrics: [
      { label: "Coverage Ratio", value: "100%" },
      { label: "Surveillance Nodes", value: "120+" },
      { label: "Uptime Standard", value: "99.9%" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIopu5eeWs0FbQ1ZlTLOn2fBKlmX1D-0aQX71PTGQmC1ycUCBWXI6geO2kQy5WigFAWA6OpcNCd9AzqrLdGV4nHymtFb1ykQNDMslAU7k-crYNmDrJKurla0U7FznKaCiHI2kE9DXN7gndRWkABtid_0566K--XgWRq8R1G-kkjSEiEt3fzCW_u4oJbNLCIRGKoyB4cChgZMzdlCV6CsMwGxP48xotUDJ9ou1IUL3T02eYsAU4gKNQ0w",
    tag: "Residential"
  },
  {
    id: "bg-shirke",
    title: "Construction Campus High-Speed Networking & Heavy-Duty Security",
    slug: "bg-shirke-construction-infrastructure",
    client: "B.G. Shirke Construction Technology Ltd.",
    location: "Multiple Project Sites",
    industry: "Construction & Infrastructure",
    services: ["Structural Networking", "Long-Range Wireless", "CCTV", "Telecom Services"],
    description: "Engineered long-range point-to-point wireless networks, ruggedized outdoor surveillance, and site-to-headquarters secure VPNs across remote construction sites.",
    challenge: "Harsh dusty outdoor environment with lack of wired telecom infrastructure across active construction mega-projects.",
    solution: "Deployed solar-powered wireless backhauls, IP67 weatherproof PTZ cameras with 40x optical zoom, and 4G/5G failover enterprise routers.",
    metrics: [
      { label: "PTP Distance", value: "Up to 5 KM" },
      { label: "Sites Connected", value: "8 Sites" },
      { label: "Live Feed Reliability", value: "99.8%" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnSd1H46S4phLDEhR34HKFY3kxKQffsRLHmymtMN8ThyuqjFrzfRPQW4FR8RmEhasqqbvxWWl2DxcyW1j9XdJiFEmxIw1LwDFMLVCMA4kOvmiWWVfXOuzaLhN37pfuYavLvNvI4kKlTPro0xVu4d-wAI1Z1ofk2vhGhUa23JmqzOAd7xST17tu5LlPG7Wa7iJaO2a7sY4awbRgokV_6DU2ZIuMmj3v7ZylleZn7J4etMiTP4yH42lbA",
    tag: "Construction"
  }
];
