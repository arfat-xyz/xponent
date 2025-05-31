import { formatResponse, routeErrorHandler } from "@/lib/api-response-handler";
import { db } from "@/lib/db";
import { accountSchema, paginationSchema } from "@/lib/zod-validations";

export async function GET(req: Request) {
  try {
    // Verify db connection
    await db.$connect();

    const url = new URL(req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Validate and transform pagination parameters
    const { limit, page } = paginationSchema.parse(searchParams);
    const skip = (page - 1) * limit;

    // Use transaction for both queries
    const [accounts, totalCount] = await db.$transaction([
      db.account.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.account.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return formatResponse(
      {
        data: accounts,
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      "Accounts fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching accounts", error);
    return routeErrorHandler(error);
  } finally {
    await db.$disconnect();
  }
}

// POST create new account
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = accountSchema.parse(body);

    const account = await db.account.create({
      data: validation,
    });

    return formatResponse(account, "Account created successfully");
  } catch (error) {
    console.log("Error creating account", { error });
    return routeErrorHandler(error);
  }
}
