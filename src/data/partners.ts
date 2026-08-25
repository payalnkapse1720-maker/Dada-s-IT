export interface PartnerLogo {
  name: string;
  category: "client" | "tech";
}

export const clientsAndPartners: PartnerLogo[] = [
  { name: "Ador Welding Ltd.", category: "client" },
  { name: "MCA Mumbai", category: "client" },
  { name: "Godrej Lawkim", category: "client" },
  { name: "EMH Tools", category: "client" },
  { name: "Group Inteltek", category: "client" },
  { name: "Flower Valley", category: "client" },
  { name: "Konark Indrayu Phase 2", category: "client" },
  { name: "B.G. Shirke Construction", category: "client" },
  { name: "Cisco Systems", category: "tech" },
  { name: "Hikvision", category: "tech" },
  { name: "Dell EMC", category: "tech" },
  { name: "Ubiquiti", category: "tech" },
  { name: "Schneider Electric", category: "tech" },
  { name: "CP Plus", category: "tech" },
  { name: "ZKTeco", category: "tech" },
  { name: "HPE", category: "tech" }
];
