import { applyDecorators, UseGuards } from "@nestjs/common"
import { AdminGuard } from "../guards/admin.guard"
import { JwtAuthGuard } from "../guards/jwt.guard"
import { TypeRole } from "../types/role.interface"

export const Auth = (role: TypeRole = 'user'): MethodDecorator & ClassDecorator =>
    applyDecorators(
        role === 'admin'
            ? UseGuards(JwtAuthGuard, AdminGuard)
            : UseGuards(JwtAuthGuard)
    )
