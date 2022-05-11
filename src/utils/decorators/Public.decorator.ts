import ErrorHandler from "../Classes/ErrorHandler";

export function Public(blockAuthUsers = false) {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const request = args[0] as any;

      if (request?.noToken) return original.apply(this, args);

      blockAuthUsers &&
        ErrorHandler.Unauthorized(
          "Ocorreu um erro ao verificar seu token de acesso. Faça logout ou tente novamente.",
          request.res
        );

      return original.apply(this, args);
    };
  };
}
