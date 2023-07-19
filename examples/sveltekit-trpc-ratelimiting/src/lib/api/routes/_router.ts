import publicProcedure from '$lib/api/procedures/publicProcedure';
import { mergeRouters, router } from '$lib/api/trpc';
import { catRouter } from './cat.router';

export const publicViewerRouter = router({
	cat: catRouter,
})