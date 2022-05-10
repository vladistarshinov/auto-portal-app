import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from 'src/user/user.model';

export class JwtAdminGuard implements CanActivate {
	constructor(private _reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: UserModel }>();
		const user = request.user;

		if (!user.isAdmin) throw new ForbiddenException('You have not rights!');

		return user.isAdmin;
	}
}
