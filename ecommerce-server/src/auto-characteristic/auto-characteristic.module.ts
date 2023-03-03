import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoCharacteristicController } from './auto-characteristic.controller';
import { AutoCharacteristicService } from './auto-characteristic.service';
import { AutoCharacteristic, AutoCharacteristicSchema } from './schema/auto-characteristic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: AutoCharacteristic.name,
      schema: AutoCharacteristicSchema
    }]),
  ],
  controllers: [AutoCharacteristicController],
  providers: [AutoCharacteristicService],
  exports: [AutoCharacteristicService]
})
export class AutoCharacteristicModule {}
