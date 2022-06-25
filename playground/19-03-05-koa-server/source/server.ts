import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as koaStatic from 'koa-static';
import * as winston from 'winston';

import { cors } from './midleware/cors';
import { router } from './routes';
import { logger } from './logging';
import { config } from './config';

const app = new Koa();

app.use(bodyParser());

app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'master-only' }));

app.use(cors());

app.use(logger(winston));

app.use(koaStatic(config.CS_NOTES_PATH));
app.use(koaStatic(config.STATIC_PATH));

app.use(router.routes());

app.listen(config.PORT, () => {
  console.log(`Start at port ${config.PORT}`);
});

process.on('uncaughtException', (err) => {
  console.warn('uncaughtException', err);
});
