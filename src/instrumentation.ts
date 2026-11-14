import { logger } from '@/lib/logger';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    logger.info('🚀 [Instrumentation] Runtime Next.js Admin aktif dengan Pino Logger.');
  }
}

export async function onRequestError(
  err: { digest?: string } & Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
    renderSource?: 'react-server-components' | 'server-rendering';
  }
) {
  logger.error(
    {
      path: request.path,
      method: request.method,
      routePath: context.routePath,
      routeType: context.routeType,
      digest: err.digest,
      errorMessage: err.message,
      stack: err.stack,
    },
    '🔥 [Instrumentation] Server/Action Request Error Tercatat'
  );
}

