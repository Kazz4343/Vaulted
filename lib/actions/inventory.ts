"use server"

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


export async function createItem( datas : CreateItemInput ) {
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
                    connect: { email: session.user.email}
                },
                ...(trimCat && {
                    category: {
                        connectOrCreate: {
                            where: { name: trimCat},
                            create: { name: trimCat}
                        }
                    }
                })
            }
        });
        revalidatePath('/dashboard/addItem');
        return { success: true, item: newItem }
    } catch (err : any ) {
        if (err.code === "P2002") {
            return { success: false, err:"An item with this SKU already exist." }
        }
        
        return { success: false, err: err.message || "Failed to create item" }
    }
}
