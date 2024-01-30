import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey('pokemon')
  @CacheTTL(30)
  @Get('/:id')
  getPokemon(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getPokemon(+id);
  }
}
