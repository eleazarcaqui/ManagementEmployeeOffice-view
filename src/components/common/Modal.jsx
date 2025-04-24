import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  confirmButton, 
  confirmText = 'Guardar', 
  cancelText = 'Cancelar', 
  isLoading = false, 
  danger = false 
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  const getModalWidth = () => {
    switch (size) {
      case 'sm': return 'max-w-md';
      case 'lg': return 'max-w-4xl';
      case 'xl': return 'max-w-6xl';
      default: return 'max-w-2xl'; 
    }
  };

  return (
    <div 
      id="modal-backdrop"
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-6"
      onClick={handleOutsideClick}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full ${getModalWidth()} max-h-[90vh] overflow-hidden flex flex-col`}>

        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none p-1 rounded-full hover:bg-gray-100"
          >
            <span className="sr-only">Cerrar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-8 py-6 overflow-y-auto flex-1">
          {children}
        </div>
        {(confirmButton || cancelText) && (
          <div className="px-8 py-5 border-t border-gray-200 flex justify-end space-x-4">
            {cancelText && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[5rem]"
                disabled={isLoading}
              >
                {cancelText}
              </button>
            )}
            {confirmButton && (
              <button
                type="button"
                onClick={confirmButton}
                className={`inline-flex justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                  ${danger ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[5rem]`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  confirmText
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  confirmButton: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool
};

export default Modal;