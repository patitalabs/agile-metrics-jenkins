import { CoreMetricsClientImpl } from '../infrastructure/core-metrics/CoreMetricsClientImpl';
import { AppConfig } from './AppConfig';
import { CoreMetricsService, CiCollectorService } from '../domain/Types';
import { ApiMetricsService } from '../domain/continuous-integration/ApiMetricsService';
import { JenkinsService } from '../infrastructure/jenkins/Types';
import { JenkinsClientImpl } from '../infrastructure/jenkins/JenkinsClientImpl';
import { JenkinsRepositoryImpl } from '../infrastructure/jenkins/JenkinsRepositoryImpl';
import { JenkinsServiceImpl } from '../infrastructure/jenkins/JenkinsServiceImpl';
import { JenkinsCollectorsService } from '../infrastructure/jenkins/collector/JenkinsCollectorsService';

function coreMetricsService(): CoreMetricsService {
  return new CoreMetricsClientImpl({
    host: AppConfig.coreMetricsUrl(),
  });
}

function scmCollectorService(): CiCollectorService {
  return new JenkinsCollectorsService(jenkinsService());
}

function jenkinsService(): JenkinsService {
  const jenkinsClient = new JenkinsClientImpl({
    host: `${AppConfig.jenkinsHost()}`,
    apiToken: `${AppConfig.jenkinsToken()}`,
    apiUser: `${AppConfig.jenkinsUser()}`,
  });
  const jenkinsRepository = new JenkinsRepositoryImpl(jenkinsClient);
  return new JenkinsServiceImpl(jenkinsRepository);
}

function apiMetricsServiceInstance(): ApiMetricsService {
  return new ApiMetricsService(coreMetricsService(), scmCollectorService());
}

export const appContext = Object.freeze({
  apiMetricsService: apiMetricsServiceInstance(),
});
