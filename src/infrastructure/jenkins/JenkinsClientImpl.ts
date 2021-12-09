import { JenkinsClient } from './Types';
import * as axios from 'axios';
import { Utils } from '../../utils/Utils';

export class JenkinsClientImpl implements JenkinsClient {
  private readonly host: string;
  private readonly apiToken: string;
  private readonly apiUser: string;

  constructor({ host, apiToken, apiUser }) {
    this.apiUser = apiUser;
    this.host = host;
    this.apiToken = apiToken;
  }

  async getData(url): Promise<any> {
    const fullUrl = `${this.host}/${url}/api/json?token=${this.apiToken}`;
    const authToken = Utils.toBase64(`${this.apiUser}:${this.apiToken}`);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authToken}`,
      },
    };

    const response = await axios.default.get(fullUrl, config);
    const json = response.data;
    if (json.errors) {
      throw new Error(...json.errors);
    }
  }
}
