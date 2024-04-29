import React, { useEffect, useState } from 'react';
import { Button, Spin, Modal, Input, Form } from 'antd';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';

function Table() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [updateProductId, setUpdateProductId] = useState(null);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({ name: '', price: '', imageUrl: '', quantity: '' });

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
                    setLoading(false);
                } else {
                    setProducts([]);
                    setLoading(false);
                }
            });
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        setDeleteProductId(id);
        setConfirmModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const productRef = ref(getDatabase(), `products/${deleteProductId}`);
            await remove(productRef);
            console.log('Product deleted successfully!');
            setConfirmModalVisible(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteProductId(null);
        setConfirmModalVisible(false);
    };

    const handleUpdate = (id) => {
        const productToUpdate = products.find(product => product.pid === id);
        setUpdateFormData({
            name: productToUpdate.name,
            price: productToUpdate.price,
            imageUrl: productToUpdate.imageUrl,
            quantity: productToUpdate.quantity
        });
        setUpdateProductId(id);
        setUpdateModalVisible(true);
    };

    const handleUpdateSubmit = async () => {
        try {
            const productRef = ref(getDatabase(), `products/${updateProductId}`);
            await update(productRef, updateFormData);
            console.log('Product updated successfully!');
            setUpdateModalVisible(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleUpdateCancel = () => {
        setUpdateProductId(null);
        setUpdateModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData({
            ...updateFormData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdateFormData({
                ...updateFormData,
                imageUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
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
                                <th className="px-6 py-3">Actions</th>
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
                                        <Button onClick={() => handleUpdate(product.pid)}>Update</Button>
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
                    <Modal
                        title="Update Product"
                        visible={updateModalVisible}
                        onOk={handleUpdateSubmit}
                        onCancel={handleUpdateCancel}
                    >
                        <Form>
                            <Form.Item label="Name">
                                <Input name="name" value={updateFormData.name} onChange={handleInputChange} />
                            </Form.Item>
                            <Form.Item label="Price">
                                <Input name="price" value={updateFormData.price} onChange={handleInputChange} />
                            </Form.Item>
                            <Form.Item label="Current Image">
                                <img src={updateFormData.imageUrl} alt="Product" className="w-16 h-16 object-cover rounded-full" />
                            </Form.Item>
                            <Form.Item label="New Image">
                                <Input type="file" onChange={handleImageChange} />
                            </Form.Item>
                            <Form.Item label="Quantity">
                                <Input name="quantity" value={updateFormData.quantity} onChange={handleInputChange} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default Table;
