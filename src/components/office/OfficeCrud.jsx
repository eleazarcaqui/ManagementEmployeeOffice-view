import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CrudModal from '../common/CrudModal';
import officeFormConfig from '../../config/formConfigs/officeFormConfig';
import useOffices from '../../hooks/useOffices';
import { createOffice, updateOffice, deleteOfficeById } from '../../services/officeService';

const OfficeCrud = ({
    onAfterSubmit,
    renderEmployees,
    children
}) => {
    const [modalMode, setModalMode] = useState('create');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [formConfig, setFormConfig] = useState(officeFormConfig);

    const {
        isLoading
    } = useOffices();

    const handleCreate = () => {
        setModalMode('create');
        setSelectedOffice(null);
        setIsModalOpen(true);
    };

    const handleEdit = (office) => {
        setModalMode('edit');
        setSelectedOffice(office);
        setIsModalOpen(true);
    };

    const handleView = (office) => {
        setModalMode('view');
        setSelectedOffice(office);
        setIsModalOpen(true);
    };

    const handleDelete = (office) => {
        setModalMode('delete');
        setSelectedOffice(office);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (formData) => {
        try {
            if (modalMode === 'create') {
                await createOffice(formData);
            } else if (modalMode === 'edit') {
                await updateOffice(selectedOffice.id, formData);
            }

            handleCloseModal();

            if (onAfterSubmit) {
                onAfterSubmit(modalMode, formData);
            }
        } catch (error) {
            console.error(`Error al ${modalMode === 'create' ? 'crear' : 'actualizar'} oficina:`, error);
        }
    };

    const handleConfirmDelete = async (id) => {
        try {
            await deleteOfficeById(id);
            handleCloseModal();

            if (onAfterSubmit) {
                onAfterSubmit('delete', { id });
            }
        } catch (error) {
            console.error('Error al eliminar oficina:', error);
        }
    };

    const detailSections = renderEmployees ? [
        {
            title: 'Empleados Asignados',
            render: (office) => renderEmployees(office)
        }
    ] : [];

    return (
        <>
            <CrudModal
                mode={modalMode}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={selectedOffice}
                onSubmit={handleSubmit}
                onDelete={handleConfirmDelete}
                formConfig={formConfig}
                isLoading={isLoading}
                entityName="Oficina"
                extraConfig={{
                    detailSections,
                    enableEdit: false,
                    showOnlyCancel: modalMode === 'view',
                    onEdit: (office) => {
                        handleCloseModal();
                        handleEdit(office);
                    }
                }}
            />
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        onCreateClick: handleCreate,
                        onEditClick: handleEdit,
                        onViewClick: handleView,
                        onDeleteClick: handleDelete
                    });
                }
                return child;
            })}
        </>
    );
};

OfficeCrud.propTypes = {
    onAfterSubmit: PropTypes.func,
    renderEmployees: PropTypes.func,
    children: PropTypes.node
};

export default OfficeCrud;