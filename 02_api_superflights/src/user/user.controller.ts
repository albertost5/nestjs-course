import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({summary: 'Create user.'})
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
