import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Truck, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import {
    getProductById,
    getShippingMethods,
    getPaymentMethods,
    calculateShippingAPI,
} from "../api/client";
import { Product } from "../types";

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [shippingMethods, setShippingMethods] = useState<any[]>([]);
    const [selectedShipping, setSelectedShipping] = useState<any | null>(null);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [zipCode, setZipCode] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
    const addToCart = useStore((state) => state.addToCart);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setSelectedColor(data.colors[0]);
                setSelectedSize(data.sizes[0]);
            } catch (error) {
                console.error("Erro ao buscar detalhes do produto:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            try {
                const shippingData = await getShippingMethods();
                setShippingMethods(shippingData);
                setSelectedShipping(shippingData[0]);
                const paymentData = await getPaymentMethods();
                setPaymentMethods(paymentData);
            } catch (error) {
                console.error("Erro ao buscar métodos:", error);
            }
        })();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Por favor, selecione um tamanho.");
            return;
        }
        if (!selectedColor) {
            alert("Por favor, selecione uma cor.");
            return;
        }
        addToCart({ ...product, selectedSize, selectedColor });
    };

    const calculateShipping = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCalculatingShipping(true);
        try {
            const result = await calculateShippingAPI(zipCode);
            alert(`Frete calculado: ${result}`);
        } catch (error) {
            console.error("Erro ao calcular frete:", error);
        } finally {
            setIsCalculatingShipping(false);
        }
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        const colorImageIndex = product.images.findIndex((img) => img.color === color);
        if (colorImageIndex !== -1) {
            setCurrentImageIndex(colorImageIndex);
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative">
                    <div className="relative aspect-square">
                        <img
                            src={product.images[currentImageIndex].url}
                            alt={`${product.name} - ${product.images[currentImageIndex].color}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex gap-2 mt-4 justify-center">
                        {product.images.map((image, index) => (
                            <button
                                key={image.color}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                                    currentImageIndex === index
                                        ? "border-red-600"
                                        : "border-transparent"
                                }`}
                            >
                                <img
                                    src={image.url}
                                    alt={`${product.name} - ${image.color}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-semibold mb-6">R${product.price}</p>
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Cores</h3>
                        <div className="flex gap-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => handleColorChange(color)}
                                    className={`px-4 py-2 border rounded-md ${
                                        selectedColor === color
                                            ? "border-red-600 bg-red-50"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Tamanhos</h3>
                        <div className="flex gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded-md ${
                                        selectedSize === size
                                            ? "border-red-600 bg-red-50"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedSize || !selectedColor}
                        className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 mb-8"
                    >
                        Adicionar ao Carrinho
                    </button>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Truck className="h-5 w-5 mr-2" />
                            Calcular Frete
                        </h3>
                        <form onSubmit={calculateShipping} className="flex gap-4">
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="Digite seu CEP"
                                className="flex-1 rounded-md border-gray-300"
                            />
                            <button
                                type="submit"
                                disabled={isCalculatingShipping}
                                className={`px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 ${
                                    isCalculatingShipping ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {isCalculatingShipping ? "Calculando..." : "Calcular"}
                            </button>
                        </form>
                        <div className="mt-4 space-y-2">
                            {shippingMethods.map((method) => (
                                <label
                                    key={method.id}
                                    className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                                        selectedShipping?.id === method.id
                                            ? "border-red-600 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <div>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={selectedShipping?.id === method.id}
                                            onChange={() => setSelectedShipping(method)}
                                            className="mr-2"
                                        />
                                        <span>{method.name}</span>
                                        <span className="text-gray-500 text-sm ml-2">
                                            ({method.days} business days)
                                        </span>
                                    </div>
                                    <span className="font-semibold">
                                        {method.price === 0 ? "FREE" : `R$${method.price}`}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Métodos de Pagamento</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className="flex items-center justify-center p-4 border rounded-md"
                                >
                                    {method.icon === "credit" ? (
                                        <CreditCard className="h-6 w-6 mr-2" />
                                    ) : method.icon === "debit" ? (
                                        <CreditCard className="h-6 w-6 mr-2" />
                                    ) : (
                                        <method.customIcon className="h-6 w-6 mr-2" />
                                    )}
                                    <span>{method.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Detalhes do Produto</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {product.details.map((detail, index) => (
                                <li key={index} className="text-gray-600">
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}