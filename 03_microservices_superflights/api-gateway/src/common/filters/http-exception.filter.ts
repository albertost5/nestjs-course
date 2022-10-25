import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        this.logger.error(`Status ${status} - Error: ${JSON.stringify(message)}`);

        response.status(status).json({
            statusCode: status,
            error: message,
            path: request.url,
            timestamps: new Date().toISOString()
        });

    }

}