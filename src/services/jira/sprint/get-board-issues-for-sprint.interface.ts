export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  entityId: string;
  hierarchyLevel: number;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface Issuetype2 {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  entityId: string;
  hierarchyLevel: number;
}

export interface Fields2 {
  summary: string;
  status: Status;
  priority: Priority;
  issuetype: Issuetype2;
}

export interface Parent {
  id: string;
  key: string;
  self: string;
  fields: Fields2;
}

export interface AvatarUrls {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
}

export interface Resolution {
  self: string;
  id: string;
  description: string;
  name: string;
}

export interface Watches {
  self: string;
  watchCount: number;
  isWatching: boolean;
}

export interface Issuerestrictions {}

export interface Issuerestriction {
  issuerestrictions: Issuerestrictions;
  shouldDisplay: boolean;
}

export interface Priority2 {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface NonEditableReason {
  reason: string;
  message: string;
}

export interface StatusCategory2 {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Status2 {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory2;
}

export interface Timetracking {}

export interface AvatarUrls2 {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

export interface Creator {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls2;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface AvatarUrls3 {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

export interface Reporter {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls3;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface Aggregateprogress {
  progress: number;
  total: number;
}

export interface ClosedSprint {
  id: number;
  self: string;
  state: string;
  name: string;
  startDate: string;
  endDate: string;
  completeDate: string;
  createdDate: string;
  originBoardId: number;
  goal: string;
}

export interface Progress {
  progress: number;
  total: number;
}

export interface Comment {
  comments: unknown[];
  self: string;
  maxResults: number;
  total: number;
  startAt: number;
}

export interface Votes {
  self: string;
  votes: number;
  hasVoted: boolean;
}

export interface Worklog {
  startAt: number;
  maxResults: number;
  total: number;
  worklogs: unknown[];
}

export interface Names {
  [key: string]: string;
}

export interface Fields {
  statuscategorychangedate: string;
  issuetype: Issuetype;
  parent?: Parent;
  timespent: unknown;
  sprint: unknown;
  project: Project;
  fixVersions: unknown[];
  aggregatetimespent: unknown;
  resolution: Resolution;
  resolutiondate: string;
  workratio: number;
  watches: Watches;
  issuerestriction: Issuerestriction;
  lastViewed: string;
  created: string;
  epic: unknown;
  priority: Priority2;
  labels: string[];
  timeestimate: unknown;
  aggregatetimeoriginalestimate: unknown;
  versions: unknown[];
  issuelinks: unknown[];
  assignee: unknown;
  updated: string;
  status: Status2;
  components: unknown[];
  timeoriginalestimate: unknown;
  description: unknown;
  timetracking: Timetracking;
  security: unknown;
  aggregatetimeestimate: unknown;
  attachment: unknown[];
  flagged: boolean;
  summary: string;
  creator: Creator;
  subtasks: unknown[];
  reporter: Reporter;
  aggregateprogress: Aggregateprogress;
  environment: unknown;
  duedate: unknown;
  closedSprints: ClosedSprint[];
  progress: Progress;
  comment: Comment;
  votes: Votes;
  worklog: Worklog;
}

export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

interface GetBoardIssuesForSprint {
  expand?: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
  names?: Names;
}

export default GetBoardIssuesForSprint;
