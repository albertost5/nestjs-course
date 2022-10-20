import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { getObjectKey } from "src/utils/get-object-key";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        
        const status = exception instanceof HttpException 
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
            
        // console.log(exception)
        // console.log(exception.getResponse().message)

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : exception;

        this.logger.error(`Status ${status} - Error: ${ JSON.stringify(message) }`);
        
        return response.status(status).json({
            statusCode: status,
            title: getObjectKey(HttpStatus, status),
            description: message?.message ? message.message : message,
            time: new Date().toISOString(),
            path: request.url
        });
    }
}