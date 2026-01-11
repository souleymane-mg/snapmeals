import React, { useState } from 'react';
import { UserRole, Dish } from './types';
import ClientScreen from './features/client/screens/ClientScreen';
import RestaurateurScreen from './features/restaurateur/screens/RestaurateurScreen';
import OnboardingScreen from './features/auth/screens/OnboardingScreen';
import { DISHES } from './config/constants';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  // Lifted state so changes in Restaurateur view reflect in Client view (Reels)
  const [sharedDishes, setSharedDishes] = useState<Dish[]>(DISHES);

  if (!role) {
    return <OnboardingScreen onRoleSelect={setRole} />;
  }

  // Mobile wrapper simulation - Strictly 100dvh
  return (
    <div className="flex justify-center bg-gray-900 h-[100dvh] w-full font-sans overflow-hidden">
      <div className="w-full max-w-[480px] bg-white h-full shadow-2xl relative overflow-hidden flex flex-col sm:border-x sm:border-gray-800">
        {role === UserRole.CLIENT ? (
          <ClientScreen onLogout={() => setRole(null)} dishes={sharedDishes} />
        ) : (
          <RestaurateurScreen onLogout={() => setRole(null)} dishes={sharedDishes} onUpdateDishes={setSharedDishes} />
        )}
      </div>
    </div>
  );
};

export default App;