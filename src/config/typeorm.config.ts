import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('HOST'),
  port: configService.get('PORT'),
  database: configService.get('DATABASE'),
  username: configService.get('USERNAME'),
  password: configService.get('PASSWORD'),
  ssl: configService.get('NODE_ENV') === 'development' ? false : true,
  autoLoadEntities: true,
  synchronize: true,
});
