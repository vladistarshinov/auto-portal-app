import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const getMongoConfig = async (
  configService: ConfigService
): Promise<MongooseModuleOptions> => ({
  uri: configService.get<string>('MONGO_URI'),
})
