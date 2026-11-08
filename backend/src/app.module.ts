import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtsModule } from './arts/arts.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri =
          configService.get<string>('MONGODB_URI') ||
          'mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority';
        const dbName = configService.get<string>('DB_NAME') || 'art-works';
        console.log(`\n======================================================`);
        console.log(`Connecting to MongoDB Atlas Database: [${dbName}]`);
        console.log(`Target Collection: [arts]`);
        console.log(`Cluster Host: ebin007.bql4m4e.mongodb.net`);
        console.log(`======================================================\n`);
        return {
          uri,
          dbName,
          serverSelectionTimeoutMS: 6000,
          retryWrites: true,
          retryAttempts: 3,
          retryDelay: 1500,
        };
      },
      inject: [ConfigService],
    }),
    ArtsModule,
    AuthModule,
    UploadModule,
    SeedModule,
  ],
})
export class AppModule {}
