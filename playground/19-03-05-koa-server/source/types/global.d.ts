import { ParameterizedContext, DefaultState, Context } from 'koa';
import * as Router from 'koa-router';

export type RContext = ParameterizedContext<
DefaultState,
Context & Router.IRouterParamContext<DefaultState, Context>
>;
