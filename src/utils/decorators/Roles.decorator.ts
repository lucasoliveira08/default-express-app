import ErrorHandler from "../Classes/ErrorHandler";
import { Role } from "../enums/Roles.enum";

export function Roles(...roles: Role[]) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const request = args[0] as any;

      const { role: userRole }: { role: Role } = request.user;

      if (userRole.length === 0 || !roles.includes(userRole))
        return ErrorHandler.Unauthorized(
          "User not authorized to access this resource - Roles Decorator",
          "Você não tem permissão suficiente para acessar este recurso.",
          request.res
        );

      return original.apply(this, args);
    };
  };
}
