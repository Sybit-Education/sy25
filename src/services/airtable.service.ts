import { Api } from '@nocodb/nocodb-sdk';
// Ensure compatibility with latest NocoDB REST API

class NocoDBService {
  private client: Api;
  private tableId: string;

  constructor(baseURL: string, token: string, tableId: string) {
    this.client = new Api({
      baseURL,
      headers: {
        'xc-token': token
      }
    });
    this.tableId = tableId;
  }

  async list(params?: {
    fields?: string[];
    sort?: string;
    where?: string;
    offset?: number;
    limit?: number;
  }) {
    return await this.client.dbTableRow.list('noco', this.tableId, params);
  }

  async create(data: Record<string, any>[]) {
    return await this.client.dbTableRow.create('noco', this.tableId, data);
  }

  async update(data: Array<{ Id: number } & Record<string, any>>) {
    return await this.client.dbTableRow.update('noco', this.tableId, data);
  }

  async delete(ids: Array<{ Id: number }>) {
    return await this.client.dbTableRow.delete('noco', this.tableId, ids);
  }

  async read(recordId: number, params?: { fields?: string[] }) {
    return await this.client.dbTableRow.read('noco', this.tableId, recordId, params);
  }

  async count(params?: { where?: string }) {
    return await this.client.dbTableRow.count('noco', this.tableId, params);
  }
}

export const base = new NocoDBService(
  `${import.meta.env.VITE_APP_NOCODB_URL}`,
  `${import.meta.env.VITE_APP_NOCODB_TOKEN}`,
  `${import.meta.env.VITE_APP_NOCODB_TABLE_ID}`
);

export default base;
