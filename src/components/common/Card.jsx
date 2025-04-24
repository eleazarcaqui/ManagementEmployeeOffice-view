import React from 'react'

export const Card = ({ title, value, children, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white flex flex-col justify-between min-h-[120px]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {Icon && (
          <div className={cn(
            'p-2 rounded-full',
            colorClasses[color] || colorClasses.blue
          )}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {value !== undefined && (
        <div className="mt-3 text-3xl font-bold text-gray-900">{value}</div>
      )}

      {children && <div className="mt-2 text-sm text-gray-600">{children}</div>}
    </div>
  );
};