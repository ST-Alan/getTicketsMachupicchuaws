// tickets-plugin.factory.ts
import { Inject, Injectable } from '@nestjs/common';
import { TicketsPlugin } from 'src/tickets/domain/interface';
import { TicketPluginType } from 'src/tickets/domain/type/TicketPluginType';

@Injectable()
export class TicketsPluginFactory {
  private readonly pluginMap: Record<TicketPluginType, TicketsPlugin>;

  constructor(
    @Inject('MP_PLUGIN') private readonly mpPlugin: TicketsPlugin,
    @Inject('CICD_PLUGIN') private readonly cicdPlugin: TicketsPlugin,
    @Inject('CIDD_PLUGIN') private readonly ciddPlugin: TicketsPlugin,
  ) {
    this.pluginMap = {
      MP: this.mpPlugin,
      CICD: this.cicdPlugin,
      CIDD: this.ciddPlugin,
    };
  }

  getPlugin(type: TicketPluginType): TicketsPlugin {
    const plugin = this.pluginMap[type];
    if (!plugin) {
      throw new Error(`Plugin no registrado para el tipo: ${type}`);
    }
    return plugin;
  }
}
