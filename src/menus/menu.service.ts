import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Menu } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

type MenuNode = Menu & {
  children: MenuNode[];
};

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const { parentId, name } = createMenuDto;

    if (parentId) {
      const parent = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        throw new NotFoundException(
          `Parent menu with id ${parentId} not found`,
        );
      }
    }

    const createdMenu = await this.prisma.menu.create({
      data: {
        name,
        parentId: parentId ?? null,
      },
    });

    return createdMenu;
  }

  async findAll(): Promise<MenuNode[]> {
    const menus = await this.prisma.menu.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return this.buildTree(menus);
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }

    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const existingMenu = await this.prisma.menu.findUnique({ where: { id } });

    if (!existingMenu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }

    const { parentId, name } = updateMenuDto;

    if (parentId) {
      if (parentId === id) {
        throw new BadRequestException('A menu cannot be its own parent');
      }

      const parent = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        throw new NotFoundException(
          `Parent menu with id ${parentId} not found`,
        );
      }
    }

    const updatedMenu = await this.prisma.menu.update({
      where: { id },
      data: {
        name: name ?? existingMenu.name,
        parentId: parentId === undefined ? existingMenu.parentId : parentId,
      },
    });

    return updatedMenu;
  }

  async remove(id: string): Promise<void> {
    const existingMenu = await this.prisma.menu.findUnique({ where: { id } });

    if (!existingMenu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }

    await this.prisma.menu.delete({ where: { id } });
  }

  private buildTree(menus: Menu[]): MenuNode[] {
    const nodeMap = new Map<string, MenuNode>();
    const nodes: MenuNode[] = menus.map((m) => ({ ...m, children: [] }));

    for (const node of nodes) {
      nodeMap.set(node.id, node);
    }

    const roots: MenuNode[] = [];

    for (const node of nodes) {
      if (node.parentId === null) {
        roots.push(node);
        continue;
      }

      const parent = node.parentId ? nodeMap.get(node.parentId) : undefined;

      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}
