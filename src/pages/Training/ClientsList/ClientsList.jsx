import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import ClientCard from '../../../components/Training/ClientCard';
import AddClientModal from '../../../components/Training/AddClientModal';
import './ClientsList.scss';

const ClientsList = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '0791234567',
      age: 28,
      weight: 65,
      height: 165,
      goal: 'إنقاص الوزن',
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      status: 'active',
      image: null
    },
    {
      id: 2,
      name: 'ليلى محمود',
      email: 'layla@example.com',
      phone: '0797654321',
      age: 32,
      weight: 58,
      height: 168,
      goal: 'بناء العضلات',
      startDate: '2024-12-15',
      endDate: '2025-03-15',
      status: 'active',
      image: null
    },
    {
      id: 3,
      name: 'نور الدين',
      email: 'noor@example.com',
      phone: '0799876543',
      age: 25,
      weight: 72,
      height: 170,
      goal: 'تنشيف',
      startDate: '2024-11-01',
      endDate: '2025-01-01',
      status: 'expired',
      image: null
    },
    {
      id: 4,
      name: 'مريم سالم',
      email: 'mariam@example.com',
      phone: '0795555555',
      age: 30,
      weight: 68,
      height: 162,
      goal: 'لياقة عامة',
      startDate: '2025-01-10',
      endDate: '2025-04-10',
      status: 'pending',
      image: null
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const handleAddClient = (clientData) => {
    if (editingClient) {
      setClients(clients.map(c => 
        c.id === editingClient.id ? { ...clientData, id: c.id } : c
      ));
      setEditingClient(null);
    } else {
      setClients([...clients, { ...clientData, id: Date.now() }]);
    }
  };
  
  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };
  
  const handleDeleteClient = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المتدرب؟')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };
  
  // Filter and Search
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  
  // Statistics
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    expired: clients.filter(c => c.status === 'expired').length,
    pending: clients.filter(c => c.status === 'pending').length
  };
  
  return (
    <div className="clients-list">
      {/* Page Header */}
      <motion.div
        className="clients-list__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="clients-list__header-content">
          <div className="clients-list__title-section">
            <h1 className="clients-list__title">
              <Users size={32} />
              إدارة المتدربين
            </h1>
            <p className="clients-list__subtitle">
              قم بإدارة جميع بيانات المتدربين والبرامج التدريبية
            </p>
          </div>
          
          <motion.button
            className="clients-list__add-btn"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            <span>إضافة متدرب</span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Statistics */}
      <motion.div
        className="clients-list__stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--primary">
            <Users size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">إجمالي المتدربين</span>
            <span className="stat-card__value">{stats.total}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">نشط</span>
            <span className="stat-card__value">{stats.active}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--danger">
            <XCircle size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">منتهي</span>
            <span className="stat-card__value">{stats.expired}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--warning">
            <AlertCircle size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">معلّق</span>
            <span className="stat-card__value">{stats.pending}</span>
          </div>
        </div>
      </motion.div>
      
      {/* Filters */}
      <motion.div
        className="clients-list__filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="ابحث عن متدرب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-box">
          <Filter size={20} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="expired">منتهي</option>
            <option value="pending">معلّق</option>
          </select>
        </div>
      </motion.div>
      
      {/* Clients Grid */}
      <motion.div
        className="clients-list__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence>
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <ClientCard
                client={client}
                onEdit={handleEditClient}
                onDelete={handleDeleteClient}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredClients.length === 0 && (
        <motion.div
          className="clients-list__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Users size={64} />
          <h3>لا يوجد متدربين</h3>
          <p>ابدأ بإضافة متدرب جديد باستخدام الزر أعلاه</p>
        </motion.div>
      )}
      
      {/* Add/Edit Modal */}
      <AddClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddClient}
        editClient={editingClient}
      />
    </div>
  );
};

export default ClientsList;