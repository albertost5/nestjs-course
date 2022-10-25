import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() userDTO: UserDTO) {
        return this.userService.create(userDTO);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') userId: string) {
        return this.userService.findById(userId);
    }

    @Put(':id')
    findByIdAndUpdate(@Body() userDTO: UserDTO, @Param('id') userId: string) {
        return this.userService.findByIdAndUpdate(userDTO, userId);
    }

    @Delete(':id')
    findByIdAndDelete(@Param('id') id: string) {
        return this.userService.findByIdAndDelete(id);
    }
}
