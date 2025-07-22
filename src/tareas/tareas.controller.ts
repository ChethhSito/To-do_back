import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TareaDto } from "src/tareas/dto/tareas.dto";
import { TareasService } from "src/tareas/tareas.service";

@Controller('tareas')
export class TareasController {
constructor( private readonly tareasService: TareasService) {}
 @Post('addTask')
 async addTask(@Body() dto: TareaDto) {
    return this.tareasService.crearTarea(dto);
  }

  @Put('editTask/:id')
  async editTask(@Param('id') id: string, @Body() dto: TareaDto) {
    return this.tareasService.editarTarea(id, dto);
  }

  @Get('listTasks/:userId')
  async listTasks(@Param('userId') userId: string) {
    return this.tareasService.listarTareas(userId);
  }

  @Get('getTask/:id')
  async getTask(@Param('id') id: string) {
    return this.tareasService.obtenerTareaId(id);
  }

  @Delete('deleteTask/:id')
  async deleteTask(@Param('id') id: string) {
    return this.tareasService.eliminarTarea(id);
  }

  @Put('completeTask/:id')
  async completeTask(@Param('id') id: string) {
    return this.tareasService.marcarTareaCompletada(id);
}
  }
