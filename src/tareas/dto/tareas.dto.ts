import {IsString, IsNotEmpty, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class TareaDto {
    @IsNotEmpty()
    titulo:string;

    @IsNotEmpty()
    descripcion:string;

    @IsOptional()
    @IsBoolean()
    completada: boolean;

    @IsDate()
    @IsOptional()
    fechaLimite: Date;

    @IsNotEmpty()
    usuarioId: string;

}