// tslint:disable:no-empty
import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('api/ideas')
export class IdeaController {
  constructor(private ideaService: IdeaService) { }
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() data: Partial<IdeaDTO>) {
    return this.ideaService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroyidea(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
