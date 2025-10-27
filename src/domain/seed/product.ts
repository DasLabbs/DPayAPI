import productRepo from "@domain/repo/product.repo";
import { RequestContext } from "@shared/lib/context";

const products = [
    {
        name: "AirFlex Runner",
        description:
            "Lightweight running shoes designed for maximum comfort and breathability.",
        price: 120,
        image: "https://via.placeholder.com/150?text=AirFlex+Runner",
        isActive: true,
    },
    {
        name: "Urban Street Pro",
        description: "Stylish streetwear sneakers perfect for everyday use.",
        price: 95,
        image: "https://via.placeholder.com/150?text=Urban+Street+Pro",
        isActive: true,
    },
    {
        name: "TrailMaster X",
        description:
            "Durable trail shoes built for rugged terrain and long hikes.",
        price: 140,
        image: "https://via.placeholder.com/150?text=TrailMaster+X",
        isActive: true,
    },
    {
        name: "ComfyWalk Slip-On",
        description: "Easy-to-wear slip-on shoes with memory foam soles.",
        price: 80,
        image: "https://via.placeholder.com/150?text=ComfyWalk+Slip-On",
        isActive: true,
    },
    {
        name: "EliteCourt Pro",
        description:
            "High-performance tennis shoes for speed and agility on the court.",
        price: 130,
        image: "https://via.placeholder.com/150?text=EliteCourt+Pro",
        isActive: false,
    },
    {
        name: "AeroLite Jogger",
        description:
            "Engineered mesh shoes that combine flexibility with lightweight cushioning.",
        price: 110,
        image: "https://via.placeholder.com/150?text=AeroLite+Jogger",
        isActive: true,
    },
    {
        name: "Classic Retro High",
        description:
            "Vintage-inspired high-top sneakers with premium leather finish.",
        price: 150,
        image: "https://via.placeholder.com/150?text=Classic+Retro+High",
        isActive: true,
    },
    {
        name: "CloudStep Comfort",
        description:
            "Extra soft cushioning with ergonomic support for daily wear.",
        price: 90,
        image: "https://via.placeholder.com/150?text=CloudStep+Comfort",
        isActive: true,
    },
    {
        name: "PowerGrip Training",
        description:
            "Multi-purpose training shoes with reinforced traction sole.",
        price: 115,
        image: "https://via.placeholder.com/150?text=PowerGrip+Training",
        isActive: false,
    },
    {
        name: "ZenBalance Yoga",
        description:
            "Flexible and lightweight shoes ideal for yoga and indoor workouts.",
        price: 85,
        image: "https://via.placeholder.com/150?text=ZenBalance+Yoga",
        isActive: true,
    },
];

export const createProducts = async (context: RequestContext) => {
    await productRepo.create(context, products);
};
