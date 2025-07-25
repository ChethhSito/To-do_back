import { Body, Controller, Post } from "@nestjs/common";
import {UserDocument} from "src/auth/users/schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Console } from "console";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body()  createUserDto: CreateUserDto)  {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login( @Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
}