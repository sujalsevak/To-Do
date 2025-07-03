// In your types/index.ts file

// Define the union type for your columns
export type TColumn = "backlog" | "todo" | "doing" | "done";

// Update TCard to use TColumn for its 'column' property
export type TCard = {
  id: string;
  title: string;
  column: TColumn; // Use the TColumn type here
  // Add any other properties your card objects have
};

// Define the props for your Column component
export type TColumnProps = {
  title: string;
  headingColor: string;
  cards: TCard[];
  column: TColumn; // Use the TColumn type here
  setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
};

// Define the props for your BurnBarrel component (if not already defined)
export type TBurnBarrelProps = {
  setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
};

// Define the props for your Card component (if not already defined)
export type TCardComponentProps = {
  card: TCard;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, card: TCard) => void;
  setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
};

// Define the props for your AddCard component (if not already defined)
export type TAddCardProps = {
  column: TColumn;
  setCards: React.Dispatch<React.SetStateAction<TCard[]>>;
};

// Define the props for your DropIndicator component (if not already defined)
export type TDropIndicatorProps = {
  beforeId: string;
  column: TColumn;
};