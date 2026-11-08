import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Art, ArtSchema } from '../arts/schemas/art.schema';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Art.name, schema: ArtSchema }])],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

