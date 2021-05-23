
export interface CiMetricItem {
  jenkinsUrl: string;
  buildName: string;
  result: string;
  durationInSeconds: number;
  causedBy: string;
  revision: string;
  revisionDescription: string;
  buildNumber: string;
  projectName: string;
}

export class CiCollectorConfig  {
  orgName: string;
  projectName: string;
  teamName: string;
  since: Date;
  until?: Date;

  constructor({ orgName, projectName, since, until = null, teamName }) {
    this.orgName = orgName;
    this.projectName = projectName;
    this.since = new Date(since);
    this.until = until ? new Date(until) : null;
    this.teamName = teamName;
  }
}