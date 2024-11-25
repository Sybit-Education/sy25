import axios from 'axios';

interface NocoDBConfig {
  baseURL: string;
  token: string;
  tableId: string;
}

class NocoDBService {
  private client: typeof axios;
  private config: NocoDBConfig;

  constructor(config: NocoDBConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'X-Xc-Token': config.token
      }
    });
  }

  async list(params?: {
    fields?: string;
    sort?: string;
    where?: string;
    offset?: number;
    limit?: number;
  }) {
    const response = await this.client.get(`/api/v2/tables/${this.config.tableId}/records`, { params });
    return response.data;
  }

  async create(data: Record<string, any>[]) {
    const response = await this.client.post(`/api/v2/tables/${this.config.tableId}/records`, data);
    return response.data;
  }

  async update(data: Array<{ Id: number } & Record<string, any>>) {
    const response = await this.client.patch(`/api/v2/tables/${this.config.tableId}/records`, data);
    return response.data;
  }

  async delete(ids: Array<{ Id: number }>) {
    const response = await this.client.delete(`/api/v2/tables/${this.config.tableId}/records`, { data: ids });
    return response.data;
  }

  async read(recordId: number, params?: { fields?: string }) {
    const response = await this.client.get(`/api/v2/tables/${this.config.tableId}/records/${recordId}`, { params });
    return response.data;
  }

  async count(params?: { where?: string }) {
    const response = await this.client.get(`/api/v2/tables/${this.config.tableId}/records/count`, { params });
    return response.data;
  }
}

export const base = new NocoDBService({
  baseURL: `${import.meta.env.VITE_APP_NOCODB_URL}`,
  token: `${import.meta.env.VITE_APP_NOCODB_TOKEN}`,
  tableId: `${import.meta.env.VITE_APP_NOCODB_TABLE_ID}`
});

export default base;
