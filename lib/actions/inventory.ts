"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "../auth";

interface CreateItemInput {
  name: string;
  sku: string;
  categoryName: string;
  quantity: number;
  minQuantity: number;
  description?: string;
}

export async function createItem(datas: CreateItemInput) {
  try {
    const trimCat = datas.categoryName.trim();

    const { data: session } = await auth.getSession();

    if (!session?.user) {
      return { success: false, err: "Unauthorized. Please log in first." };
    }

    const newItem = await prisma.item.create({
      data: {
        name: datas.name,
        sku: datas.sku,
        quantity: datas.quantity,
        minQuantity: datas.minQuantity,
        description: datas.description || null,
        user: {
          connect: { email: session.user.email },
        },
        ...(trimCat && {
          category: {
            connectOrCreate: {
              where: { name: trimCat },
              create: { name: trimCat },
            },
          },
        }),
      },
    });
    revalidatePath("/dashboard/addItem");
    return { success: true, item: newItem };
  } catch (err: any) {
    if (err.code === "P2002") {
      return { success: false, err: "An item with this SKU already exist." };
    }

    return { success: false, err: err.message || "Failed to create item" };
  }
}

export async function updateItem(itemId: string, datas: CreateItemInput) {
  try {
    const trimCat = datas.categoryName.trim();

    const { data: session } = await auth.getSession();

    if (!session?.user) {
      return { success: false, err: "Unauthorized. Please log in first." };
    }

    const existing = await prisma.item.findFirst({
      where: {
        id: itemId,
        user: { email: session.user.email },
      },
    });

    if (!existing) {
      return { success: false, err: "Item not found." };
    }

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        name: datas.name,
        sku: datas.sku,
        quantity: datas.quantity,
        minQuantity: datas.minQuantity,
        description: datas.description || null,
        category: trimCat
          ? {
              connectOrCreate: {
                where: { name: trimCat },
                create: { name: trimCat },
              },
            }
          : { disconnect: true },
      },
    });

    revalidatePath("/dashboard");
    return { success: true, item: updatedItem };
  } catch (err: any) {
    if (err.code === "P2002") {
      return { success: false, err: "An item with this SKU already exist." };
    }

    return { success: false, err: err.message || "Failed to update item" };
  }
}

export async function adjustQuantity(itemId: string, delta: number) {
  try {
    const { data: session } = await auth.getSession();

    if (!session?.user) {
      return { success: false, err: "Unauthorized. Please log in first." };
    }

    const existing = await prisma.item.findFirst({
      where: {
        id: itemId,
        user: { email: session.user.email },
      },
    });

    if (!existing) {
      return { success: false, err: "Item not found." };
    }

    const nextQuantity = Math.max(0, existing.quantity + delta);

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { quantity: nextQuantity },
    });

    revalidatePath("/dashboard");
    return { success: true, quantity: updatedItem.quantity };
  } catch (err: any) {
    return { success: false, err: err.message || "Failed to update quantity" };
  }
}

export async function getPagination(page: number = 1, pageSize: number = 8) {
  const skip = (page - 1) * pageSize;

  const [items, totalItems] = await Promise.all([
    prisma.item.findMany({
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.item.count(),
  ]);

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
  };
}
