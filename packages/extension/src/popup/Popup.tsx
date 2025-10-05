import React, { useState, useEffect } from 'react';
import { SyncStatus, UserPreferences } from '../types';

interface PopupProps {}

const Popup: React.FC<PopupProps> = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: '',
    pending: 0,
    status: 'offline',
    error: undefined
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    frequency: 'medium',
    categories: ['tone', 'focus'],
    aiPlatforms: ['chatgpt', 'claude'],
    skipThreshold: 10
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from chrome storage
    const loadData = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading popup data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSync = async () => {
    setSyncStatus(prev => ({ ...prev, status: 'pending' }));
    // TODO: Implement sync functionality
    setTimeout(() => {
      setSyncStatus(prev => ({ 
        ...prev, 
        status: 'synced',
        lastSync: new Date().toISOString()
      }));
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='selfos-card'>
          <div className='animate-pulse-soft text-selfos-primary'>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-full bg-gray-50 p-4'>
      <div className='space-y-4'>
        {/* Header */}
        <div className='selfos-card'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-selfos-primary rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>S</span>
            </div>
            <div>
              <h1 className='font-semibold text-gray-900'>SelfOS</h1>
              <p className='text-sm text-gray-600'>AI Micro-Training</p>
            </div>
          </div>
        </div>

        {/* Sync Status */}
        <div className='selfos-card'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='font-medium text-gray-900'>Sync Status</h2>
            <div className={`w-2 h-2 rounded-full ${
              syncStatus.status === 'synced' ? 'bg-green-500' :
              syncStatus.status === 'pending' ? 'bg-yellow-500' :
              syncStatus.status === 'error' ? 'bg-red-500' :
              'bg-gray-400'
            }`} />
          </div>
          
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Status:</span>
              <span className='capitalize font-medium'>{syncStatus.status}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Pending:</span>
              <span className='font-medium'>{syncStatus.pending} responses</span>
            </div>
            {syncStatus.lastSync && (
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Last sync:</span>
                <span className='font-medium'>
                  {new Date(syncStatus.lastSync).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>

          <button 
            onClick={handleSync}
            disabled={syncStatus.status === 'pending'}
            className='w-full mt-3 selfos-button-primary disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {syncStatus.status === 'pending' ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>

        {/* Quick Stats */}
        <div className='selfos-card'>
          <h2 className='font-medium text-gray-900 mb-3'>Today&apos;s Progress</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-selfos-primary'>12</div>
              <div className='text-sm text-gray-600'>Responses</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-selfos-primary'>3</div>
              <div className='text-sm text-gray-600'>Platforms</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='selfos-card'>
          <h2 className='font-medium text-gray-900 mb-3'>Quick Actions</h2>
          <div className='space-y-2'>
            <button className='w-full selfos-button-secondary text-left'>
              View Dashboard
            </button>
            <button className='w-full selfos-button-secondary text-left'>
              Preferences
            </button>
            <button className='w-full selfos-button-secondary text-left'>
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;