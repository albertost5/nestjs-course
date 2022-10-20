import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(USER.name) private readonly userModel: Model<IUser>) {}

    private readonly users: IUser[] = [];

    async hashPassword(password: string): Promise<string> {
        const saltRounds: number = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async create(userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.userModel({ ...userDTO, password: hash });

        return await newUser.save(); 
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    async findById(userId: string): Promise<IUser> {
        return await this.userModel.findById(userId).exec();
    }

    async findByIdAndUpdate(userDTO: UserDTO, userId: string): Promise<IUser> {
        const passwordHash = await this.hashPassword(userDTO.password);
        return await this.userModel.findByIdAndUpdate( userId, {...userDTO, password: passwordHash}, {new: true} );
    }

    async findByIdAndDelete(id: string) {
        await this.userModel.findByIdAndDelete(id);
        return { status: HttpStatus.OK, message: 'Deleted!' };
    }
}
