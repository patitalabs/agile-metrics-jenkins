import { JenkinsJob, JenkinsRepository, JenkinsService } from './Types';

export class JenkinsServiceImpl implements JenkinsService {
  constructor(private readonly jenkinsRepository: JenkinsRepository) {}

  findData(
    orgName: string,
    projectName: string,
    since: Date,
    until?: Date
  ): Promise<JenkinsJob> {
    return this.jenkinsRepository.jobDetails(
      orgName,
      projectName,
      since,
      until
    );
  }
}
