import { Prisma } from "@prisma/client";
import { ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

import { BackButton } from "./backButton";

interface OrderListProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                };
            };
            orderProducts: {
                select: {
                    quantity: true,
                },
                include: {
                    product: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            }
        };
        total: true,
    }>[];
}

const OrderList = ({ orders }: OrderListProps) => {
    return ( 
        <div className="space-y-6 p-6">
            <BackButton />
            <div className="flex items-center gap-3">
                <ScrollTextIcon />
                <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            </div>
            {orders.map(order => (
                <Card key={order.id}>
                    <CardContent className="p-5 space-y-4">
                        <div className="bg-gray-500 text-white w-fit rounded-full px-2 py-1 text-xs font-semibold">
                            {order.status}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                                <Image src={order.restaurant.avatarImageUrl} alt={order.restaurant.name} className="rounded-sm" fill/>
                            </div>
                            <p className="font-semibold text-sm">{order.restaurant.name}</p>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <div>
                                {order.orderProducts.map(product => (
                                    <div key={product.product.id} className="flex items-center gap-2 py-1">
                                        <div className="font-semibold flex items-center justify-center p-2 bg-gray-500 w-5 h-5 text-center rounded-full text-white text-sm">
                                            {product.quantity}
                                        </div>
                                        <p className="text-sm">{product.product.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center text-sm">
                            {formatCurrency(order.total)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
 
export default OrderList;