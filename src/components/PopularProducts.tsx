import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProduct { id: string, name: string, thumbnail: string, price: string, stock: number }

const popularProducts: Array<IProduct> = [
    {
        id: '3432',
        name: 'Macbook M1 Pro 14"',
        thumbnail: 'https://source.unsplash.com/100x100?macbook',
        price: '$1499.00',
        stock: 341
    },
    {
        id: '7633',
        name: 'Samsung Galaxy Buds 2',
        thumbnail: 'https://source.unsplash.com/100x100?earbuds',
        price: '$399.00',
        stock: 24
    },
    {
        id: '6534',
        name: 'Asus Zenbook Pro',
        thumbnail: 'https://source.unsplash.com/100x100?laptop',
        price: '$899.00',
        stock: 56
    },
    {
        id: '9234',
        name: 'LG Flex Canvas',
        thumbnail: 'https://source.unsplash.com/100x100?smartphone',
        price: '$499.00',
        stock: 98
    },
    {
        id: '4314',
        name: 'Apple Magic Touchpad',
        thumbnail: 'https://source.unsplash.com/100x100?touchpad',
        price: '$699.00',
        stock: 0
    },
    {
        id: '4342',
        name: 'Nothing Earbuds One',
        thumbnail: 'https://source.unsplash.com/100x100?earphone',
        price: '$399.00',
        stock: 453
    }
]


const PopularProducts = () => {
    return (
        <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
            <strong className="text-gray-700 font-medium">Popular Products</strong>
            <div className="mt-4 flex flex-col gap-3">
                {popularProducts.map((product: IProduct) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-start hover:no-underline"
                    >
                        <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                            <img
                                className="w-full h-full object-cover rounded-sm"
                                src={product.thumbnail}
                                alt={product.name}
                            />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm text-gray-800">{product.name}</p>
                            <span
                                className={classNames(
                                    product.stock === 0
                                        ? 'text-red-500'
                                        : product.stock > 50
                                            ? 'text-green-500'
                                            : 'text-orange-500',
                                    'text-xs font-medium'
                                )}
                            >
                                {product.stock === 0 ? 'Out of Stock' : product.stock + ' in Stock'}
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 pl-1.5">{product.price}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularProducts