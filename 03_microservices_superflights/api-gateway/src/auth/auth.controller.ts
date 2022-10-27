import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signin(@Req() req) {
        console.log('req user => ', req.user)
        return await this.authService.signIn(req.user)
    }
    
    @Post('signup')
    async singup(@Body() userDTO: UserDTO) {
        return await this.authService.signUp(userDTO);
    }
}
