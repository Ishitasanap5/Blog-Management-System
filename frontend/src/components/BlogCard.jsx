export default function Card({ title, content, author, tags }) {
  return (
    <div className="bg-white p-6 rounded shadow-md border border-[#F1EFE8] mb-4">
      <h2 className="text-[#26215C] font-semibold text-xl mb-2">{title}</h2>
      <p className="text-[#2C2C2A] mb-2">{content.substring(0, 150)}...</p>
      <div className="flex justify-between items-center text-sm text-[#888780]">
        <span>By: {author?.name || "Unknown"}</span>
        <span className="flex gap-2">
          {tags?.map(tag => (
            <span key={tag} className="bg-[#1D9E75] text-white px-2 py-0.5 rounded text-xs">{tag}</span>
          ))}
        </span>
      </div>
    </div>
  );
}