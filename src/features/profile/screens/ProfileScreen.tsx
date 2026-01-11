
import React, { useState } from 'react';
import { User, Settings, CreditCard, Heart, MapPin, LogOut, ChevronRight, HelpCircle, ArrowLeft, Star, ShoppingBag, Wallet, Ticket, Gift, Shield, Bell, Globe, Share2, Award } from 'lucide-react';
import { Dish } from '../../../types';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface ProfileScreenProps {
  onLogout: () => void;
  favorites?: string[];
  dishes?: Dish[];
  onToggleFavorite?: (id: string) => void;
  onDishClick?: (dish: Dish) => void;
}

type ProfileSection = 'Menu' | 'Infos Perso' | 'Adresses' | 'Favoris' | 'Moyens de paiement' | 'Préférences' | 'Aide' | 'Wallet' | 'Coupons';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, favorites = [], dishes = [], onToggleFavorite, onDishClick }) => {
  const [activeSection, setActiveSection] = useState<ProfileSection>('Menu');

  const handleMenuClick = (section: ProfileSection) => {
    setActiveSection(section);
  };

  const renderSectionContent = () => {
      switch(activeSection) {
          case 'Favoris':
              const favoriteDishes = dishes.filter(d => favorites.includes(d.id));
              return (
                  <div className="space-y-4">
                      {favoriteDishes.length === 0 ? (
                          <div className="text-center text-gray-400 mt-20">
                              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart size={40} className="opacity-20" />
                              </div>
                              <p className="font-bold text-gray-900">Pas encore de favoris</p>
                              <p className="text-sm mt-2">Ajoutez des plats pour les retrouver ici.</p>
                          </div>
                      ) : (
                          favoriteDishes.map(dish => (
                            <div key={dish.id} onClick={() => onDishClick?.(dish)} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                    <ImageWithSkeleton src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 line-clamp-1">{dish.name}</h4>
                                    <p className="text-xs text-gray-500">${dish.price.toFixed(3)}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star size={10} className="fill-orange-400 text-orange-400"/>
                                        <span className="text-[10px] font-bold text-gray-600">{dish.rating}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(dish.id); }}
                                    className="p-2.5 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                                >
                                    <Heart size={18} fill="currentColor" />
                                </button>
                            </div>
                          ))
                      )}
                  </div>
              )
          case 'Infos Perso':
              return (
                  <div className="space-y-6">
                      <div className="text-center mb-8">
                          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg relative group cursor-pointer">
                             <ImageWithSkeleton src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&q=80" alt="Avatar" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <span className="text-white text-xs font-bold">Modifier</span>
                             </div>
                          </div>
                          <button className="text-orange-500 text-sm font-bold">Changer la photo</button>
                      </div>

                      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-5">
                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Nom Complet</label>
                              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                                  <User size={20} className="text-gray-400" />
                                  <input type="text" defaultValue="Amadou Diallo" className="bg-transparent w-full outline-none text-gray-900 font-medium" />
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Email</label>
                              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                                  <div className="text-gray-400 text-lg">@</div>
                                  <input type="email" defaultValue="amadou.diallo@example.com" className="bg-transparent w-full outline-none text-gray-900 font-medium" />
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Téléphone</label>
                              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                                  <span className="text-gray-400 font-bold text-sm">🇲🇱 +223</span>
                                  <input type="tel" defaultValue="70 12 34 56" className="bg-transparent w-full outline-none text-gray-900 font-medium" />
                              </div>
                          </div>
                      </div>
                      
                      <button className="w-full bg-black text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform">
                          Sauvegarder les modifications
                      </button>
                  </div>
              )
          case 'Adresses':
              return (
                  <div className="space-y-4">
                      <div className="bg-white p-5 rounded-[2rem] shadow-sm border-2 border-orange-500 relative">
                          <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2 text-orange-600">
                                  <MapPin size={20} fill="currentColor" className="opacity-20" />
                                  <span className="font-bold">Maison</span>
                              </div>
                              <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wide">Par défaut</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed pl-7">ACI 2000, Rue 402, Porte 15<br/>Bamako, Mali</p>
                          <div className="mt-4 pl-7 flex gap-4">
                              <button className="text-xs font-bold text-gray-400 hover:text-black">Modifier</button>
                              <button className="text-xs font-bold text-gray-400 hover:text-red-500">Supprimer</button>
                          </div>
                      </div>

                      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2 text-gray-700">
                                  <MapPin size={20} />
                                  <span className="font-bold">Bureau</span>
                              </div>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed pl-7 group-hover:text-gray-700">Immeuble Sahel, Badalabougou<br/>Bamako, Mali</p>
                      </div>

                      <button className="w-full py-4 rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all">
                          <PlusIcon size={20} /> Ajouter une nouvelle adresse
                      </button>
                  </div>
              )
          case 'Wallet':
              return (
                  <div className="space-y-6">
                      {/* Balance Card */}
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                          <div className="relative z-10">
                              <p className="text-white/60 font-medium text-sm mb-1">Solde actuel</p>
                              <h2 className="text-4xl font-extrabold mb-6">15.000 FCFA</h2>
                              <div className="flex gap-3">
                                  <button className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                                      Recharger
                                  </button>
                                  <button className="bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
                                      Historique
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-4">Moyens de paiement enregistrés</h3>
                          <div className="space-y-3">
                              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
                                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                      <Wallet size={20} />
                                  </div>
                                  <div className="flex-1">
                                      <p className="font-bold text-gray-900 text-sm">Orange Money</p>
                                      <p className="text-xs text-gray-500">70 ** ** 56</p>
                                  </div>
                                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                              </div>
                              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
                                      <CreditCard size={20} />
                                  </div>
                                  <div className="flex-1">
                                      <p className="font-bold text-gray-900 text-sm">Visa **** 4242</p>
                                      <p className="text-xs text-gray-500">Expire 12/25</p>
                                  </div>
                              </div>
                          </div>
                          <button className="mt-4 text-sm font-bold text-black hover:underline">+ Ajouter une carte</button>
                      </div>
                  </div>
              )
          default:
              return <div className="text-center text-gray-400 mt-20">Section en construction 🚧</div>
      }
  }

  // --- MAIN MENU RENDER ---
  if (activeSection !== 'Menu') {
      return (
        <div className="h-full bg-gray-50 flex flex-col">
            <div className="bg-white p-6 pb-4 flex items-center gap-4 shadow-sm z-10 shrink-0 sticky top-0">
                <button onClick={() => setActiveSection('Menu')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-extrabold text-gray-900">{activeSection}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pb-36">
                {renderSectionContent()}
            </div>
        </div>
      )
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-y-auto pb-36 no-scrollbar">
       {/* Header Section */}
       <div className="bg-white pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-sm mb-6 relative z-10">
          <div className="flex justify-between items-start mb-6">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                    <ImageWithSkeleton src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&q=80" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 leading-none">Amadou</h2>
                    <p className="text-gray-400 text-sm font-medium mt-1">amadou@snapmeal.ml</p>
                </div>
             </div>
             <button onClick={() => handleMenuClick("Infos Perso")} className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-black hover:text-white transition-colors">
                 <Settings size={20} />
             </button>
          </div>

          {/* SnapClub Card */}
          <div className="bg-gradient-to-r from-gray-900 to-black text-white p-5 rounded-3xl shadow-xl shadow-gray-200 relative overflow-hidden mb-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
              <div className="flex justify-between items-center mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                      <Award size={20} className="text-orange-400" />
                      <span className="font-bold text-sm tracking-wide">SnapClub Gold</span>
                  </div>
                  <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg">450 pts</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="w-3/4 h-full bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-[10px] text-white/60">Plus que 50 points pour le statut Platinum</p>
          </div>
       </div>

       {/* Quick Actions Grid */}
       <div className="px-6 mb-8">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pl-2">Raccourcis</h3>
           <div className="grid grid-cols-4 gap-3">
               <QuickAction icon={<ShoppingBag size={20} />} label="Commandes" color="blue" onClick={() => alert("Voir Historique")} />
               <QuickAction icon={<Heart size={20} />} label="Favoris" color="red" onClick={() => handleMenuClick("Favoris")} />
               <QuickAction icon={<Wallet size={20} />} label="Wallet" color="orange" onClick={() => handleMenuClick("Wallet")} />
               <QuickAction icon={<HelpCircle size={20} />} label="Aide" color="green" onClick={() => handleMenuClick("Aide")} />
           </div>
       </div>

       {/* Menu Lists */}
       <div className="px-6 space-y-6">
          {/* Section: Avantages */}
          <div className="bg-white rounded-[2rem] p-2 shadow-sm border border-gray-100">
              <MenuItem icon={<Ticket size={20} />} label="Mes Coupons" subLabel="2 disponibles" onClick={() => handleMenuClick("Coupons")} />
              <div className="h-px bg-gray-50 mx-4"></div>
              <MenuItem icon={<Gift size={20} />} label="Cartes Cadeaux" onClick={() => alert("Gift cards")} />
              <div className="h-px bg-gray-50 mx-4"></div>
              <MenuItem icon={<Share2 size={20} />} label="Parrainer un ami" subLabel="Gagnez 5000 FCFA" onClick={() => alert("Share")} highlight />
          </div>

          {/* Section: Paramètres */}
          <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">Paramètres du compte</h3>
              <div className="bg-white rounded-[2rem] p-2 shadow-sm border border-gray-100">
                  <MenuItem icon={<MapPin size={20} />} label="Carnet d'adresses" onClick={() => handleMenuClick("Adresses")} />
                  <div className="h-px bg-gray-50 mx-4"></div>
                  <MenuItem icon={<CreditCard size={20} />} label="Moyens de paiement" onClick={() => handleMenuClick("Moyens de paiement")} />
                  <div className="h-px bg-gray-50 mx-4"></div>
                  <MenuItem icon={<Bell size={20} />} label="Notifications" onClick={() => handleMenuClick("Préférences")} />
                  <div className="h-px bg-gray-50 mx-4"></div>
                  <MenuItem icon={<Globe size={20} />} label="Langue" subLabel="Français" onClick={() => alert("Langue")} />
                  <div className="h-px bg-gray-50 mx-4"></div>
                  <MenuItem icon={<Shield size={20} />} label="Confidentialité" onClick={() => alert("Privacy")} />
              </div>
          </div>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className="w-full bg-red-50 p-4 rounded-2xl flex items-center justify-center gap-3 text-red-500 font-bold hover:bg-red-100 transition-colors active:scale-95 mb-8"
          >
             <LogOut size={20} />
             Déconnexion
          </button>
       </div>
    </div>
  );
};

// Helper Components

const QuickAction = ({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: 'orange' | 'blue' | 'red' | 'green', onClick: () => void }) => {
    const colorStyles = {
        orange: 'bg-orange-50 text-orange-600',
        blue: 'bg-blue-50 text-blue-600',
        red: 'bg-red-50 text-red-600',
        green: 'bg-green-50 text-green-600',
    };

    return (
        <button onClick={onClick} className="flex flex-col items-center gap-2 group">
            <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 ${colorStyles[color]}`}>
                {icon}
            </div>
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900">{label}</span>
        </button>
    );
};

const MenuItem = ({ icon, label, subLabel, onClick, highlight }: { icon: React.ReactNode, label: string, subLabel?: string, onClick: () => void, highlight?: boolean }) => (
  <button 
    onClick={onClick}
    className="w-full p-3 rounded-2xl flex items-center gap-4 hover:bg-gray-50 transition-colors group"
  >
     <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${highlight ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm'}`}>
        {icon}
     </div>
     <div className="flex-1 text-left">
         <span className="block font-bold text-gray-900 text-sm">{label}</span>
         {subLabel && <span className={`text-xs ${highlight ? 'text-orange-500 font-bold' : 'text-gray-400'}`}>{subLabel}</span>}
     </div>
     <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
  </button>
);

const PlusIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
)

export default ProfileScreen;
