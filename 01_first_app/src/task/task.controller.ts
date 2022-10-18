import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/v1/task')
export class TaskController {

    @Post()
    method(@Body() body: string): object {
        return {
            body, 
            type: typeof body
        };
    }

    /** QUERY PARAMS */

    // @Post()
    // postMethod(
    //     @Query('id') id: string,
    //     @Query('description') description: string,
    //     @Query('isdone') isdone: string,
    // ) {
    //     return {
    //         id,
    //         description,
    //         isdone
    //     };
    // }

    // @Post()
    // postMethod(@Query() query: any) {
    //     return {query};
    // }

    /** PARAMS / PATH VARIABLE */
    
    // @Post(':id/description/:description/isdone/:isdone')
    // postMethod(@Param() params: any) {
    //     return {params};
    // }

    // @Post(':id/description/:description/isdone/:isdone')
    // postMethod(
    //     @Param('id') id: number,
    //     @Param('description') description: string,
    //     @Param('isdone') isDone: boolean
    // ) {
    //     return `
    //         Id - ${Number(id)}, Typeof ${typeof Number(id)} \n
    //         De - ${description}, Typeof ${typeof description} \n
    //         Do - ${Boolean(isDone)}, Typeof ${typeof Boolean(isDone)}
    //     `
    // }

    // @Post(':user')
    // postMethod(@Req() req: Request, @Param('user') user: string): string {
    //     return `method ${req.method}, user ${user}`;
    // }

    // api/v1/task/done
    @Get('done')
    getMethod(@Req() req: Request): string {
        return `method ${req.method}`;
    }

    @Put()
    putMethod(@Req() req: Request): string {
        return `method ${req.method}`;
    }

    @Patch()
    patchMethod(@Req() req: Request): string {
        return `method ${req.method}`;
    }

    @Delete()
    deleteMethod(@Req() req: Request): string {
        return `method ${req.method}`;
    }
}
