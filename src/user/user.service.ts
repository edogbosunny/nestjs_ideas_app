import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async showAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }
  async login(data: UserDTO): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || (await user.comparePassword(password))) {
      throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }
  async register(data: UserDTO): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(data);
    return user.toResponseObject();
  }
}
