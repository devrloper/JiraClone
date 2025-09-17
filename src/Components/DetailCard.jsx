import { useNavigate, useParams } from "react-router-dom";
import { useBoard } from "../Utilities/Store/Store";
import Sidebar from "../Components/Sidebar";

function CardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const card = useBoard((s) => s.cards[`card-${id}`]);

  if (!card) {
    return (
      <div className="Flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="bg-red-500/20 text-red-400 p-6 rounded-lg shadow-lg">
          Card not found
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white flex justify-center items-center">
      <div className="w-64 border-r border-zinc-700 bg-zinc-900/70">
        <Sidebar />
      </div>
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="max-w-3xl w-full space-y-6">
          {/* <div className=" border border-amber-50 p-4 rounded-xl text-center bg-zinc-800/60 w-full max-w-md mx-auto  ">
          <h1 className="text-xl font-semibold text-white">
            Your card details are here
          </h1>
        </div> */}
          <div className="max-w-3xl w-full bg-zinc-900/70 border border-zinc-700 rounded-2xl shadow-xl p-8 backdrop-blur-md">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              ← Back
            </button>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
              {card.title}
            </h1>

            {/* Description */}
            <div
              className="prose prose-invert max-w-none text-gray-300 bg-zinc-800/60 p-5 rounded-xl border border-zinc-700 shadow-inner"
              dangerouslySetInnerHTML={{ __html: card.description }}
            />
            {/* Comments Section */}
            <div className="bg-zinc-900/70 p-5 rounded-xl border border-zinc-700 shadow-inner mt-5">
              <h2 className="text-lg font-semibold text-white mb-3">
                Comments
              </h2>

              {card.comments && card.comments.length > 0 ? (
                <div className="space-y-3">
                  {card.comments.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 bg-zinc-800 rounded-lg text-sm text-white flex items-center gap-2"
                    >
                      <span>💬</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No comments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetailPage;
