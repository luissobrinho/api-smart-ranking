import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoParamaetrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value) {
      throw new BadRequestException({
        message: `O valor do paramentro ${metadata.data} deve ser informado`,
        code: 'INPUT.EMAIL_NOT_EMPTY',
        error: 'Bad Request',
        statusCode: 400,
      });
    }
    return value;
  }
}
