export default function AnalyzeCard({ game, review }) {
  return (
    <div className="bg-black/50 p-4 rounded-md">
      <h2 className="text-white text-lg font-semibold">{game}</h2>
      <p className="text-white text-sm mt-2">{review}</p>
    </div>
  );
}
