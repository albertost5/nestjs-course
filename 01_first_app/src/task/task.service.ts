import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {

    tasks: ITask[] = [];

    createTask(taskDTO: TaskDTO): ITask {
        const task: ITask = {
            id: uuidv4(),
            ...taskDTO
        }

        this.tasks.push(task);

        return task;
    }

    findAll(): ITask[] {
        return this.tasks;
    }

    findById(id: string): ITask {
        console.log('Id to find: ', id);
        return this.tasks.find( task => task.id === id);
    }

    findByIdAndUpdate(id: string, taskDTO: TaskDTO): ITask {
        const taskUpdated: ITask = {
            id,
            ...taskDTO
        }
        this.tasks = this.tasks.map( task => task.id === id ? taskUpdated : task );
        return taskUpdated;
    }

    deleteById(id: string): string {
        this.tasks = this.tasks.filter( task => task.id !== id );
        return 'Task deleted successfully!';
    }
}
