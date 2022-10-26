import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDTO: UserDTO) {
        return this.userService.create(userDTO);
    }

    @MessagePattern(UserMSG.FIND_ALL)
    findAll() {
        return this.userService.findAll();
    }

    @MessagePattern(UserMSG.FIND_ONE)
    findOne(@Payload() userId: string) {
        return this.userService.findById(userId);
    }

    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.userService.findByIdAndUpdate(payload.userDTO, payload.id);
    }

    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id: string) {
        return this.userService.findByIdAndDelete(id);
    }
}
