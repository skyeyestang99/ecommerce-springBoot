import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { createProduct } from "../../service/product/createProduct";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    'name': '',
    'skuCode': '',
    'price': '',
    'quantity': '',
    'description': '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (keycloak && keycloak.authenticated) {
        await keycloak.updateToken(30);  // Ensure token freshness
        const token = keycloak.token;

        // Call the createProduct service and pass form data
        await createProduct(token, formData);
        alert('Product created successfully!');

        navigate('/');
        setFormData({ name: '', description: '', skuCode: '', price: '', quantity: ''});
      } else {
        setError('User not authenticated');
      }
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-product">
      <h1>Create New Product</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="skuCode">SKU Code:</label>
          <input
            type="text"
            id="skuCode"
            name="skuCode"
            value={formData.skuCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
