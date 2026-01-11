
import React, { useState } from 'react';
import { UserRole } from '../../../shared/types';
import { ArrowLeft, Loader2, Store } from 'lucide-react';

interface OnboardingScreenProps {
  onRoleSelect: (role: UserRole) => void;
}

type AuthStep = 'login' | 'otp';

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onRoleSelect }) => {
  const [step, setStep] = useState<AuthStep>('login');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  // Simulation de l'envoi du code
  const handleContinue = () => {
    if (!inputValue) return;
    setIsLoading(true);
    // Simuler un délai réseau pour l'UX
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  // Simulation de la vérification du code -> CLIENT DIRECTEMENT
  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRoleSelect(UserRole.CLIENT);
    }, 1500);
  };

  // Simulation Social Login -> CLIENT DIRECTEMENT
  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        onRoleSelect(UserRole.CLIENT);
    }, 1500);
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input logic
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // --- ÉCRAN 1 : LOGIN (Style Uber Eats) ---
  if (step === 'login') {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-white p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-3xl font-medium mb-8 text-black">Snap<span className="text-orange-500 font-bold">Meal</span></h1>
          
          <h2 className="text-xl font-normal text-gray-900 mb-6 leading-tight">
            Indiquez votre numéro de téléphone ou votre adresse e-mail
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex: +223 70 00 00 00 ou email@exemple.com"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-black outline-none transition-all"
                autoFocus
              />
            </div>

            <button
              onClick={handleContinue}
              disabled={!inputValue || isLoading}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Continuer'}
            </button>
          </div>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-sm text-gray-500">ou</span>
          </div>

          <div className="space-y-3">
            <button 
                onClick={handleSocialLogin}
                className="w-full bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 relative"
            >
              <div className="absolute left-4 w-5 h-5 flex items-center justify-center">
                 {/* Google G icon simulation */}
                 <span className="font-extrabold text-blue-500 text-lg">G</span>
              </div>
              Continuer avec Google
            </button>

            <button 
                onClick={handleSocialLogin}
                className="w-full bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 relative"
            >
              <div className="absolute left-4">
                 {/* Apple icon simulation */}
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 19.096c-.636 1.9-1.9 4.36-3.46 4.36-1.5 0-2.35-1.02-3.85-1.02-1.5 0-2.19 1.02-3.79 1.02-2.3 0-4.6-4.1-4.6-7.5 0-4.3 2.7-6.55 5.3-6.55 1.5 0 2.6.98 3.4.98.8 0 2.45-1.15 4.15-1.15 1.6 0 2.95.8 3.8 2.1-3.35 1.7-2.8 6.15.05 7.76zM12.05 3.9c.75-1.15 1.35-2.6 1.15-4.1-1.35.1-3 1.05-3.8 2.25-.7.95-1.2 2.3-1 3.85 1.55.1 2.95-1.05 3.65-2z"/></svg>
              </div>
              Continuer avec Apple
            </button>
          </div>

          <p className="mt-8 text-xs text-gray-500 leading-relaxed text-justify">
            En continuant, vous acceptez de recevoir des appels, y compris par numérotation automatique, des communications sur WhatsApp ou des SMS de SnapMeal et de ses sociétés affiliées.
          </p>

          <div className="mt-12 text-center">
              <button 
                onClick={() => onRoleSelect(UserRole.RESTAURATEUR)}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors py-2 px-4 rounded-full hover:bg-gray-50"
              >
                  <Store size={14} />
                  Vous êtes un restaurant ? Cliquez ici
              </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ÉCRAN 2 : OTP (Vérification) ---
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-white p-6 animate-in slide-in-from-right duration-300">
    <button onClick={() => setStep('login')} className="mb-6 p-2 -ml-2 rounded-full hover:bg-gray-100 self-start">
        <ArrowLeft size={24} />
    </button>
    
    <div className="flex-1 max-w-sm mx-auto w-full">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Saisissez le code à 4 chiffres</h2>
        <p className="text-gray-500 text-sm mb-8">Envoyé au {inputValue}</p>

        <div className="flex justify-between gap-4 mb-8">
            {otp.map((digit, idx) => (
                <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-16 h-16 bg-gray-50 border-b-2 border-gray-300 text-center text-2xl font-bold text-gray-900 focus:border-black focus:bg-gray-100 outline-none transition-all rounded-t-lg"
                />
            ))}
        </div>

        <button
            onClick={handleVerifyOtp}
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors flex justify-center items-center shadow-lg shadow-orange-500/30"
        >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Confirmer'}
        </button>

        <div className="mt-6 flex justify-between text-sm">
            <button className="text-gray-400 font-bold bg-gray-100 px-3 py-1 rounded-lg">Renvoyer le code (30s)</button>
        </div>
    </div>
    </div>
  );
};

export default OnboardingScreen;
