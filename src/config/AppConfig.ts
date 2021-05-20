function checkEnvVar(...theVariables: string[]): void {
  theVariables.forEach((theVariable) => {
    if (!process.env[theVariable]) {
      throw Error(`env.${theVariable} not set!`);
    }
  });
}

export class AppConfig {
  static port(): number {
    return (process.env.PORT || 3000) as number;
  }

  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  static jenkinsUser(): string {
    checkEnvVar('JENKINS_USER');
    return process.env.JENKINS_USER;
  }

  static jenkinsToken(): string {
    checkEnvVar('JENKINS_API_TOKEN');
    return process.env.JENKINS_API_TOKEN;
  }

  static jenkinsHost(): string {
    checkEnvVar('JENKINS_HOST');
    return process.env.JENKINS_HOST;
  }

  static coreMetricsUrl(): string {
    checkEnvVar('CORE_METRICS_URL');
    return process.env.CORE_METRICS_URL;
  }
}
