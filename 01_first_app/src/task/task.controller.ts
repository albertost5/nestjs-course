import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {};

    @Post()
    // @HttpCode(200)
    create(@Body() taskDTO: TaskDTO ): ITask {
        return this.taskService.createTask(taskDTO);
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
    findByIdAndUpdate(@Param('id') id: string, @Body() taskDTO: TaskDTO): ITask {
        return this.taskService.findByIdAndUpdate(id, taskDTO);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): string {
        return this.taskService.deleteById(id);
    }
}
