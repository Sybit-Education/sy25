import type { Room } from '@/interfaces/room'
import { NocoDBService } from './nocodb.service'

const roomService = {
  async getAll() {
    const service = new NocoDBService('rooms');
    try {
      const response = await service.list();
      const items: Array<Room> = response.list.map((record: any) => ({
        id: record.Id,
        name: record.Name,
        image: record.Bild,
        notes: record.Notes,
        color: record.Farbe
      }));
      return items;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }
}

export default roomService
