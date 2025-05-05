import axios from 'axios';
import { TicketsPluginsCIDD } from 'src/tickets/infrastructure/plugins';

// 1. Mock global del Logger con tipado FORZADO (para callar a TypeScript)
const mockLoggerMethods = {
  warn: jest.fn() as jest.Mock<void, [string]>, // Método que no retorna nada (void) y recibe un string
  log: jest.fn() as jest.Mock<void, [string]>,
  error: jest.fn() as jest.Mock<void, [string]>,
  debug: jest.fn() as jest.Mock<void, [string]>,
  verbose: jest.fn() as jest.Mock<void, [string]>,
};

// 2. Mockeamos axios y el Logger
jest.mock('axios');
jest.mock('@nestjs/common', () => {
  const actual =
    jest.requireActual<typeof import('@nestjs/common')>('@nestjs/common');
  return {
    ...actual,
    Logger: jest.fn(() => mockLoggerMethods),
  };
});

describe('TicketsPluginsCIDD', () => {
  const user = 'test-user';
  const service = 'test-service';
  const format = 'json';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    const plugin = new TicketsPluginsCIDD(user, service, format);
    expect(plugin).toBeDefined();
  });

  it('should warn if env vars are missing', () => {
    const plugin = new TicketsPluginsCIDD('', '', '');
    plugin.onModuleInit();

    // Verificación SIN errores de ESLint
    expect(mockLoggerMethods.warn).toHaveBeenCalled(); // ✅
    expect(mockLoggerMethods.warn).toHaveBeenCalledWith(
      '⚠️ CAMINO_INCA_USER, CAMINO_INCA_SERVICE o CAMINO_INCA_FORMAT no están definidas en el entorno. -->backend\\src\\tickets\\infrastructure\\plugins\\TicketsPluginsCIDD.plugins.ts',
    ); // ✅
  });

  it('should throw an error if API fails', async () => {
    const plugin = new TicketsPluginsCIDD(user, service, format);
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(plugin.fetchTickets()).rejects.toThrow(
      'Failed to fetch tickets from Camino Inca Dos Días API',
    );
    expect(mockLoggerMethods.error).toHaveBeenCalled(); // ✅
  });

  it('should return ticket data if API returns array', async () => {
    const plugin = new TicketsPluginsCIDD(user, service, format);
    const mockData = [{ date: '2025-05-04', service: 'test', spaces: 10 }];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await plugin.fetchTickets();
    expect(result).toEqual(mockData);
  });
});
