import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role, ROLES_KEY } from '../decorators/roles.decorator';
import { JWT_SECRET_KEY } from '../enums/env';
const jwt = require('jsonwebtoken');
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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
    const token = user[1].split(' ')[1];
    try {
      var decoded = jwt.verify(token, JWT_SECRET_KEY)._doc;
      if (decoded.role) {
        return decoded.role == requiredRoles;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
