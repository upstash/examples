import { z } from 'zod';

export const ZCatSchema = z.object({
	id: z.string(),
});
export type TCatSchema = z.infer<typeof ZCatSchema>;
