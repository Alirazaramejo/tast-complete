import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductData } from "../../services/products.service";
import { Spin } from 'antd';

function SinglePage() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductData(id);
        setProductData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };
    fetchData();
  }, [id]);

  return (
    <Spin spinning={loading} tip="Loading...">
      {productData && (
        <div className="container mx-auto my-10 px-4">
          <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <Spin spinning={loading} tip="Loading...">
              <img
                src={productData[1]}
                alt={productData[2]}
                className="w-full h-64 object-cover"
                onLoad={() => setLoading(false)} // Set loading to false when the image is loaded
              />
            </Spin>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Name : {productData[2]}
              </h2>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Price:</span>
                <span className="text-gray-900 font-semibold">
                  ${productData[4]}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Description :{productData[0]}
              </p>
              <button className="block w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
}

export default SinglePage;
