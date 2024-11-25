import axios from 'axios';

class NocoDBService {
  private baseURL: string;
  private token: string;
  private tableId: string;

  constructor(baseURL: string, token: string, tableId: string) {
    this.baseURL = baseURL;
    this.token = token;
    this.tableId = tableId;
  }

  private getHeaders() {
    return {
      'xc-token': this.token,
      'Content-Type': 'application/json'
    };
  }

  async list(params?: {
    fields?: string[];
    sort?: string;
    where?: string;
    offset?: number;
    limit?: number;
  }) {
    const response = await axios.get(`${this.baseURL}/api/v2/tables/${this.tableId}/rows`, {
      headers: this.getHeaders(),
      params: {
        ...params,
        fields: params?.fields?.join(',')
      }
    });
    return response.data;
  }

  async create(data: Record<string, any>[]) {
    const response = await axios.post(`${this.baseURL}/api/v2/tables/${this.tableId}/rows`, data, {
      headers: this.getHeaders()
    });
    return response.data;
  }

  async update(data: Array<{ Id: number } & Record<string, any>>) {
    const updatePromises = data.map(item => 
      axios.patch(`${this.baseURL}/api/v2/tables/${this.tableId}/rows/${item.Id}`, item, {
        headers: this.getHeaders()
      })
    );
    return Promise.all(updatePromises);
  }

  async delete(ids: Array<{ Id: number }>) {
    const deletePromises = ids.map(item => 
      axios.delete(`${this.baseURL}/api/v2/tables/${this.tableId}/rows/${item.Id}`, {
        headers: this.getHeaders()
      })
    );
    return Promise.all(deletePromises);
  }

  async read(recordId: number, params?: { fields?: string[] }) {
    const response = await axios.get(`${this.baseURL}/api/v2/tables/${this.tableId}/rows/${recordId}`, {
      headers: this.getHeaders(),
      params: {
        fields: params?.fields?.join(',')
      }
    });
    return response.data;
  }

  async count(params?: { where?: string }) {
    const response = await axios.get(`${this.baseURL}/api/v2/tables/${this.tableId}/rows/count`, {
      headers: this.getHeaders(),
      params
    });
    return response.data;
  }
}

export const base = new NocoDBService(
  `${import.meta.env.VITE_APP_NOCODB_URL}`,
  `${import.meta.env.VITE_APP_NOCODB_TOKEN}`,
  `${import.meta.env.VITE_APP_NOCODB_TABLE_ID}`
);

export default base;
