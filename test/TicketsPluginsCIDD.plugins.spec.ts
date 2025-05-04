import { Logger } from '@nestjs/common';
import axios from 'axios';
import { TicketsPluginsCIDD } from 'src/tickets/infrastructure/plugins';

jest.mock('axios');
jest.mock('@nestjs/common', () => ({
  Logger: jest.fn().mockImplementation(() => ({
    warn: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
  })),
}));

describe('TicketsPluginsCIDD', () => {
  const user = 'test-user';
  const service = 'test-service';
  const format = 'json';

  it('should be defined', () => {
    const plugin = new TicketsPluginsCIDD(user, service, format);
    expect(plugin).toBeDefined();
  });

  it('should warn if env vars are missing', function (this: void) {
    const logger = new Logger('TicketsPluginsCIDD');
    const plugin = new TicketsPluginsCIDD('', '', '');
    plugin.onModuleInit();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(logger.warn).toHaveBeenCalled();
  });

  it('should throw an error if API fails', async () => {
    const plugin = new TicketsPluginsCIDD(user, service, format);
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(plugin.fetchTickets()).rejects.toThrow(
      'Failed to fetch tickets from Camino Inca Dos Días API',
    );
  });

  it('should return ticket data if API returns array', async () => {
    const plugin = new TicketsPluginsCIDD(user, service, format);
    const mockData = [
      { date: '2025-05-04', service: 'test', spaces: 10 },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await plugin.fetchTickets();
    expect(result).toEqual(mockData);
  });
});
