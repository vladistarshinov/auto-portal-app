import {ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { DtoConstants } from "common/constants/dto.constants";
import { Types } from "mongoose";

export class IdValidationPipe implements PipeTransform {
    public transform(value: string, meta: ArgumentMetadata) {
        if (meta.type !== 'param') return value

        if (!Types.ObjectId.isValid(value))
            throw new BadRequestException(DtoConstants.CUSTOM_ID)

        return value
    }
}