import type { AppRouter } from "$lib/api/root";

export type Cat = AppRouter['public']['cat']['getMany']['_def']['_output_out'][number];