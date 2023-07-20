import {
    FunctionHandler,
    FunctionInput,
    FunctionOptions,
    FunctionOutput,
    FunctionTrigger,
} from "@azure/functions";
import { RetryOptions, Task } from "durable-functions";

export type ActivityHandler = FunctionHandler;

export interface ActivityOptions extends Partial<FunctionOptions> {
    handler: ActivityHandler;
    extraInputs?: FunctionInput[];
    extraOutputs?: FunctionOutput[];
}

export interface ActivityTrigger extends FunctionTrigger {
    type: "activityTrigger";
}

export type YieldableActivity = {
    (input?: unknown): YieldableActivityTask;
};

export interface YieldableActivityTask extends Task {
    withRetry: (retryOptions: RetryOptions) => Task;
}
