import {Module} from '@nestjs/common';
import {DashboardController} from './api/dashboard.controller';
import {DashboardService} from './application/dashboard.service';
import {HttpModule} from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {
}
