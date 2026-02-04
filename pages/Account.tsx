import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useApp } from '../context/AppContext';
import { logOut } from '../firebase';

export const Account: React.FC = () => {
  const { user, orders } = useApp();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      );
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await logOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">My Account</h1>

        {/* Profile Section */}
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-stone-800">
          <div className="flex items-center gap-6">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center border-2 border-orange-500">
                <span className="text-3xl text-orange-500">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {user.displayName || 'Coffee Lover'}
              </h2>
              <p className="text-stone-400">{user.email}</p>
              {user.isGoogleUser && (
                <span className="inline-block mt-2 px-3 py-1 bg-stone-800 rounded-full text-xs text-stone-300">
                  Google Account
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-stone-800">
          <h3 className="text-xl font-semibold text-white mb-4">Order History</h3>
          {orders.length === 0 ? (
            <p className="text-stone-400">No orders yet. Start exploring our menu!</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-stone-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-stone-300 text-sm">Order #{order.id.slice(-6)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'ready' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'preparing' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-stone-700 text-stone-300'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-white font-medium">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-xl transition-colors duration-300 font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
