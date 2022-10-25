import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { PassengerController } from './passenger.controller';

@Module({
  providers: [ProxyModule],
  controllers: [PassengerController]
})
export class PassengerModule {}
