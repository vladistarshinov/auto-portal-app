import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import {ExtractJwt, Strategy } from "passport-jwt";
import { User, UserDocument } from "src/user/schema/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    public async validate({email}: Pick<User, 'email'>): Promise<User> {
        return this.userModel.findOne({email}).exec()
    }
}