import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role, ROLES_KEY } from '../decorators/roles.decorator';
import { JWT_SECRET_KEY } from '../enums/env';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.rawHeaders;
    let token = '';
    user.map((e) => {
      if (e.includes('Bearer')) {
        token = e.split(' ')[1];
      }
    });
    try {
      var decoded: any = this.jwtService.verify(token, {
        secret: JWT_SECRET_KEY,
      });
      if (decoded._doc.role) {
        return decoded._doc.role == requiredRoles;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
