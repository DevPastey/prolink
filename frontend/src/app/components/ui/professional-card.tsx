import React from 'react';

const ProfessionalCard = () => {
  return (
    <div className="rounded-xl2 border border-borderSoft bg-surface/80 p-5 shadow-card backdrop-blur-xl hover:bg-surfaceHover transition">
        <img className="h-20 w-20 rounded-2xl object-cover" />
        <h3 className="mt-4 font-display text-lg font-semibold text-textPrimary">
            James Anderson
        </h3>
        <p className="text-sm text-textSecondary">UX/UI Designer</p>
    </div>
  );
}

export default ProfessionalCard;
