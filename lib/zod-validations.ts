import { AccountType } from "@prisma/client";
import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.nativeEnum(AccountType),
});

export type AccountInput = z.infer<typeof accountSchema>;

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 1;
      const num = parseInt(val, 10);
      return Number.isInteger(num) && num > 0 ? num : 1;
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 10;
      const num = parseInt(val, 10);
      return Number.isInteger(num) && num > 0 ? num : 10;
    }),
});
