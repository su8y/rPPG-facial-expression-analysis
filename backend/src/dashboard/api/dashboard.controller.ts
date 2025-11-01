import {Controller, Get, UseGuards} from '@nestjs/common';
import {DashboardService} from '../application/dashboard.service';
import {AuthGuard} from '../../auth/application/auth.guard';
import {DashboardData} from '../domain/rppg.type';

@Controller('api/sessions')
@UseGuards(AuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {
    }

    @Get('result-report')
    async getResultReport(): Promise<DashboardData> {
        return this.dashboardService.getResultReport();
    }
}
