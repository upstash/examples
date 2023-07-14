import publicProcedure from '$lib/api/procedures/publicProcedure';
import { router } from '$lib/api/trpc';
import { TRPCError } from '@trpc/server';
import { ZCatSchema } from './cat.schema';
import cats from './cats.json';
import highfiveRatelimitMiddleware from '../middlewares/ratelimitMidleware';
import { redis } from '$lib/config/upstash';

const getHighfiveKey = (id: string) => `highfive:${id}`;

export const catRouter = router({
    get: publicProcedure
        .input(ZCatSchema)
        .query(async ({ input }) => {
            const cat = cats.find((cat) => cat.id === input.id);

            if (!cat) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Cat not found',
                });
            }

            return cat;
        }),

    getMany: publicProcedure
        .query(async ({ input }) => {
            const allCats = await Promise.all(
                cats.map(async (cat) => {
                    const identifier = getHighfiveKey(cat.id);
                    const result = await redis.get<number | null>(identifier);

                    return {
                        ...cat,
                        highfives: result,
                    }
                })
            );

            return allCats;
        }),

    highfive: publicProcedure
        .use(highfiveRatelimitMiddleware)
        .input(ZCatSchema)
        .mutation(async ({ input, ctx: { getClientAddress } }) => {
            const cat = cats.find((cat) => cat.id === input.id);

            if (!cat) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Cat not found',
                });
            }

            const identifier = getHighfiveKey(input.id);
            const result = await redis.incr(identifier);

            return {
                ...cat,
                highfives: result,
            };
        }),
});
