import { Api } from '@nocodb/nocodb-sdk';

class NocoDBService {
  private client: Api;
  private tableId: string;

  constructor(baseURL: string, token: string, tableId: string) {
    this.client = new Api({
      baseURL,
      headers: {
        'X-Xc-Token': token
      }
    });
    this.tableId = tableId;
  }

  async list(params?: {
    fields?: string;
    sort?: string;
    where?: string;
    offset?: number;
    limit?: number;
  }) {
    return await this.client.dbTableRow.list('v2', this.tableId, params);
  }

  async create(data: Record<string, any>[]) {
    return await this.client.dbTableRow.create('v2', this.tableId, data);
  }

  async update(data: Array<{ Id: number } & Record<string, any>>) {
    return await this.client.dbTableRow.update('v2', this.tableId, data);
  }

  async delete(ids: Array<{ Id: number }>) {
    return await this.client.dbTableRow.delete('v2', this.tableId, ids);
  }

  async read(recordId: number, params?: { fields?: string }) {
    return await this.client.dbTableRow.read('v2', this.tableId, recordId, params);
  }

  async count(params?: { where?: string }) {
    return await this.client.dbTableRow.count('v2', this.tableId, params);
  }
}

export const base = new NocoDBService(
  `${import.meta.env.VITE_APP_NOCODB_URL}`,
  `${import.meta.env.VITE_APP_NOCODB_TOKEN}`,
  `${import.meta.env.VITE_APP_NOCODB_TABLE_ID}`
);

export default base;
