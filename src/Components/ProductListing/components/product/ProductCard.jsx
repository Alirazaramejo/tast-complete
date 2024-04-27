import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

function ProductCard(props) {
    const { name, price, pid, imageUrl } = props;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="max-w-xs rounded-md shadow-md overflow-hidden">
            <Spin spinning={!imageLoaded} tip="Loading...">
                <img
                    src={imageUrl}
                    alt={name}
                    className={`object-contain object-center w-full h-72 ${imageLoaded ? 'block' : 'hidden'}`}
                    onLoad={handleImageLoad}
                />
            </Spin>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-700 mb-4">${price}</p>
                <Link to={`/product/${pid}`}>
                    <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        View
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default memo(ProductCard);
