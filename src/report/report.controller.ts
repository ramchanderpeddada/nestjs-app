import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';
const getReportType = (type: string) =>
  type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
//controllers are classes that alows to create end points

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportSevice: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    return this.reportSevice.getAllReports(getReportType(type));
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportSevice.getReportById(getReportType(type), id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.reportSevice.createReport(getReportType(type), {
      amount,
      source,
    });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id') id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportSevice.updateReport(getReportType(type), id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.reportSevice.deleteReport(id);
  }
}
