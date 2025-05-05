// backend/src/tickets/infrastructure/bootstrap/HandlerCore.ts
import { INestApplicationContext } from '@nestjs/common';
import { TicketsSchedulerService } from '../../application/service/TicketsScheduler.service';  // Importamos el servicio

const handlerCore = async (appContext: INestApplicationContext, action: string) => {
  const ticketsSchedulerService = appContext.get(TicketsSchedulerService);  // Obtenemos el servicio del contexto

  // Si la acción es 'handleCron', ejecutamos la tarea cron
  if (action === 'handleCron') {
    await ticketsSchedulerService.handleCron();
    return { statusCode: 200, body: 'Cron job executed successfully' };
  }

  // Si la acción no se encuentra, lanzamos un error
  throw new Error(`Action '${action}' not found in TicketsSchedulerService`);
};

export default handlerCore;
