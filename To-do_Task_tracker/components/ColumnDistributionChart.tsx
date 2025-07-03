import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TCard, TColumn } from '@/types'; // Ensure TCard and TColumn are correctly imported

interface ColumnDistributionChartProps {
  cards: TCard[];
}

// Define colors for each column. These should ideally match your column heading colors or be complementary.
// Updated to more vibrant and eye-catching colors
const COLORS = {
  backlog: '#FF6347', // Tomato Red
  todo: '#FFD700',    // Gold Yellow
  doing: '#1E90FF',   // Dodger Blue
  done: '#32CD32',    // Lime Green
};

// Removed renderCustomizedLabel as labels will no longer be on the slices

export const ColumnDistributionChart: React.FC<ColumnDistributionChartProps> = ({ cards }) => {
  // Process cards data to get counts for each column
  const data = React.useMemo(() => {
    const columnCounts: { [key in TColumn]?: number } = {
      backlog: 0,
      todo: 0,
      doing: 0,
      done: 0,
    };

    cards.forEach(card => {
      if (columnCounts[card.column] !== undefined) {
        columnCounts[card.column]!++;
      }
    });

    // Convert counts to an array format suitable for Recharts
    // Only show columns that have cards in the chart
    return Object.entries(columnCounts)
      .map(([columnName, count]) => ({
        name: columnName as TColumn,
        value: count || 0,
      }))
      .filter(entry => entry.value > 0);
  }, [cards]); // Recalculate data whenever cards array changes

  // Calculate total cards for percentage calculation in the custom legend
  const totalCards = cards.length;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-neutral-100 mb-4">Task Distribution</h2>

      {/* Container for Pie Chart (above) and Custom Legend (below) */}
      {/* Re-added chart-glow-animation here for the container glow */}
      <div className="flex flex-col items-center justify-center w-full h-full chart-glow-animation">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            {/* Shining Border Pie - This creates the animated border */}
            <Pie
              data={[{ name: 'border', value: 1 }]} // Single data point for a full circle
              cx="50%"
              cy="50%"
              outerRadius={105} // Slightly larger than main pie
              innerRadius={100} // Same as main pie's outerRadius
              fill="transparent" // Make the fill transparent
              stroke="none" // No default stroke
              isAnimationActive={false} // No animation for this background pie
            >
              {/* Apply the NEW animation class to the Cell of the border pie */}
              <Cell className="animate-pie-circle-border" />
            </Pie>

            {/* Main Data Pie */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100} // Main pie radius
              fill="#8884d8" // Default fill, overridden by Cell colors
              dataKey="value"
              isAnimationActive={true} // Enable animation for data pie
              animationDuration={800} // Animation duration in milliseconds
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name] || '#ccc'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#333',
                borderColor: '#555',
                color: '#fff',
                borderRadius: '8px',
                padding: '10px'
              }}
              itemStyle={{ color: '#fff' }} // Ensure tooltip item text is white
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Legend/Summary Section - now positioned below the chart */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 p-2 rounded-lg bg-neutral-700/30 w-full">
          {Object.entries(COLORS).map(([columnName, color]) => {
            const entry = data.find(item => item.name === columnName as TColumn);
            const percentage = totalCards > 0 ? ((entry?.value || 0) / totalCards) * 100 : 0;

            // Only show legend items for columns that have cards (or have a defined color)
            if (entry || COLORS[columnName as TColumn]) {
              return (
                <div key={columnName} className="flex items-center gap-2 text-neutral-200 text-sm">
                  <span
                    className="w-4 h-4 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="font-medium whitespace-nowrap">{columnName.charAt(0).toUpperCase() + columnName.slice(1)}:</span>
                  <span className="font-bold whitespace-nowrap" style={{ color: color }}>{percentage.toFixed(0)}%</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
