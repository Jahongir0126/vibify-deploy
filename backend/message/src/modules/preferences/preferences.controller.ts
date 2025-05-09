import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PreferenceService } from './preferences.service';
import { PreferenceCreateDto, PreferenceUpdateDto } from './dtos';
import { PreferenceCommand } from './enums';

@Controller({

  path: '/preferences',
  version: '1',
}
)
export class PreferenceController {
  readonly #_service: PreferenceService
  constructor(service: PreferenceService) {
    this.#_service = service;
  }
  @MessagePattern(PreferenceCommand.PREFERENCE_CREATE)
  create(@Payload() payload: PreferenceCreateDto) {
    return this.#_service.create(payload);
  }
  @MessagePattern(PreferenceCommand.PREFERENCE_RETRIEVE_ALL)
  findAll() {
    return this.#_service.findAll();
  }

  @MessagePattern(PreferenceCommand.PREFERENCE_RETRIEVE)
  findOne(@Payload() payload: { id: string }) {
    return this.#_service.findOne(payload.id);
  }

  @MessagePattern(PreferenceCommand.PREFERENCE_UPDATE)
  update(@Payload() payload: { id: string } & PreferenceUpdateDto) {
    return this.#_service.update(payload.id, payload);
  }

  @MessagePattern(PreferenceCommand.PREFERENCE_DELETE)
  remove(@Payload() payload: { id: string }) {
    return this.#_service.remove(payload.id);
  }
}
