

type serviceType<T = any> = { new(...args:any[]) : T }

class ReflectiveInjector {
    private static records: {token: serviceType, deps: any}[] = []

    static resolveAndCreate(tokens: Array<serviceType>){
        tokens.forEach(token => {
            ReflectiveInjector.records.push({
                token,
                deps: Reflect.getOwnMetadata("design:paramtypes", token) || []
            })
        })
        return this;
    }

    private static getRecord(_token: serviceType){
        const results = ReflectiveInjector.records.filter(record => {
            return record.token === _token
        });
        if(results.length > 0) return results[0];
        return undefined;
    }

    static has<T>(_token: serviceType<T>): boolean {
        return Boolean(this.getRecord(_token));
    }

    static get<T>(_token: serviceType<T>): T {
        let record = this.getRecord(_token);
        if(!record) throw new Error(`Service ${_token.name} not exist.`)

        let { token, deps } = record;
        deps = deps.map((dep: any) => new dep())

        return new token(...deps);
    }
}


/**
 * Class Decorator for create service
 * @param constructor 
 */
export function Service<T extends serviceType>(constructor: T): T{
    ReflectiveInjector.resolveAndCreate([constructor]);
    return constructor;
}

export function useService<T>(service: serviceType<T>): T;
export function useService<T>(...args:any[]): T {
    return ReflectiveInjector.get(args[0]);
}


/*
export function InjectService(identifier: string) : (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export function InjectService(target: Object, propertyKey: string | symbol, parameterIndex: number) : void;
export function InjectService(...args: any[]){
    console.log("InjectService", args)
    if(args.length > 1){
        const [target, propertyKey, parameterIndex] = args;
        __injectService(target, propertyKey, parameterIndex);
    } else {
        const identifier = args[0] as string;
        return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
            __injectService(target, propertyKey, parameterIndex, identifier);
        }
    }
}
function __injectService(target: Object, propertyKey: string | symbol, parameterIndex: number, serviceIdentifier?:string){
    console.log(Reflect.getMetadata("design:type", target, propertyKey));
}


*/