import { JenkinsJob } from '../Types';
import {CiCollectorConfig, CiMetricItem} from "../../../domain/ci/Types";
import {Utils} from "../../../utils/Utils";

export class JenkinsMetricConverter {
  static toMetricItem(
    jenkinsJob: JenkinsJob,
    ciCollectorConfig: CiCollectorConfig
  ): CiMetricItem[] {
    return jenkinsJob.builds.map((build) => ({
      id: Utils.toHash(
        `${ciCollectorConfig.projectName}-${build.timestamp.getTime()}`
      ),
      dataType: 'CI',
      createdAt: build.timestamp,
      teamName: ciCollectorConfig.teamName,
      jenkinsUrl: build.url,
      buildName: jenkinsJob.name,
      result: build.result,
      durationInSeconds: this.msToSeconds(build.durationInMs),
      causedBy: build.causedBy,
      revision: build.revision,
      revisionDescription: build.revisionDescription,
      buildNumber: build.buildNumber,
      projectName: ciCollectorConfig.projectName,
    }));
  }

  private static msToSeconds(ms) {
    return ms / 1000;
  }
}
