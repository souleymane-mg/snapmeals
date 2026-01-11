import React, { useState, useMemo } from 'react';
import { 
  BarChart as ChartIcon, 
  Menu as MenuIcon, 
  ClipboardList, 
  Settings, 
  Search, 
  Clock, 
  CheckCircle,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Bell,
  Camera,
  Printer,
  ChevronRight,
  Video,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_ORDERS, CATEGORIES } from '../../../config/constants';
import { Order, OrderStatus, Dish } from '../../../types';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface RestaurateurScreenProps {
  onLogout: () => void;
  dishes: Dish[];
  onUpdateDishes: (dishes: Dish[]) => void;
}

const RestaurateurScreen: React.FC<RestaurateurScreenProps> = ({ onLogout, dishes, onUpdateDishes }) => {
  const [activeTab, setActiveTab] = useState('Commandes');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  
  // Modal State
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: '',
    price: 0,
    category: 'Burger',
    description: '',
    image: '',
    videoUrl: ''
  });

  // Interactive States
  const [isOpen, setIsOpen] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [statRange, setStatRange] = useState('Cette semaine');

  // Stats Data
  const statsData = useMemo(() => {
    if (statRange === 'Cette semaine') {
        return [
            { name: 'Lun', sales: 4000 },
            { name: 'Mar', sales: 3000 },
            { name: 'Mer', sales: 5500 },
            { name: 'Jeu', sales: 2780 },
            { name: 'Ven', sales: 8890 },
            { name: 'Sam', sales: 9390 },
            { name: 'Dim', sales: 7490 },
        ];
    } else {
        // Mocking Last Week Data
        return [
            { name: 'Lun', sales: 3200 },
            { name: 'Mar', sales: 2800 },
            { name: 'Mer', sales: 4500 },
            { name: 'Jeu', sales: 3000 },
            { name: 'Ven', sales: 6000 },
            { name: 'Sam', sales: 7500 },
            { name: 'Dim', sales: 6200 },
        ];
    }
  }, [statRange]);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-orange-100 text-orange-600';
      case OrderStatus.PREPARING: return 'bg-blue-100 text-blue-600';
      case OrderStatus.READY: return 'bg-yellow-100 text-yellow-600';
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDeleteDish = (id: string) => {
    if(confirm('Êtes-vous sûr de vouloir supprimer ce plat du menu ?')) {
      onUpdateDishes(dishes.filter(item => item.id !== id));
    }
  };

  const handleEditDish = (dish: Dish) => {
      setNewDish({
          name: dish.name,
          price: dish.price,
          category: dish.category,
          description: dish.description,
          image: dish.image,
          videoUrl: dish.videoUrl || ''
      });
      setIsEditing(true);
      setEditingId(dish.id);
      setShowAddDishModal(true);
  };

  const handleOpenAddModal = () => {
      setNewDish({ name: '', price: 0, category: 'Burger', description: '', image: '', videoUrl: '' });
      setIsEditing(false);
      setEditingId(null);
      setShowAddDishModal(true);
  };

  const handleSaveDish = () => {
    if (!newDish.name || !newDish.price) {
      alert("Veuillez remplir au moins le nom et le prix.");
      return;
    }

    if (isEditing && editingId) {
        // Update existing
        onUpdateDishes(dishes.map(d => d.id === editingId ? { ...d, ...newDish, price: Number(newDish.price) } as Dish : d));
    } else {
        // Create new
        const dishToAdd: Dish = {
            id: `d-${Date.now()}`,
            name: newDish.name!,
            price: Number(newDish.price),
            rating: 5.0,
            deliveryTime: 30,
            image: newDish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            category: newDish.category || 'Burger',
            description: newDish.description || '',
            calories: 0,
            isAvailable: true,
            videoUrl: newDish.videoUrl
        };
        onUpdateDishes([dishToAdd, ...dishes]);
    }

    setShowAddDishModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Compte':
        return (
          <div className="p-6 pb-28">
             <h2 className="text-2xl font-bold mb-6 text-gray-800">Paramètres</h2>
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative group cursor-pointer ring-4 ring-orange-50" onClick={() => alert("Image picker would open here")}>
                  <ImageWithSkeleton src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80" alt="Logo Restaurant" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900">Tasty Burger Bamako</h3>
                <p className="text-gray-500 text-sm">Fast Food • 4.8 ⭐</p>
                <button onClick={() => alert("Edit profile details")} className="mt-4 text-orange-500 font-bold text-sm hover:bg-orange-50 px-4 py-2 rounded-full transition-colors">Modifier le profil</button>
             </div>

             <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                   <span className="font-medium text-gray-700">Statut du Restaurant</span>
                   <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                   >
                     {isOpen ? 'Ouvert' : 'Fermé'}
                   </button>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                   <span className="font-medium text-gray-700">Notifications</span>
                   <button onClick={() => setNotificationsEnabled(!notificationsEnabled)} className={`w-12 h-7 rounded-full relative transition-colors ${notificationsEnabled ? 'bg-orange-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${notificationsEnabled ? 'left-6' : 'left-1'}`}></div>
                   </button>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 active:scale-98 transition-transform" onClick={() => alert("Imprimante connectée !")}>
                   <div className="flex items-center gap-3">
                     <Printer size={20} className="text-gray-500" />
                     <span className="font-medium text-gray-700">Paramètres d'impression</span>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
                <button onClick={onLogout} className="w-full bg-red-50 p-4 rounded-2xl text-red-500 font-bold mt-8 flex items-center justify-center gap-2 hover:bg-red-100 transition-colors active:scale-95">
                   <LogOut size={20} />
                   Déconnexion
                </button>
             </div>
          </div>
        );

      case 'Menu':
        return (
          <div className="p-6 pb-28">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-3xl font-bold text-gray-900">Menu</h2>
               <button onClick={handleOpenAddModal} className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors active:scale-90">
                 <Plus size={24} />
               </button>
             </div>

             <div className="grid gap-4">
               {dishes.map(dish => (
                 <div key={dish.id} className="bg-white p-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <ImageWithSkeleton src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1 overflow-hidden flex flex-col justify-center">
                       <h4 className="font-bold text-gray-900 line-clamp-1 text-lg">{dish.name}</h4>
                       <p className="text-sm font-bold text-orange-500 mb-1">${dish.price.toFixed(3)}</p>
                       <div className="flex flex-wrap gap-2 mt-1">
                        <button 
                          onClick={() => {
                            onUpdateDishes(dishes.map(i => i.id === dish.id ? {...i, isAvailable: !i.isAvailable} : i));
                          }}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg cursor-pointer transition-colors ${dish.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                          {dish.isAvailable ? 'En stock' : 'Épuisé'}
                        </button>
                        {dish.videoUrl && (
                          <div className="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-900 text-white">
                            <Video size={10} /> Reel
                          </div>
                        )}
                       </div>
                    </div>
                    <div className="flex flex-col justify-between items-end py-1">
                       <button onClick={() => handleEditDish(dish)} className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"><Edit2 size={16} /></button>
                       <button onClick={() => handleDeleteDish(dish.id)} className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )

      case 'Statistiques':
        return (
          <div className="p-6 pb-28">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Revenus</h2>
                <select 
                    value={statRange}
                    onChange={(e) => setStatRange(e.target.value)}
                    className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 font-medium"
                >
                  <option>Cette semaine</option>
                  <option>Semaine dernière</option>
                </select>
             </div>
             
             <div className="h-64 bg-white p-4 rounded-[2rem] shadow-sm mb-6 border border-gray-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                    <Bar dataKey="sales" radius={[6, 6, 6, 6]}>
                      {statsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#f97316' : '#e5e7eb'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:border-orange-200 transition-colors group">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Commandes</span>
                  <p className="text-3xl font-extrabold text-gray-800 mt-2 group-hover:scale-105 transition-transform">{statRange === 'Cette semaine' ? '1,240' : '980'}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:border-orange-200 transition-colors group">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Revenus</span>
                  <p className="text-3xl font-extrabold text-orange-500 mt-2 group-hover:scale-105 transition-transform">{statRange === 'Cette semaine' ? '$42k' : '$35k'}</p>
                </div>
             </div>
          </div>
        );
      case 'Commandes':
      default:
        return (
          <div className="p-6 pb-28">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-3xl font-bold text-gray-900">À préparer</h2>
               <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                 <Search size={20} className="text-gray-400" />
               </div>
            </div>
            
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-extrabold text-lg text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500 mt-1 font-medium">
                        {order.items.map(i => `${i.dish.name} × ${i.quantity}`).join(', ')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Clock size={12} /> 12m
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    
                    {/* Action Simulation */}
                    <button 
                      onClick={() => {
                        const next = order.status === OrderStatus.PENDING ? OrderStatus.PREPARING 
                                   : order.status === OrderStatus.PREPARING ? OrderStatus.READY 
                                   : OrderStatus.DELIVERED;
                        updateStatus(order.id, next);
                      }}
                      className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-500 transition-colors active:scale-95 shadow-md"
                    >
                      <span>Étape suivante</span>
                      <CheckCircle size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center text-gray-400 mt-10 flex flex-col items-center">
                  <ClipboardList size={48} className="opacity-20 mb-2"/>
                  <p>Aucune commande active</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 overflow-hidden relative font-sans">
      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-gray-900">{isEditing ? 'Modifier Plat' : 'Nouveau Plat'}</h3>
              <button onClick={() => setShowAddDishModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Nom du Produit</label>
                <input 
                  type="text" 
                  value={newDish.name}
                  onChange={e => setNewDish({...newDish, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder:text-gray-400 font-medium transition-all"
                  placeholder="ex: Burger Royal"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Prix ($)</label>
                  <input 
                    type="number" 
                    value={newDish.price}
                    onChange={e => setNewDish({...newDish, price: parseFloat(e.target.value)})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder:text-gray-400 font-medium transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Catégorie</label>
                  <select 
                    value={newDish.category}
                    onChange={e => setNewDish({...newDish, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-orange-500 outline-none appearance-none text-gray-900 font-medium transition-all"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Description</label>
                <textarea 
                  value={newDish.description}
                  onChange={e => setNewDish({...newDish, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder:text-gray-400 font-medium transition-all resize-none"
                  rows={3}
                  placeholder="Ingrédients délicieux..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">URL Image</label>
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={newDish.image}
                    onChange={e => setNewDish({...newDish, image: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-3.5 focus:ring-2 focus:ring-orange-500 outline-none text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                <label className="block text-xs font-bold text-orange-600 mb-1.5 flex items-center gap-1 uppercase tracking-wide">
                  <Video size={14} /> Lien Vidéo (TikTok/MP4)
                </label>
                <input 
                  type="text" 
                  value={newDish.videoUrl}
                  onChange={e => setNewDish({...newDish, videoUrl: e.target.value})}
                  className="w-full bg-white border border-orange-200 rounded-xl p-3.5 focus:ring-2 focus:ring-orange-500 outline-none text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-all"
                  placeholder="https://www.tiktok.com/@user/video/..."
                />
              </div>

              <button 
                onClick={handleSaveDish}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg mt-2 active:scale-95 transition-all hover:bg-gray-800"
              >
                {isEditing ? 'Mettre à jour' : 'Enregistrer le plat'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100 shrink-0 z-10 sticky top-0">
        <span className="font-extrabold text-2xl text-gray-900 tracking-tight">Snap<span className="text-orange-500">Biz</span></span>
        <div className="flex gap-3 items-center">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={24} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('Compte')}>
                <ImageWithSkeleton src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80" alt="Logo" className="w-full h-full object-cover" />
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {renderContent()}
      </div>

      {/* Fixed Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] py-2 px-6 z-50">
        <div className="flex justify-between items-center px-2">
          <NavButton 
            active={activeTab === 'Commandes'} 
            onClick={() => setActiveTab('Commandes')} 
            icon={<ClipboardList size={24} />} 
            label="Commandes" 
          />
          <NavButton 
            active={activeTab === 'Menu'} 
            onClick={() => setActiveTab('Menu')} 
            icon={<MenuIcon size={24} />} 
            label="Menu" 
          />
          <NavButton 
            active={activeTab === 'Statistiques'} 
            onClick={() => setActiveTab('Statistiques')} 
            icon={<ChartIcon size={24} />} 
            label="Stats" 
          />
          <NavButton 
            active={activeTab === 'Compte'} 
            onClick={() => setActiveTab('Compte')} 
            icon={<Settings size={24} />} 
            label="Compte" 
          />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 w-16 active:scale-95 ${
      active ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? '-translate-y-1' : ''}`}>
      {icon}
    </div>
    {active && <span className="text-[10px] font-bold animate-in fade-in slide-in-from-bottom-1">{label}</span>}
  </button>
);

export default RestaurateurScreen;