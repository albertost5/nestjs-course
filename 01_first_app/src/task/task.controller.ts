import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { resolveObjectURL } from 'buffer';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {};

    @Post()
    // @HttpCode(200)
    create(@Body() taskDTO: TaskDTO ) {
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                reject('Something went wrong!')
            }, 15000);
        })
        // return this.taskService.createTask(taskDTO);
    }

    @Get()
    findAll(): ITask[] {
        return this.taskService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): ITask {
        return this.taskService.findById(id);
    }

    @Put(':id')
    // @UsePipes(new ValidationPipe())
    findByIdAndUpdate(@Param('id') id: string, @Body() taskDTO: TaskDTO): ITask {
        return this.taskService.findByIdAndUpdate(id, taskDTO);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): string {
        return this.taskService.deleteById(id);
    }
}
