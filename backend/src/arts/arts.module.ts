import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ArtsController } from './arts.controller';
import { ArtsService } from './arts.service';
import { Art, ArtSchema } from './schemas/art.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Art.name, schema: ArtSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'heritage_secret_key_living_archive_2024',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ArtsController],
  providers: [ArtsService],
  exports: [ArtsService, MongooseModule],
})
export class ArtsModule {}

