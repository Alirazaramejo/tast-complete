import React, { useEffect, useState } from 'react';
import { Button, Spin, Modal } from 'antd'; // Assuming Modal is the confirmation modal component
import { getDatabase, ref, onValue, remove } from 'firebase/database';

function Table() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [deleteProductId, setDeleteProductId] = useState(null); // State to manage which product to delete
    const [confirmModalVisible, setConfirmModalVisible] = useState(false); // State to manage visibility of confirmation modal

    useEffect(() => {
        const fetchData = () => {
            const dbRef = ref(getDatabase(), 'products');
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const productsArray = Object.keys(data).map(key => ({
                        ...data[key],
                        pid: key
                    }));
                    setProducts(productsArray);
                    setLoading(false); // Set loading to false after data is fetched
                } else {
                    setProducts([]);
                    setLoading(false); // Set loading to false if no data is available
                }
            });
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        setDeleteProductId(id); // Set the product id to delete
        setConfirmModalVisible(true); // Open the confirmation modal
    };

    const handleConfirmDelete = async () => {
        try {
            const productRef = ref(getDatabase(), `products/${deleteProductId}`);
            await remove(productRef);
            console.log('Product deleted successfully!');
            setConfirmModalVisible(false); // Close the confirmation modal
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteProductId(null); // Clear the delete product id
        setConfirmModalVisible(false); // Close the confirmation modal
    };

    return (
        <div className="overflow-x-auto">
            {loading ? (
                <div className="text-center py-4">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <table className="min-w-full text-center border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, idx) => (
                                <tr key={product.pid} className="bg-gray-200">
                                    <td className="px-6 py-4">{idx + 1}</td>
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">
                                        <img src={product.imageUrl} alt="Product" className="w-16 h-16 object-cover rounded-full" />
                                    </td>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                    <td className="px-6 py-4">
                                        <Button onClick={() => handleDelete(product.pid)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal
                        title="Confirm Delete"
                        visible={confirmModalVisible}
                        onOk={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    >
                        <p>Are you sure you want to delete this product?</p>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default Table;
