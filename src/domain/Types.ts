import {CiCollectorConfig, CiMetricItem} from "./ci/Types";

export interface TeamMetricsRequest {
  shouldUpdateEntries: boolean;
  config: any;
}

export interface CoreMetricsService {
  publish(entries: any, shouldReplaceEntries: boolean);
}

export interface CiCollectorService {
  fetch(ciCollectorConfig: CiCollectorConfig): Promise<CiMetricItem[]>;
}
