export type WorkItem = { title: string; description: string; tools: string; file?: string };
export type Certificate = { title: string; issuer: string; date: string; file?: string };
export type PortfolioContent = {
  name: string; title: string; hero: string; email: string; phone: string; whatsapp: string;
  linkedin: string; location: string; website: string; heroPhoto?: string; aboutPhoto?: string;
  resume?: string; about: string[]; work: Record<string, string>; certificates: Certificate[];
  services: string[][]; tools: string[]; workItems: WorkItem[];
};

export const services = [
  ["Executive Virtual Assistance", "Administrative support that helps professionals manage their daily workload efficiently."],
  ["Administrative Support", "Support with routine administrative tasks, documentation, organization, and coordination."],
  ["Email Management", "Inbox organization, filtering, labeling, prioritization, and maintaining an organized communication workflow."],
  ["Calendar Management", "Scheduling meetings, organizing appointments, managing calendar events, and helping maintain an efficient schedule."],
  ["Data Entry & Organization", "Accurate data entry, spreadsheet organization, information management, and maintaining clean digital records."],
  ["Customer Support", "Professional customer communication through email and chat while maintaining a helpful and respectful customer experience."],
];
export const tools = ["Google Workspace", "Google Calendar", "Google Sheets", "Google Forms", "Google Slides", "Trello", "Notion", "HubSpot", "Zendesk", "Canva", "CapCut", "Slack", "Jibble"];
export const strengths = ["Organization", "Attention to Detail", "Communication", "Reliability", "Time Management", "Adaptability"];
export const workItems: WorkItem[] = [
  { title: "Email Management", description: "Inbox organization, filtering, labels, and email management.", tools: "Email & Google Workspace" },
  { title: "Calendar Management", description: "Scheduling and organized calendar workflows.", tools: "Google Calendar" },
  { title: "Trello / Task Management", description: "Boards, labels, checklists, and workflow examples.", tools: "Trello" },
  { title: "Google Sheets & Data Management", description: "Data entry, pivot tables, formatting, filters, and organization.", tools: "Google Sheets" },
  { title: "Customer Support", description: "Support workflows, sample responses, and ticket handling.", tools: "Zendesk & HubSpot" },
  { title: "Administrative Support", description: "Administrative tasks and organized workflow examples.", tools: "Google Workspace & Notion" },
];

export const defaultContent: PortfolioContent = {
  name: "Catherine Andrew",
  title: "Executive Virtual Assistant | Administrative Support",
  hero: "Helping busy professionals and businesses stay organized, productive, and on top of their day-to-day administrative tasks.",
  email: "", phone: "", whatsapp: "https://wa.me/2349033630222", linkedin: "https://www.linkedin.com/in/catherine-andrew-193919407", location: "Lagos, Nigeria", website: "",
  heroPhoto: "", aboutPhoto: "", resume: "",
  about: [
    "I am Catherine Andrew, an Executive Virtual Assistant passionate about helping businesses and busy professionals stay organized, efficient, and focused on what matters most.",
    "I provide reliable administrative support that helps simplify daily operations, manage information, organize schedules, and keep important tasks moving.",
    "My approach is centered around organization, attention to detail, clear communication, professionalism, and dependable support.",
    "I am comfortable working with digital tools and remote collaboration platforms, and I continuously develop my skills to provide efficient administrative assistance.",
  ],
  work: {},
  certificates: [
    { title: "Virtual Assistant Program", issuer: "Vsavvy Academy", date: "", file: "" },
    { title: "Add Future Certification", issuer: "", date: "", file: "" },
    { title: "Add Future Certification", issuer: "", date: "", file: "" },
  ],
  services,
  tools,
  workItems,
};
