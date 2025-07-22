import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { User,UserDocument } from "src/auth/users/schema/user.schema";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { LoginDto } from "src/auth/dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)private userModel:Model<UserDocument>,
        private jwtService : JwtService
    ){}
    async register(dto:CreateUserDto){
        const userExiste = await this.userModel.findOne({email:dto.email});
        if(userExiste){
            throw new UnauthorizedException('El correo ya esta registrado');
        }
        const contrasenaHasheada = await bcrypt.hash(dto.contrasena,10);
        const newUser = new this.userModel({
            nombre:dto.nombre,
            email:dto.email,
            contrasena:contrasenaHasheada,
            fechaCreacion:new Date(),
        });
        await newUser.save();
    
    console.log(newUser);
    return {
        message: 'USUARIO REGISTRADO EXITOSAMENTE',
        user: {
            id: newUser._id,
            nombre: newUser.nombre,
            email: newUser.email,
            fechaCreacion: newUser.fechaCreacion,
        },
    };
    }

    async login(dto:LoginDto){
        const user = await this.userModel.findOne({email:dto.email});
        if(!user){
            throw new UnauthorizedException('Credenciales Invalidas');
        }
        const isMatch = await bcrypt.compare(dto.contrasena,user.contrasena);
        if(!isMatch){
            throw new UnauthorizedException('Contraseña Invalida');
        }

        const payload = { sub:user._id, email: user.email};
        const token = await this.jwtService.signAsync(payload);
        return{
            message: 'Login exitoso',
            token,
            user:{
                id:user._id,
                nombre:user.nombre,
                email:user.email,
            },
        };
    }
}