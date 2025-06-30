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

Mandar a AWS
sls deploy --stage dev

Políticas de AWS:
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"lambda:CreateFunction",
				"lambda:UpdateFunctionCode",
				"lambda:UpdateFunctionConfiguration",
				"lambda:DeleteFunction",
				"lambda:GetFunction",
				"lambda:ListFunctions",
				"lambda:TagResource",
				"lambda:ListVersionsByFunction",
				"lambda:PublishVersion"
			],
			"Resource": "*"
		},
		{
			"Effect": "Allow",
			"Action": [
				"cloudformation:CreateChangeSet",
				"cloudformation:CreateStack",
				"cloudformation:DeleteStack",
				"cloudformation:DescribeChangeSet",
				"cloudformation:DescribeStackEvents",
				"cloudformation:DescribeStackResources",
				"cloudformation:DescribeStacks",
				"cloudformation:ExecuteChangeSet",
				"cloudformation:GetTemplate",
				"cloudformation:ListStacks",
				"cloudformation:UpdateStack",
				"cloudformation:ValidateTemplate",
				"cloudformation:Create*",
				"cloudformation:Update*",
				"cloudformation:Delete*",
				"cloudformation:Describe*",
				"cloudformation:Execute*",
				"cloudformation:List*"
			],
			"Resource": "*"
		},
		{
			"Effect": "Allow",
			"Action": [
				"iam:GetRole",
				"iam:CreateRole",
				"iam:DeleteRole",
				"iam:PutRolePolicy",
				"iam:AttachRolePolicy",
				"iam:DetachRolePolicy",
				"iam:PassRole",
				"iam:DeleteRolePolicy",
				"iam:TagRole"
			],
			"Resource": "*"
		},
		{
			"Effect": "Allow",
			"Action": [
				"logs:CreateLogGroup",
				"logs:CreateLogStream",
				"logs:PutLogEvents",
				"logs:DescribeLogGroups",
				"logs:DescribeLogStreams",
				"logs:TagResource",
				"logs:DeleteLogGroup",
				"logs:PutRetentionPolicy"
			],
			"Resource": "*"
		},
		{
			"Effect": "Allow",
			"Action": [
				"s3:CreateBucket",
				"s3:PutBucketPolicy",
				"s3:PutEncryptionConfiguration",
				"s3:PutBucketPublicAccessBlock",
				"s3:GetBucketLocation",
				"s3:ListBucket",
				"s3:PutObject",
				"s3:GetObject",
				"s3:DeleteObject"
			],
			"Resource": "*"
		}
	]
}