import {HttpStatus, Injectable, InternalServerErrorException,} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';
import {DashboardData} from '../domain/rppg.type';
import {AxiosError} from 'axios';

@Injectable()
export class DashboardService {
    constructor(private readonly httpService: HttpService) {
    }

    async getResultReport(): Promise<DashboardData> {
        try {
            const response = await firstValueFrom(
                this.httpService.get<DashboardData>(
                    process.env.DASHBOARD_URL as string,
                ),
            );
            return response.data;
        } catch (error) {
            if (
                error instanceof AxiosError &&
                error.response?.status === HttpStatus.INTERNAL_SERVER_ERROR
            ) {
                throw new InternalServerErrorException('Upstream Server error (500)');
            }

            throw new InternalServerErrorException('Unknown error occurred');
        }
    }
}
