import { FunctionOptions, FunctionTrigger, InvocationContext, LogHandler } from "@azure/functions";
import { DurableEntityContext } from "../durableentitycontext";

export type EntityHandler<T> = (context: EntityContext<T>) => void;

export interface EntityOptions<T> extends Partial<FunctionOptions> {
    handler: EntityHandler<T>;
}

export interface EntityTrigger extends FunctionTrigger {
    type: "entityTrigger";
}

/**
 * Context object passed to entity Functions.
 */
export interface EntityContext<T> extends InvocationContext {
    /**
     * Object containing all DF entity APIs and properties
     */
    df: DurableEntityContext<T>;
}

/**
 * An entity context with dummy default values to facilitate mocking/stubbing the
 * Durable Functions API.
 */
export declare class DummyEntityContext<T> extends InvocationContext implements EntityContext<T> {
    /**
     * Creates a new instance of a dummy entity context.
     * All parameters are optional but are exposed to enable flexibility
     * in the testing process.
     *
     * @param functionName The name of the entity function
     * @param invocationId The ID of this particular invocation of the entity function
     * @param logHandler A handler to emit logs coming from the entity function
     */
    constructor(functionName?: string, invocationId?: string, logHandler?: LogHandler);

    df: DurableEntityContext<T>;
}

/**
 * A unique identifier for an entity, consisting of entity class and entity key.
 */
export declare class EntityId {
    /**
     * Create an entity id for an entity.
     * @param name The name of the entity class.
     * @param key The entity key. Uniquely identifies an entity among all instances of the same class.
     * @returns an `EntityId` instance
     */
    constructor(name: string, key: string);

    /**
     * The name of the entity class
     */
    readonly name: string;
    /**
     * The entity key.
     * Uniquely identifies an entity among all instances of the same class.
     */
    readonly key: string;
    /*
     * Serializes the Entity ID into a string
     */
    toString(): string;
}

/**
 * The response returned by DurableClient.readEntityState().
 */
export declare class EntityStateResponse<T> {
    /**
     * Whether this entity exists or not.
     */
    entityExists: boolean;
    /**
     * The current state of the entity, if it exists, or default value otherwise.
     */
    entityState?: T;

    /**
     *
     * @param entityExists Whether this entity exists or not.
     * @param entityState The current state of the entity, if it exists, or default value otherwise.
     */
    constructor(entityExists: boolean, entityState?: T);
}
