import { RContext } from '@/types/global';

export default class GeneralController {
  public static async helloWorld(ctx: RContext) {
    ctx.body = 'Hello World!';
  }
}
