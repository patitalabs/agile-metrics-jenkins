import { Logger } from '../../config/Logger';
import {
  CiCollectorService,
  CoreMetricsService,
  TeamMetricsRequest,
} from '../Types';

export class ApiMetricsService {
  constructor(
    private readonly coreMetricsService: CoreMetricsService,
    private readonly ciCollectorService: CiCollectorService
  ) {}

  public async metricsForRequest(
    teamMetricsRequest: TeamMetricsRequest
  ): Promise<void> {
    try {
      Logger.info(`teamMetricsRequest: ${JSON.stringify(teamMetricsRequest)}`);
      const configurationDescriptors =
        ApiMetricsService.createConfigurationDescriptorsForRequest(
          teamMetricsRequest
        );
      Logger.info(
        `created configurations: ${JSON.stringify(configurationDescriptors)}`
      );

      for (const configurationDescriptor of configurationDescriptors) {
        const scmMetricItems = await this.ciCollectorService.fetch(
          configurationDescriptor.config
        );
        await this.coreMetricsService.publish(
          scmMetricItems,
          configurationDescriptor.shouldUpdateEntries
        );
      }
      Logger.info('Done!');
    } catch (error) {
      Logger.error(error);
    }
  }

  static createConfigurationDescriptorsForRequest(
    teamMetricsRequest: TeamMetricsRequest
  ): any[] {
    if (teamMetricsRequest.config) {
      return [{ ...teamMetricsRequest }];
    }

    throw Error(
      `Unable to create configuration for request ${JSON.stringify(
        teamMetricsRequest
      )}`
    );
  }
}
