"use server";

import { prisma } from "../prisma";

export async function getDashboardData(userEmail: string) {
  const [allItems, urgentItems, recentItems, categories, categoryGroups] =
    await Promise.all([
      // 1. Fetch quantities for stats
      prisma.item.findMany({
        where: { user: { email: userEmail } },
        select: { quantity: true, minQuantity: true },
      }),

      // 2. Urgent items (quantity <= minQuantity)
      prisma.item.findMany({
        where: {
          user: { email: userEmail },
          quantity: { lte: prisma.item.fields.minQuantity },
        },
        take: 5,
        orderBy: { quantity: "asc" },
        include: { category: true },
      }),

      // 3. Recently added items
      prisma.item.findMany({
        where: { user: { email: userEmail } },
        take: 4,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),

      // 4. Categories list
      prisma.category.findMany(),

      // 5. Group items by category
      prisma.item.groupBy({
        by: ["categoryId"],
        _count: { id: true },
        where: { user: { email: userEmail } },
      }),
    ]);

  // Calculations
  const totalProducts = allItems.length;
  const totalUnits = allItems.reduce((acc, item) => acc + item.quantity, 0);
  const lowStockCount = allItems.filter(
    (item) => item.quantity <= item.minQuantity && item.quantity > 0,
  ).length;
  const outOfStockCount = allItems.filter((item) => item.quantity === 0).length;

  // Category percentage calculation
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const categoryStats = categoryGroups.map((group) => {
    const categoryName = group.categoryId
      ? categoryMap.get(group.categoryId) || "Uncategorized"
      : "Uncategorized";

    return {
      name: categoryName,
      count: group._count.id,
      percentage:
        totalProducts > 0
          ? Math.round((group._count.id / totalProducts) * 100)
          : 0,
    };
  });

  return {
    totalProducts,
    totalUnits,
    lowStockCount,
    outOfStockCount,
    urgentItems,
    recentItems,
    categoryStats,
  };
}
