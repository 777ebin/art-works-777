import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Art, ArtDocument } from '../arts/schemas/art.schema';
import { SAMPLE_ARTS } from './seed.data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(@InjectModel(Art.name) private artModel: Model<ArtDocument>) {}

  async onApplicationBootstrap() {
    await this.seedInitialArts();
  }

  async seedInitialArts(force = false) {
    try {
      const count = await this.artModel.countDocuments();
      this.logger.log(`Current arts collection document count: ${count}`);

      if (count === 0 || force) {
        this.logger.log('Seeding curated cultural records into arts collection...');
        for (const item of SAMPLE_ARTS) {
          await this.artModel.findOneAndUpdate(
            { slug: item.slug },
            { $set: item },
            { upsert: true, new: true },
          );
        }
        this.logger.log(`Successfully seeded ${SAMPLE_ARTS.length} cultural records into the 'arts' collection in database 'art-works'.`);
      } else {
        // Ensure any new sample records are upserted without overwriting existing edits
        for (const item of SAMPLE_ARTS) {
          const exists = await this.artModel.findOne({ slug: item.slug });
          if (!exists) {
            await this.artModel.create(item);
            this.logger.log(`Added missing sample tradition: ${item.title}`);
          }
        }
      }
    } catch (err) {
      this.logger.error(`Error during arts seeding: ${err.message}`, err.stack);
    }
  }

  async forceReseed() {
    for (const item of SAMPLE_ARTS) {
      await this.artModel.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        { upsert: true, new: true },
      );
    }
    return {
      success: true,
      message: `Successfully re-seeded ${SAMPLE_ARTS.length} cultural records into the arts collection.`,
    };
  }
}

