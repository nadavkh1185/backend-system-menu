import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Menu } from '@prisma/client';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Get all menus as a tree' })
  @ApiOkResponse({ description: 'Hierarchical menu tree' })
  async findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu by id' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Menu found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Menu> {
    return this.menuService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create menu' })
  @ApiCreatedResponse({ description: 'Menu created' })
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateMenuDto,
  ): Promise<Menu> {
    return this.menuService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update menu' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Menu updated' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menuService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete menu' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({ description: 'Menu deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.menuService.remove(id);
  }
}
