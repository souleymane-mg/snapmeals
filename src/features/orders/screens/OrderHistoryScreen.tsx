import React, { useState } from 'react';
import { Clock, CheckCircle, Truck, Package, ChevronRight, XCircle } from 'lucide-react';
import { MOCK_ORDERS } from '../../../config/constants';
import { Order, OrderStatus } from '../../../types';

const OrderHistoryScreen: React.FC = () => {
  const [filter, setFilter] = useState<'Active' | 'Completed' | 'Cancelled'>('Active');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (filter === 'Active') return order.status === OrderStatus.PENDING || order.status === OrderStatus.PREPARING || order.status === OrderStatus.READY;
    if (filter === 'Completed') return order.status === OrderStatus.DELIVERED;
    if (filter === 'Cancelled') return false; // Mock data doesn't have cancelled, but logic is here
    return true;
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-y-auto pb-36">
       <div className="bg-white p-6 pb-4 shadow-sm z-10 sticky top-0">
         <h2 className="text-2xl font-extrabold text-gray-900">Mes Commandes</h2>
         <div className="flex gap-4 mt-4 text-sm font-bold text-gray-400 border-b border-gray-100">
            <button 
                onClick={() => setFilter('Active')}
                className={`pb-3 border-b-2 transition-colors ${filter === 'Active' ? 'border-orange-500 text-orange-500' : 'border-transparent hover:text-gray-600'}`}
            >
                En cours
            </button>
            <button 
                onClick={() => setFilter('Completed')}
                className={`pb-3 border-b-2 transition-colors ${filter === 'Completed' ? 'border-orange-500 text-orange-500' : 'border-transparent hover:text-gray-600'}`}
            >
                Terminées
            </button>
            <button 
                onClick={() => setFilter('Cancelled')}
                className={`pb-3 border-b-2 transition-colors ${filter === 'Cancelled' ? 'border-orange-500 text-orange-500' : 'border-transparent hover:text-gray-600'}`}
            >
                Annulées
            </button>
         </div>
       </div>

       <div className="flex-1 p-4 space-y-4">
          {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                  <Package size={48} className="mb-2 opacity-50" />
                  <p>Aucune commande trouvée</p>
              </div>
          ) : (
            filteredOrders.map((order) => (
             <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex gap-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                         <Package size={24} />
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-900">{order.items[0].dish.name} {order.items.length > 1 && `+ ${order.items.length - 1} autres`}</h3>
                         <p className="text-xs text-gray-500 mt-1">{order.date.split('T')[0]} • {order.items.length} articles</p>
                      </div>
                   </div>
                   <span className="font-bold text-gray-900">${order.total.toFixed(3)}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                   <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-orange-500 rounded-full ${
                          order.status === OrderStatus.DELIVERED ? 'w-full' : 
                          order.status === OrderStatus.READY ? 'w-3/4' : 
                          order.status === OrderStatus.PREPARING ? 'w-1/2' : 'w-1/4'
                        }`} 
                      />
                   </div>
                   <span className="text-xs font-bold text-orange-500">{order.status}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                   <button 
                    onClick={() => alert(`Showing details for ${order.id}`)}
                    className="text-sm font-bold text-gray-400 hover:text-gray-600"
                   >
                    Détails
                   </button>
                   {order.status === OrderStatus.DELIVERED ? (
                      <button 
                        onClick={() => alert("Items added to cart!")}
                        className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800"
                      >
                        Commander à nouveau
                      </button>
                   ) : (
                      <button 
                        onClick={() => alert("Tracking map opening...")}
                        className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600"
                      >
                        Suivre
                      </button>
                   )}
                </div>
             </div>
          )))}
       </div>
    </div>
  );
};

export default OrderHistoryScreen;