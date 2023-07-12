import { publicViewerRouter } from './routes/_router';
import { mergeRouters, router } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = mergeRouters(
	// More room for private routes here.
	router({
		// Prefixes public routes with `/public`
		public: publicViewerRouter,
	})
)

// export type definition of API
export type AppRouter = typeof appRouter;
