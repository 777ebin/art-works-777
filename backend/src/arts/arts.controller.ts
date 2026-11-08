import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ArtsService } from './arts.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { QueryArtDto } from './dto/query-art.dto';

@Controller('arts')
export class ArtsController {
  constructor(
    private readonly artsService: ArtsService,
    private readonly jwtService: JwtService,
  ) {}

  private extractUser(req: any): any {
    if (req.user) return req.user;
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const verified = this.jwtService.verify(token);
        if (verified) return verified;
      } catch (e) {
        try {
          const decoded = this.jwtService.decode(token);
          if (decoded) return decoded;
        } catch (e2) {}
      }
    }
    return null;
  }

  @Get()
  async findAll(@Query() query: QueryArtDto, @Req() req: any) {
    const user = this.extractUser(req);
    const userRole = user?.role;
    return this.artsService.findAll(query, userRole);
  }

  @Get('featured')
  async findFeatured() {
    return this.artsService.findFeatured();
  }

  @Get('filters')
  async getFilters() {
    return this.artsService.getFiltersMetadata();
  }

  @Get('stats')
  async getStats() {
    return this.artsService.getStats();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.artsService.findBySlug(slug);
  }

  @Get(':slug/recommendations')
  async getRecommendations(@Param('slug') slug: string) {
    return this.artsService.getRecommendations(slug);
  }

  @Post()
  async create(@Body() createArtDto: CreateArtDto, @Req() req: any) {
    const user = this.extractUser(req);
    return this.artsService.create(createArtDto, user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateArtDto: UpdateArtDto) {
    return this.artsService.update(id, updateArtDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; reviewNotes?: string },
  ) {
    return this.artsService.updateStatus(id, body.status, body.reviewNotes);
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    return this.artsService.like(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.artsService.remove(id);
  }
}

