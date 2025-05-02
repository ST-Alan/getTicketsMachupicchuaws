import { TicketsPlugin } from './TicketsPlugin.interface';

export interface TicketsPluginFactoryInterface {
  getPlugin(type: string): TicketsPlugin;
}
