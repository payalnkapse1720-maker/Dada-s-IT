import { InsightArticle } from "@/types";

export const insightsData: InsightArticle[] = [
  {
    id: "zero-trust-architecture",
    slug: "zero-trust-architecture-enterprise",
    title: "The Future of Enterprise Architecture: Zero Trust & Network Automation",
    excerpt: "Exploring how modern corporations are re-architecting their digital and physical infrastructure to balance security, agility, and massive scale in an increasingly distributed world.",
    content: `
# The Future of Enterprise Architecture: Zero Trust & Network Automation

In today's interconnected landscape, perimeter-based security is no longer sufficient. Enterprise networks must assume breach and verify every request explicitly.

### 1. Identity as the New Perimeter
Traditional firewalls guarded the office walls. Today, with cloud infrastructure and hybrid work, micro-segmentation and continuous identity validation are mandatory.

### 2. Physical & Cyber Convergence
Physical security (access control turnstiles, biometric gates, CCTV AI feeds) must integrate directly into corporate Identity & Access Management (IAM). When an employee's clearance level changes, physical door permissions update simultaneously.

### 3. Automated Failover & Self-Healing
Deploying software-defined networking (SD-WAN) and automated link failover guarantees that critical enterprise transactions continue uninterrupted even during primary ISP blackouts.
    `,
    category: "Cyber Security",
    readTime: "8 min read",
    author: {
      name: "DADA'S I.T Architecture Team",
      role: "Enterprise Infrastructure Specialists",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-KovNFV7mew9LmCVVJJZTDJat-UJs8za3pvdWkP-9ungLqajldrZ1EcO5wdRqh8DkkE7TCthJ1HopEc92EW9qHKknL2gp_vNUFwtO7mAQjBxrEKG5VuONa2YVW0ACMVYt9fURn7TluWUISHpl5dvyyfCeEYvXaXbaxZIP7KyWIAYgaOy6lpCIOA8hcDwar8O6EmQq-SkikJ06v9cdH_RiFXOdy2PYFgVr6Fhp2p2HsYj2glhxqd8HiQ"
    },
    publishDate: "August 2024",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuY0m9zhbV3jsYR9SUQ-Dn7QBK0UFpw1D9xKz4IDzg74ZKralAS0_Rq27PqOPnwjt-XwdUW8GwjCCHrJu8rD1M1iw_cvs8QMPg0y1b5WhEgWwJQ3QbJz3Q7nJk571IiwjOA3DPfGvK9Kx8Yo8wsrUoNbi6JimztdqK4XwM-erKEn6SM_oyJ-XAbWADo_KkkO_AwNlgZD-2IweMHAL89qjAme_pDZl9VPQ3fPKhIY7HmZDKtDUDyNuwoUD3C",
    tags: ["Zero Trust", "Networking", "Enterprise", "Security"]
  },
  {
    id: "securing-the-edge",
    slug: "securing-the-edge-threat-detection",
    title: "Securing the Edge: Advanced AI Threat Detection in IP Surveillance",
    excerpt: "Implement next-generation optical sensors and edge AI analysis to secure disparate manufacturing and campus boundaries before physical breaches occur.",
    content: `
# Securing the Edge: Advanced AI Threat Detection in IP Surveillance

Modern CCTV is no longer a passive forensic recording tool—it is an active perimeter defence shield.

### 1. Edge AI vs Server-Side Analytics
Processing video analytics directly on the camera sensor reduces bandwidth overhead by 80% and ensures millisecond alerts for perimeter line-crossing and unauthorized loitering.

### 2. Starlight Sensor Technology
High-sensitivity Starlight sensors allow crisp full-color identification in near-total darkness without blinding white light spotlights.
    `,
    category: "CCTV",
    readTime: "5 min read",
    author: {
      name: "Security Solutions Lab",
      role: "Surveillance Engineers",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYKymPDWyNQ9idiNBaAilgtj2-nDFLaTGIEg9M7GmG03LGuKqhYqFs5lkRPbqlhPdmu1v_F7OmdKHouF4S9VzAAH_dLLzesnr5zzBszvebmrNl1JFXKq4S0oU_3GGHcNU4gw2iyxnCQEimghBpEOCK2SRBNVFhuH2Vke3xN2WJYBfhIbKZBRwyTWarbdHS8FgaALA8Q_J7jJtSO3r4YrBCQYA2li2CA8wdhmuIQYEX6apjNxOulmtdfw"
    },
    publishDate: "July 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsv-zCot3UpGOv7TLrpHVxbfVv34RtghNCfBWrYwYB1dY2SVWjxgX3FsQZA5rfxw--JO-Qmy2HBS5zfhW3PkXQ9fypwZ84I8Nj40F29OkCwSm0iG6shlzMq5TzAjXxnedZI11un0jNZYJr5yNA3dYWgUJDxhMlDp3q5a3UBvF0cMnzKOszQf4Imj2eM9kkNXmoW9sM0B2_YzRCLCC31Wa9A-WOerHPFhREQW75jBka-LiQRI3lpqZqrw",
    tags: ["CCTV", "AI", "Perimeter", "Industrial"]
  },
  {
    id: "proactive-amc-guide",
    slug: "proactive-amc-guide-cost-reduction",
    title: "Why Proactive Annual Maintenance (AMC) Reduces Enterprise IT Costs by 40%",
    excerpt: "Break-fix models cost businesses up to 3x more in downtime and emergency replacements. Learn why structured AMC contracts guarantee uninterrupted continuity.",
    content: `
# Why Proactive Annual Maintenance (AMC) Reduces Enterprise IT Costs by 40%

When IT systems fail unexpectedly, the direct repair cost is often dwarfed by the cost of halted operations, lost employee productivity, and delayed client deliverables.

### Key Benefits of Structured AMC:
- **Preventive Health Audits**: Monthly thermal, battery, and disk array checks catch silent component degradation.
- **Dedicated Resident Engineers**: On-site technical expertise resolves Level 1 and Level 2 tickets in minutes.
- **Standby Hardware Provisioning**: In the event of a catastrophic server or switch breakdown, pre-configured standby spares keep critical services live.
    `,
    category: "Managed IT",
    readTime: "6 min read",
    author: {
      name: "Operations & Service Delivery",
      role: "ITFMS Leads",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-KovNFV7mew9LmCVVJJZTDJat-UJs8za3pvdWkP-9ungLqajldrZ1EcO5wdRqh8DkkE7TCthJ1HopEc92EW9qHKknL2gp_vNUFwtO7mAQjBxrEKG5VuONa2YVW0ACMVYt9fURn7TluWUISHpl5dvyyfCeEYvXaXbaxZIP7KyWIAYgaOy6lpCIOA8hcDwar8O6EmQq-SkikJ06v9cdH_RiFXOdy2PYFgVr6Fhp2p2HsYj2glhxqd8HiQ"
    },
    publishDate: "June 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw",
    tags: ["AMC", "ITFMS", "Maintenance", "Cost Savings"]
  }
];
