import React from 'react';

interface Props {
  score: number;
}

export const EfficiencyBadge: React.FC<Props> = ({ score }) => {
  let colorClass = "bg-green-100 text-green-800 border-green-200";
  if (score >= 90) colorClass = "bg-purple-100 text-purple-800 border-purple-200";
  else if (score >= 80) colorClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
  else if (score >= 60) colorClass = "bg-amber-100 text-amber-800 border-amber-200";
  else colorClass = "bg-stone-100 text-stone-600 border-stone-200";

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${colorClass} shadow-sm backdrop-blur-md`}>
      <span className="text-[10px] font-bold uppercase tracking-wider">Efficiency Score</span>
      <span className="text-sm font-black">{score}</span>
    </div>
  );
};