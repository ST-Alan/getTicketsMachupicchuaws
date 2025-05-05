import { INestApplicationContext } from '@nestjs/common';
import { TicketsModule, TicketsController } from '../controller';

const handlerCore = (appContext: INestApplicationContext, action: string) => {
  const agenteController = appContext
    .select(TicketsModule)
    .get(TicketsController);

  if (agenteController[action]) {
    return agenteController;
  }

  throw new Error(`Action '${action}' not found in AgenteController`);
};

export default handlerCore;
