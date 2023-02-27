import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AutoController } from './auto.controller'
import { AutoService } from './auto.service'
import { Auto, AutoSchema } from './schema/auto.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auto.name, schema: AutoSchema }]),
  ],
  controllers: [AutoController],
  providers: [AutoService]
})
export class AutoModule {}
