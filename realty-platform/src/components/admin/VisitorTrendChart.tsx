"use client";

import { useState } from "react";
import { visitorTrend } from "@/lib/properties/mock-data";

const WIDTH = 640;
const HEIGHT = 220;
const PADDING_LEFT = 44;
const PADDING_RIGHT = 12;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 28;

const LINE_COLOR = "var(--color-primary-600)";

export function VisitorTrendChart() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const values = visitorTrend.map((point) => point.visitors);
  const maxValue = Math.ceil(Math.max(...values) / 500) * 500;
  const minValue = 0;

  const plotWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  function xFor(index: number) {
    return PADDING_LEFT + (index / (visitorTrend.length - 1)) * plotWidth;
  }
  function yFor(value: number) {
    return PADDING_TOP + plotHeight - ((value - minValue) / (maxValue - minValue)) * plotHeight;
  }

  const linePath = visitorTrend
    .map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(index)} ${yFor(point.visitors)}`)
    .join(" ");
  const areaPath = `${linePath} L ${xFor(visitorTrend.length - 1)} ${PADDING_TOP + plotHeight} L ${xFor(0)} ${PADDING_TOP + plotHeight} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => Math.round((maxValue * fraction) / 100) * 100);
  const hovered = hoverIndex !== null ? visitorTrend[hoverIndex] : null;

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const ratio = (x - PADDING_LEFT) / plotWidth;
    const index = Math.round(ratio * (visitorTrend.length - 1));
    setHoverIndex(Math.min(Math.max(index, 0), visitorTrend.length - 1));
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-bold text-[var(--text-primary)]">방문자 추이 (최근 14일)</h2>
        {hovered && (
          <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
            {hovered.date} · <span className="font-semibold text-[var(--text-primary)]">{hovered.visitors.toLocaleString()}명</span>
          </p>
        )}
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-2 w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
        role="img"
        aria-label="최근 14일 방문자 추이 선 그래프"
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PADDING_LEFT}
              x2={WIDTH - PADDING_RIGHT}
              y1={yFor(tick)}
              y2={yFor(tick)}
              stroke="var(--border-default)"
              strokeWidth={1}
            />
            <text x={PADDING_LEFT - 8} y={yFor(tick) + 4} textAnchor="end" fontSize={10} fill="var(--text-secondary)">
              {tick.toLocaleString()}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={LINE_COLOR} opacity={0.1} stroke="none" />
        <path d={linePath} fill="none" stroke={LINE_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {visitorTrend.map((point, index) => {
          if (index !== 0 && index !== visitorTrend.length - 1 && index !== hoverIndex) return null;
          return (
            <circle
              key={point.date}
              cx={xFor(index)}
              cy={yFor(point.visitors)}
              r={4}
              fill={LINE_COLOR}
              stroke="var(--bg-page)"
              strokeWidth={2}
            />
          );
        })}

        {hoverIndex !== null && (
          <line
            x1={xFor(hoverIndex)}
            x2={xFor(hoverIndex)}
            y1={PADDING_TOP}
            y2={PADDING_TOP + plotHeight}
            stroke="var(--text-secondary)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
        )}

        <text x={xFor(0)} y={HEIGHT - 6} fontSize={10} fill="var(--text-secondary)">
          {visitorTrend[0].date}
        </text>
        <text x={xFor(visitorTrend.length - 1)} y={HEIGHT - 6} textAnchor="end" fontSize={10} fill="var(--text-secondary)">
          {visitorTrend[visitorTrend.length - 1].date}
        </text>
      </svg>
    </div>
  );
}
