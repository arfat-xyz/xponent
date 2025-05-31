import {
  formatErrorResponse,
  formatResponse,
  routeErrorHandler,
} from "@/lib/api-response-handler";
import { db } from "@/lib/db";
import { accountSchema } from "@/lib/zod-validations";

// GET single account
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const account = await db.account.findUnique({
      where: { id: params.id },
    });

    if (!account) {
      return formatErrorResponse("Account not found", 404);
    }

    return formatResponse(account, "Account fetched successfully");
  } catch (error) {
    console.log("Error fetching account", { error });
    return routeErrorHandler(error);
  }
}

// PUT update account
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = accountSchema.safeParse(body);

    const account = await db.account.update({
      where: { id: params.id },
      data: validation.data,
    });

    return formatResponse(account, "Account updated successfully");
  } catch (error) {
    console.log("Error updating account", { error });
    return routeErrorHandler(error);
  }
}

// DELETE account
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if account has any journal entries
    const hasEntries = await db.journalEntryLine.count({
      where: { accountId: params.id },
    });

    if (hasEntries > 0) {
      return formatErrorResponse(
        "Cannot delete account with existing journal entries",
        400
      );
    }

    await db.account.delete({
      where: { id: params.id },
    });

    return formatResponse(null, "Account deleted successfully");
  } catch (error) {
    console.log("Error deleting account", { error });
    return routeErrorHandler(error);
  }
}
