import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AdminConstants } from "common/constants/dto.constants";
import { User } from "src/user/schema/user.schema";

export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    public canActivate(ctx: ExecutionContext): boolean {
        const request = ctx.switchToHttp().getRequest<{user: User}>()
        const user = request.user

        if (!user.isAdmin) throw new ForbiddenException(AdminConstants.NO_RIGHT)

        return user.isAdmin
    }
}