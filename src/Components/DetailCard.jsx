import { useParams } from "react-router-dom";
import { useBoard } from "../Utilities/Store/Store";

function CardDetails() {
  const { id } = useParams(); // UUID from URL
  const card = useBoard((s) => s.cards[id]);

  if (!card) {
    return <p className="text-white">Card not found</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">{card.title}</h1>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: card.description }}
      />
    </div>
  );
}

export default CardDetails;
