import { SkillPoint, ServiceLink, EducationRecord, HostedZone } from './types';
import { Server, HardDrive, Shield, Activity, Database, Globe } from 'lucide-react';

// Static Data for Visuals (Charts, Icons) that don't need API yet

export const SKILL_DATA: SkillPoint[] = [
  { name: 'Java', usage: 95, forecast: 98 },
  { name: 'Cloud', usage: 90, forecast: 95 },
  { name: 'Spring Boot', usage: 85, forecast: 90 },
  { name: 'Terraform', usage: 80, forecast: 85 },
  { name: 'Python', usage: 75, forecast: 80 },
  { name: 'React', usage: 60, forecast: 75 },
];

export const RECENT_SERVICES: ServiceLink[] = [
  { id: 'instance', name: 'Instances (Experience)', icon: 'Server', description: 'Career Experience' },
  { id: 'bucket', name: 'Buckets (Projects)', icon: 'HardDrive', description: 'Notible Projects' },
  { id: 'iam', name: 'IAM (About)', icon: 'Shield', description: 'About me' },
  { id: 'cost', name: 'Cost Explorer (Skills)', icon: 'Activity', description: 'Analyze usage and costs' },
  { id: 'db', name: 'Relational Database (Education)', icon: 'Database', description: 'School and University' },
  { id: 'dns', name: 'DNS (Contact)', icon: 'Globe', description: 'Contact Information' },
];

export const EDUCATION_DATA: EducationRecord[] = [
  {
    id: 'db-bsc-compsci-2019',
    institution: 'City, University of London',
    degree: 'BSc (Hons)',
    field: 'Computer Science',
    startYear: 2016,
    endYear: 2019,
    grade: '2:2',
    status: 'available',
    engine: 'PostgreSQL 15.4',
    instanceClass: 'db.t3.medium',
    az: 'eu-west-2a',
    modules: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java)',
      'Database Systems',
      'Software Engineering',
      'Operating Systems & Networks',
      'Functional Programming',
      'Computer Architecture',
      'Mathematics for Computing',
      'Professional Development in IT',
      'Final Year Project',
    ],
    tags: {
      Institution: 'City, University of London',
      Department: 'School of Science & Technology',
      Status: 'Graduated',
      Type: 'Full-time',
    },
  },
];

export const CONTACT_HOSTED_ZONE: HostedZone = {
  id: 'Z0123456789ABCDEFGHIJ',
  domainName: 'jan.dev',
  description: 'Contact & social information',
  recordCount: 6,
  type: 'Public',
  records: [
    {
      name: 'mail.jan.dev',
      type: 'MX',
      value: 'jkandrzej@googlemail.com',
      ttl: 300,
      status: 'INSYNC',
      description: 'Email',
      href: 'mailto:jkandrzej@googlemail.com',
    },
    {
      name: 'linkedin.jan.dev',
      type: 'CNAME',
      value: 'linkedin.com/in/jan-andrzejczyk-61ba6012a',
      ttl: 300,
      status: 'INSYNC',
      description: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jan-andrzejczyk-61ba6012a/',
    },
    {
      name: 'github.jan.dev',
      type: 'A',
      value: 'github.com/jka2498',
      ttl: 60,
      status: 'INSYNC',
      description: 'GitHub',
      href: 'https://github.com/jka2498',
    },
    {
      name: 'jan.dev',
      type: 'TXT',
      value: '"Cloud engineer who builds things for the web"',
      ttl: 3600,
      status: 'INSYNC',
      description: 'Bio',
    },
    {
      name: 'jan.dev',
      type: 'SOA',
      value: 'ns-1234.awsdns-01.org. hostmaster.jan.dev. 1 7200 900 1209600 86400',
      ttl: 900,
      status: 'INSYNC',
      description: 'Start of Authority',
    },
    {
      name: 'jan.dev',
      type: 'NS',
      value: 'ns-1234.awsdns-01.org.\nns-5678.awsdns-02.co.uk.',
      ttl: 172800,
      status: 'INSYNC',
      description: 'Name servers',
    },
  ],
};