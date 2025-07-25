'use client';

import { useState } from 'react';

export const WaveChart = ({
  wave,
  color,
  height = 'h-16',
}: {
  wave: number[];
  color: string;
  height?: string;
}) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  return (
    <div
      className={`${height} bg-zinc-950 rounded-lg relative overflow-hidden border border-zinc-700`}
    >
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id={`grid-${color.replace('#', '')}`}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke={color}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#grid-${color.replace('#', '')})`}
          />
        </svg>
      </div>

      {wave.length > 1 && (
        <svg className="w-full h-full absolute inset-0">
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={wave
              .map(
                (value, index) =>
                  `${(index / Math.max(wave.length - 1, 1)) * 100}%,${
                    ((100 - value) / 100) * 100
                  }%`
              )
              .join(' ')}
          />
        </svg>
      )}

      {!isMonitoring && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-zinc-500 text-sm">Sinal parado</span>
        </div>
      )}
    </div>
  );
};

export default WaveChart;
