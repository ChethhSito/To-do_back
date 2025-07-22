import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDb } from './config/databaseConection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [AuthModule,TareasModule,
    ConfigModule.forRoot({ isGlobal: true }), // <-- Agrega esto
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
//dasdadasdsad
export class AppModule {}
