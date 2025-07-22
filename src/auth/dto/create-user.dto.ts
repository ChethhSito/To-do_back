import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    nombre:string;

    @IsNotEmpty()
    email:string;

    @MinLength(6)
    contrasena:string;

}