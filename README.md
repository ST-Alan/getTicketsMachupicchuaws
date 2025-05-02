Serverless:
Explicación de la configuración
service: Nombre del servicio.

provider:

name: Proveedor de la nube, en este caso AWS.

runtime: Entorno de ejecución para la función Lambda.

region: Región donde se desplegará la función.

memorySize: Memoria asignada a la función (128 MB es suficiente para tareas ligeras).

timeout: Tiempo máximo de ejecución de la función (en segundos).

architecture: Arquitectura de la función; arm64 es más eficiente y económico.

environment: Variables de entorno disponibles para la función.

functions:

syncTickets: Nombre de la función.

handler: Ruta al archivo y función que se ejecutará. Asegúrate de que handleCron esté exportado correctamente en tu archivo TicketsSchedulerService.ts.

events:

schedule: Configuración del evento programado (cron job).

rate: Frecuencia de ejecución; en este caso, cada 15 minutos.

enabled: Habilita el evento programado.

plugins:

serverless-esbuild: Plugin para empaquetar y compilar tu código utilizando esbuild.

package:

individually: Empaqueta cada función por separado.

custom:

esbuild: Configuración específica para esbuild.