import { JenkinsMetricConverter } from './JenkinsMetricConverter';
import { JenkinsService } from '../Types';
import {CiCollectorConfig, CiMetricItem} from "../../../domain/continuous-integration/Types";

export class JenkinsCollectorsService {
  constructor(private readonly jenkinsService: JenkinsService) {}

  public async fetch(
    jenkinsConfig: CiCollectorConfig
  ): Promise<CiMetricItem[]> {
    const jenkinsJob = await this.jenkinsService.findData(
      jenkinsConfig.orgName,
      jenkinsConfig.projectName,
      jenkinsConfig.since,
      jenkinsConfig.until
    );

    return JenkinsMetricConverter.toMetricItem(jenkinsJob, jenkinsConfig);
  }
}
