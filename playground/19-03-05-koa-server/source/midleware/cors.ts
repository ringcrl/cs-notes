function cors() {
  // 配置处理
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    await next();
  };
}

export { cors };
