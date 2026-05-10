// --- API Data Transfer Objects (DTOs) ---
export interface ExperienceDTO {
  id: string;
  role: string;
  company: string;
  state?: string;
  startYear?: number;
  endYear?: number; // Added optional end year
  description?: string;
  instanceType?: string;
  az?: string;
  technologies?: string[];
  responsibilities?: string[];
}

export type ProjectLifecycle = 'ACTIVE' | 'ARCHIVED';
export type ProjectAccess = 'PUBLIC' | 'PRIVATE';
export type ProjectServiceType = 'Storage' | 'Database' | 'Functions' | (string & {});

export interface ProjectDTO {
  id: string;
  name: string;
  serviceType?: ProjectServiceType;
  description?: string;
  organization?: string;
  region?: string;
  access?: ProjectAccess;
  lifecycle: ProjectLifecycle;
  createdYear?: number;
  technologies?: string[];
  githubUrl?: string;
}

export type CvDownloadResponse = {
  url: string;
}

// --- UI Models (Rich Data for Views) ---

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string; 
  state: 'running' | 'stopped' | 'terminated';
  az: string; 
  launchTime: string; 
  description: string[]; // UI expects array for bullet points
  tags: Record<string, string>; 
}

export interface ProjectObject {
  name: string;
  type: string; 
  lastModified: string;
  size: string;
  storageClass: string;
}

export interface Project {
  bucketName: string;
  region: string; 
  access: 'Public' | 'Private';
  lastModified: string;
  size: string; 
  description: string; 
  arn: string;
  creationDate: string;
  objects: ProjectObject[];
  tags: Record<string, string>;
  githubUrl?: string;
}

export interface SkillPoint {
  name: string;
  usage: number; 
  forecast: number; 
}

export interface ServiceLink {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface EducationRecord {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  grade: string;
  status: 'available' | 'stopped';
  engine: string;
  instanceClass: string;
  az: string;
  modules: string[];
  tags: Record<string, string>;
}

export interface DnsRecord {
  name: string;
  type: 'A' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SOA';
  value: string;
  ttl: number;
  status: 'INSYNC' | 'PENDING';
  description: string;
  href?: string;
}

export interface HostedZone {
  id: string;
  domainName: string;
  description: string;
  recordCount: number;
  type: 'Public' | 'Private';
  records: DnsRecord[];
}

export interface IamGroup {
  name: string;
  members: number;
  joined: string;
}

export interface IamPolicy {
  name: string;
  type: 'AWS managed' | 'Customer managed' | 'Inline';
  attached: string;
  perms: 'Full' | 'ReadWrite' | 'ReadOnly';
}

export interface IamAccessKey {
  id: string;
  created: string;
  lastUsed: string;
  status: 'Active' | 'Inactive';
  href?: string;
}

export interface IamProfile {
  userName: string;
  userArn: string;
  accountId: string;
  created: string;
  location: string;
  languages: string[];
  summary: string;
  groups: IamGroup[];
  policies: IamPolicy[];
  accessKeys: IamAccessKey[];
}

export interface EducationSchemaTable {
  name: string;
  result: string;
  credits: string;
}

export interface EducationSchema {
  name: string;
  type: string;
  institution: string;
  period: string;
  grade: string;
  tables: EducationSchemaTable[];
}

export interface EducationCluster {
  dbIdentifier: string;
  engine: string;
  instanceClass: string;
  status: 'available' | 'stopped';
  endpoint: string;
  port: number;
  storage: string;
  multiAZ: boolean;
  backupRetention: string;
  schemas: EducationSchema[];
}
