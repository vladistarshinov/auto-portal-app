import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { TypeData } from "../types/user.interface"

export const User = createParamDecorator(
    (data: TypeData, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user
        return data ? user?.[data] : user
    }
);