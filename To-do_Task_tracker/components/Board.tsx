import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TCard } from "@/types"; // Make sure this path is correct for your project!

// Removed import for BurnBarrel
// import { BurnBarrel } from "./BurnBarrel";

import { Column } from "./Column";
import { ColumnDistributionChart } from "./ColumnDistributionChart"; // Import the chart component

export const Board = () => {
  const initialCards: TCard[] = [
    { id: "1", title: "Review project proposal", column: "backlog" },
    { id: "2", title: "Setup development environment", column: "todo" },
    { id: "3", title: "Implement user authentication", column: "doing" },
    { id: "4", title: "Write unit tests for API", column: "todo" },
    { id: "5", title: "Deploy to staging server", column: "done" },
    { id: "6", title: "Design database schema", column: "backlog" },
    { id: "7", title: "Conduct user feedback session", column: "doing" },
    { id: "8", title: "Fix critical bug in payment gateway", column: "todo" },
    { id: "9", title: "Optimize image loading performance", column: "backlog" },
    { id: "10", title: "Update documentation", column: "done" }, // Changed id to string to match TCard type
  ];

  const [cards, setCards] = useState<TCard[]>(initialCards);

  return (
    <div className="
      h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black
      flex flex-col p-4 lg:flex-row lg:gap-3 lg:overflow-auto lg:p-12
      animate-gradient-xy
    ">
      {/* Kanban Columns */}
      <div className="flex flex-1 flex-col lg:flex-row lg:gap-3 lg:overflow-auto">
        <Column
          title="Backlog"
          headingColor="text-neutral-500"
          cards={cards}
          column="backlog"
          setCards={setCards}
        />
        <Column
          title="TODO"
          headingColor="text-yellow-200"
          cards={cards}
          column="todo"
          setCards={setCards}
        />
        <Column
          title="Doing"
          headingColor="text-blue-200"
          cards={cards}
          column="doing"
          setCards={setCards}
        />
        <Column
          title="Done"
          headingColor="text-emerald-200"
          cards={cards}
          column="done"
          setCards={setCards}
        />
      </div>

      {/* Removed Burn Barrel component */}
      {/* <BurnBarrel setCards={setCards} /> */}

      {/* Column Distribution Chart */}
      <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-1/4 flex flex-col items-center justify-center bg-neutral-800/60 rounded-lg p-4 shadow-xl border border-neutral-700 min-h-[350px]">
        <ColumnDistributionChart cards={cards} />
      </div>
    </div>
  );
};
