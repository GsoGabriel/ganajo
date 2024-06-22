import React from 'react';

const DeleteProductForm = ({ onClose, onDelete }) => {
    return (
        <div className="edit-form-container">
            <p>Deseja deletar o produto?</p>
            <form>
                <button>Deletar</button>
                <button>Cancelar</button>
            </form>
        </div>
    );
};

export default DeleteProductForm;