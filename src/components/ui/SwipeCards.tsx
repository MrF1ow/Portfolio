import { useState } from "react";
import { motion } from "framer-motion";
import { CodeMock } from "@/components/ui/CodeMock";
import { projects } from "@/utils/data/projects";
import type { Project } from "@/types/project";

type Card = Project;

const SwipeCards = () => {
  const sortedProjects = [
    ...projects.filter((p) => p.id !== 1),
    ...projects.filter((p) => p.id === 1),
  ];

  const [cards, setCards] = useState<Card[]>(sortedProjects);

  return (
    <div className="relative h-[500px] w-full flex justify-center items-start">
      {cards.map((card, index) => (
        <CardComponent
          key={card.id}
          card={card}
          cards={cards}
          setCards={setCards}
          index={index}
        />
      ))}
    </div>
  );
};

const CardComponent = ({
  card,
  cards,
  setCards,
}: {
  card: Card;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  index: number;
}) => {
  const [clicked, setClicked] = useState(false);

  const stackIndex = cards.findIndex((c) => c.id === card.id);
  const frontIndex = cards.length - 1;
  const isFront = stackIndex === frontIndex;

  const topOffset = stackIndex * 40; // adjust this for how much of each card shows
  const scaleOffset = isFront ? 1 : 0.95 + stackIndex * 0.01;
  const zIndex = stackIndex;

  const handleClick = () => {
    if (clicked || isFront) return;
    setClicked(true);

    setCards((prev) => {
      const newOrder = prev.filter((c) => c.id !== card.id);
      newOrder.push(card);
      return newOrder;
    });

    setTimeout(() => setClicked(false), 300);
  };

  return (
    <motion.div
      className="absolute cursor-pointer origin-top-left"
      style={{
        top: topOffset,
        scale: scaleOffset,
        zIndex,
      }}
      animate={{
        x: clicked ? 200 : 0,
        rotate: clicked ? (Math.random() > 0.5 ? 10 : -10) : 0,
        scale: scaleOffset,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-lg">
        <CodeMock project={card} />
      </div>
    </motion.div>
  );
};

export default SwipeCards;
