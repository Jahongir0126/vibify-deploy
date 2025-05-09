import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Patch } from '@nestjs/common'
import { PreferenceService } from '../../clients/preferences/preference.service';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { PreferenceRetrieveAllResponse } from '@clients';
import { PreferenceCreateDto, PreferenceUpdateDto, PreferenceDeleteDto } from './dtos';

@ApiTags('Preferences')
@Controller({
    path: '/preferences',
    version: '1',
})
export class PreferencesController {
    readonly #_service: PreferenceService

    constructor(service: PreferenceService) {
        this.#_service = service
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: PreferenceCreateDto })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async createPreference(@Body() dto: PreferenceCreateDto): Promise<any> {
        return await this.#_service.createPreference(dto)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async retrieveAllPreferences(): Promise<PreferenceRetrieveAllResponse[]> {
        return await this.#_service.retrieveAllPreferences()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async retrievePreference(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<PreferenceRetrieveAllResponse> {
        return await this.#_service.retrievePreference(id)
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: PreferenceUpdateDto })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async updatePreference(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: PreferenceUpdateDto
    ): Promise<any> {
        return await this.#_service.updatePreference(id, dto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async deletePreference(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<any> {
        return await this.#_service.deletePreference(id)
    }
} 