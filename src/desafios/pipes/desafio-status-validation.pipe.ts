import { BadRequestException, PipeTransform } from '@nestjs/common';
import { DesafioStatusEnum } from '../enum/desafio-status.enum';

export class DesafioStatusValidationPipe implements PipeTransform {
  readonly statusPermitidos = [
    DesafioStatusEnum.ACEITO,
    DesafioStatusEnum.NEGADO,
    DesafioStatusEnum.CANCELADO,
  ];
  transform(value: any): any {
    if (value.status) {
      const status = value.status.toUpperCase();

      if (!this.statusPermitidos.includes(status)) {
        throw new BadRequestException(`${status} é um status inválido`);
      }
    }
    return value;
  }
}
