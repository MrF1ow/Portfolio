import { useState } from "react";
import { motion } from "framer-motion";

export type StackDirection = "top" | "left" | "right" | "bottom";

export interface StackCardsProps<T> {
  items: T[];
  direction?: StackDirection;
  offset?: number;
  extractId: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
}

export function StackCards<T>({
  items,
  direction = "top",
  offset = 40,
  extractId,
  renderItem,
}: StackCardsProps<T>) {
  const [cards, setCards] = useState<T[]>(items);

  return (
    <div className="relative h-[250px] w-full flex justify-center items-center">
      {cards.map((item, index) => (
        <StackCard<T>
          key={extractId(item)}
          item={item}
          index={index}
          cards={cards}
          setCards={setCards}
          direction={direction}
          offset={offset}
          extractId={extractId}
          renderItem={renderItem}
        />
      ))}
    </div>
  );
}

function StackCard<T>({
  item,
  cards,
  setCards,
  direction,
  offset,
  extractId,
  renderItem,
}: {
  item: T;
  cards: T[];
  setCards: React.Dispatch<React.SetStateAction<T[]>>;
  index: number;
  direction: StackDirection;
  offset: number;
  extractId: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
}) {
  const [clicked, setClicked] = useState(false);

  const id = extractId(item);
  const stackIndex = cards.findIndex((c) => extractId(c) === id);
  const frontIndex = cards.length - 1;
  const isFront = stackIndex === frontIndex;

  const position =
    direction === "right"
      ? { right: stackIndex * offset }
      : { top: stackIndex * offset };

  const scale = isFront ? 1 : 0.95 + stackIndex * 0.01;

  const handleClick = () => {
    if (clicked || isFront) return;
    setClicked(true);

    setCards((prev) => {
      const newOrder = prev.filter((c) => extractId(c) !== id);
      newOrder.push(item);
      return newOrder;
    });

    setTimeout(() => setClicked(false), 300);
  };

  return (
    <motion.div
      className="absolute cursor-pointer origin-top-left"
      style={{ ...position, scale: scale, zIndex: stackIndex }}
      animate={{
        x: clicked ? 200 : 0,
        rotate: clicked ? (Math.random() > 0.5 ? 10 : -10) : 0,
        scale,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-lg">{renderItem(item)}</div>
    </motion.div>
  );
}
