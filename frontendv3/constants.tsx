import { SkillPoint, ServiceLink, EducationRecord, HostedZone, IamProfile, EducationCluster } from './types';
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
  { id: 'bucket', name: 'Buckets (Projects)', icon: 'HardDrive', description: 'Notable Projects' },
  { id: 'iam', name: 'IAM (About)', icon: 'Shield', description: 'About me' },
  { id: 'cost', name: 'Cost Explorer (Skills)', icon: 'Activity', description: 'Analyze usage and costs' },
  { id: 'db', name: 'Relational Database (Education)', icon: 'Database', description: 'School and University' },
  { id: 'dns', name: 'DNS (Contact)', icon: 'Globe', description: 'Contact Information' },
];

export const IAM_PROFILE: IamProfile = {
  userName: 'jan.andrzejczyk',
  userArn: 'arn:cloud:iam::1024-7593-0512:user/jan.andrzejczyk',
  accountId: '1024-7593-0512',
  created: '1996-08-14',
  location: 'London, UK',
  languages: ['English (fluent)', 'Polish (native)'],
  summary:
    'Backend / cloud engineer with 5+ years of experience building, operating, and improving cloud-native systems using Java, AWS, and Python. I treat every side-project like a production system, and every production system like a side-project.',
  groups: [
    { name: 'cloud-architecture', members: 14318, joined: '2019-07-01' },
    { name: 'backend-engineering', members: 24102, joined: '2019-07-01' },
    { name: 'reliability-engineering', members: 412, joined: '2021-04-12' },
    { name: 'mentors', members: 67, joined: '2023-01-20' },
  ],
  policies: [
    { name: 'JavaExpertAccess',     type: 'AWS managed',      attached: '2017-09-01', perms: 'Full' },
    { name: 'CloudArchitectAccess', type: 'AWS managed',      attached: '2021-02-15', perms: 'Full' },
    { name: 'TerraformReadWrite',   type: 'Customer managed', attached: '2022-05-04', perms: 'ReadWrite' },
    { name: 'KubernetesOperator',   type: 'Customer managed', attached: '2023-08-19', perms: 'ReadWrite' },
    { name: 'ReactPrototyping',     type: 'Inline',           attached: '2024-11-02', perms: 'ReadOnly' },
    { name: 'PythonScriptingPolicy',type: 'Customer managed', attached: '2018-03-10', perms: 'Full' },
  ],
  accessKeys: [
    { id: 'AKIA-LINKEDIN-PROFILE', created: '2017-09-01', lastUsed: '2 minutes ago', status: 'Active', href: 'https://www.linkedin.com/in/jan-andrzejczyk-61ba6012a/' },
    { id: 'AKIA-GITHUB-COMMITS',   created: '2016-04-02', lastUsed: '3 hours ago',   status: 'Active', href: 'https://github.com/jka2498' },
    { id: 'AKIA-EMAIL-INBOUND',    created: '2010-01-01', lastUsed: 'Yesterday',     status: 'Active', href: 'mailto:jkandrzej@googlemail.com' },
    { id: 'AKIA-INSTAGRAM-LEGACY', created: '2013-06-22', lastUsed: '3 years ago',   status: 'Inactive' },
  ],
};

export const EDUCATION_CLUSTER: EducationCluster = {
  dbIdentifier: 'edu-prod-jka',
  engine: 'PostgreSQL 14.7',
  instanceClass: 'db.r6g.2xlarge',
  status: 'available',
  endpoint: 'edu-prod-jka.cluster-cr7x9q.eu-west-2.rds.cloud.dev',
  port: 5432,
  storage: '4 schemas · 18 tables',
  multiAZ: true,
  backupRetention: '∞ days',
  schemas: [
    {
      name: 'university',
      type: 'BSc (Hons) Computer Science',
      institution: 'City, University of London',
      period: '2016 — 2019',
      grade: '2:2',
      tables: [
        { name: 'data_structures_and_algorithms', result: '— Pass', credits: '20 cr' },
        { name: 'object_oriented_programming',    result: '— Pass', credits: '20 cr' },
        { name: 'database_systems',               result: '— Pass', credits: '20 cr' },
        { name: 'software_engineering',           result: '— Pass', credits: '20 cr' },
        { name: 'operating_systems_networks',     result: '— Pass', credits: '20 cr' },
        { name: 'final_year_project',             result: '— Pass', credits: '40 cr' },
      ],
    },
    {
      name: 'certifications',
      type: 'Industry certificates',
      institution: 'Various',
      period: '2019 — present',
      grade: 'Active',
      tables: [
        { name: 'aws_solutions_architect_associate', result: 'Passed', credits: '2019' },
        { name: 'aws_developer_associate',           result: 'Passed', credits: '2021' },
      ],
    },
    {
      name: 'secondary_school',
      type: 'A-Levels',
      institution: '6th-Form College',
      period: '2014 — 2016',
      grade: 'BBC',
      tables: [
        { name: 'mathematics',      result: 'B', credits: '—' },
        { name: 'computer_science', result: 'B', credits: '—' },
        { name: 'physics',          result: 'C', credits: '—' },
      ],
    },
    {
      name: 'primary_school',
      type: 'GCSEs',
      institution: 'Local comprehensive',
      period: '2009 — 2014',
      grade: '10 × A*-C',
      tables: [
        { name: 'core_subjects', result: 'A*-C', credits: '—' },
      ],
    },
  ],
};

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