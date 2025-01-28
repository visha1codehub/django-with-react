import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Store item to be deleted

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/data/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/data/", newItem);
      setData([...data, response.data]);
      setNewItem({ title: "", description: "" });
      // Show success message
      toast.success("Item added successfully!", {
        position: "top-right",  // Position of the toast
        autoClose: 3000,        // Duration in milliseconds
        hideProgressBar: true,  // Hide progress bar
        closeOnClick: true,     // Allow closing on click
        pauseOnHover: true,     // Pause on hover
        draggable: true,        // Allow dragging
        progress: undefined,    // Disable progress bar
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/data/${id}/`, editItem);
      setData(data.map((item) => (item.id === id ? response.data : item)));
      setEditItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/data/${itemToDelete.id}/`);
      setData(data.filter((item) => item.id !== itemToDelete.id));
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item); // Set the item to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal without deleting
    setItemToDelete(null); // Reset the item to be deleted
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold text-neonBlue mb-6">Django & React Integration</h1>

      {/* Add New Item */}
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-8 mb-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-100">Add New Item</h2>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          className="w-full p-4 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="w-full p-4 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <button
          onClick={addItem}
          className="w-full p-4 bg-neonBlue text-white rounded-lg font-semibold hover:bg-neonBlueDark transition duration-300"
        >
          Add Item
        </button>
      </div>

      {/* Display Items */}
      <div className="w-full max-w-lg space-y-6">
        {data.map((item) => (
          <div key={item.id} className="bg-gray-800 shadow-lg rounded-lg p-8">
            {editItem && editItem.id === item.id ? (
              <div>
                <input
                  type="text"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  className="w-full p-4 mb-4 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                <textarea
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full p-4 mb-4 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateItem(item.id)}
                    className="p-4 bg-neonGreen text-white rounded-lg font-semibold hover:bg-neonGreenDark transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditItem(null)}
                    className="p-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-100">{item.title}</h2>
                <p className="text-lg text-gray-400 mb-4">{item.description}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setEditItem(item)}
                    className="p-4 bg-neonPink text-white rounded-lg font-semibold hover:bg-neonPinkDark transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="p-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
          <div className="bg-gray-900 p-8 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex space-x-4">
              <button
                onClick={deleteItem}
                className="p-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={handleModalClose}
                className="p-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    {/* Toast Container */}
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        className="toast-container"
      />
    </div>
  );
};

export default App;
