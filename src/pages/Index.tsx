import { useState } from "react";

const unicorns = [
  {
    id: 1,
    name: "Aurora Unicorn",
    type: "Celestial",
    rarity: "Legendary",
    element: "Light",
    emoji: "✨",
    rarityColor: "from-yellow-400 to-amber-300",
    glowColor: "rgba(251,191,36,0.4)",
    gradient: "from-violet-600 via-purple-500 to-pink-500",
    cardGlow: "hover:shadow-[0_0_40px_rgba(167,139,250,0.5)]",
    image: "https://cdn.poehali.dev/projects/b707820d-b663-4e18-b16b-3d3997d046cb/files/0395f6ea-7e1d-4513-881d-d61169a635e4.jpg",
    description: "Born from the first light of dawn, the Aurora Unicorn weaves ribbons of color across the sky. Their mane shifts through every hue of the rainbow.",
    powers: ["Color Weaving", "Dream Walking", "Healing Aura"],
    habitat: "Mountain Peaks",
    mood: "Joyful",
  },
  {
    id: 2,
    name: "Nebula Unicorn",
    type: "Cosmic",
    rarity: "Mythic",
    element: "Space",
    emoji: "🌌",
    rarityColor: "from-blue-400 to-indigo-300",
    glowColor: "rgba(99,102,241,0.4)",
    gradient: "from-indigo-700 via-blue-600 to-cyan-500",
    cardGlow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]",
    image: "https://cdn.poehali.dev/projects/b707820d-b663-4e18-b16b-3d3997d046cb/files/9e3e3c55-d4e7-406c-a0a9-51903627a13d.jpg",
    description: "Forged in the heart of dying stars, the Nebula Unicorn carries the cosmos within their coat. Stars are born wherever they gallop.",
    powers: ["Star Creation", "Void Travel", "Gravity Bend"],
    habitat: "Deep Space Rifts",
    mood: "Mysterious",
  },
  {
    id: 3,
    name: "Frost Unicorn",
    type: "Elemental",
    rarity: "Rare",
    element: "Ice",
    emoji: "❄️",
    rarityColor: "from-cyan-300 to-sky-200",
    glowColor: "rgba(34,211,238,0.4)",
    gradient: "from-sky-600 via-cyan-500 to-teal-400",
    cardGlow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]",
    image: "https://cdn.poehali.dev/projects/b707820d-b663-4e18-b16b-3d3997d046cb/files/9e8c8720-a685-49f3-ab1c-931002a9ce17.jpg",
    description: "Crystallized from ancient glaciers, the Frost Unicorn moves in silence. Their breath forms intricate snowflakes, each one unique across all realms.",
    powers: ["Ice Sculpting", "Blizzard Call", "Crystal Vision"],
    habitat: "Eternal Tundra",
    mood: "Serene",
  },
  {
    id: 4,
    name: "Ember Unicorn",
    type: "Elemental",
    rarity: "Epic",
    element: "Fire",
    emoji: "🔥",
    rarityColor: "from-orange-400 to-red-400",
    glowColor: "rgba(249,115,22,0.4)",
    gradient: "from-red-600 via-orange-500 to-yellow-400",
    cardGlow: "hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]",
    image: null,
    description: "Rising from volcanic depths, the Ember Unicorn blazes with inner fire. Their hooves leave smoldering flowers that bloom in flame.",
    powers: ["Flame Dance", "Lava Walk", "Phoenix Rebirth"],
    habitat: "Volcanic Caldera",
    mood: "Passionate",
  },
  {
    id: 5,
    name: "Shadow Unicorn",
    type: "Arcane",
    rarity: "Epic",
    element: "Dark",
    emoji: "🌑",
    rarityColor: "from-purple-400 to-violet-400",
    glowColor: "rgba(139,92,246,0.4)",
    gradient: "from-gray-800 via-purple-900 to-violet-800",
    cardGlow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]",
    image: null,
    description: "Woven from moonless nights, the Shadow Unicorn dwells between worlds. They carry secrets that even the stars dare not whisper.",
    powers: ["Shadow Step", "Mind Reading", "Nightmare Guard"],
    habitat: "Twilight Realm",
    mood: "Enigmatic",
  },
  {
    id: 6,
    name: "Blossom Unicorn",
    type: "Nature",
    rarity: "Common",
    element: "Flora",
    emoji: "🌸",
    rarityColor: "from-green-400 to-emerald-300",
    glowColor: "rgba(52,211,153,0.4)",
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    cardGlow: "hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]",
    image: null,
    description: "Wherever the Blossom Unicorn runs, wildflowers burst forth from bare earth. Their mane is eternally woven with living vines and petals.",
    powers: ["Growth Magic", "Petal Storm", "Nature Bond"],
    habitat: "Enchanted Meadows",
    mood: "Gentle",
  },
];

const rarityOrder = ["Legendary", "Mythic", "Epic", "Rare", "Common"];

const rarityBadge: Record<string, string> = {
  Legendary: "bg-gradient-to-r from-yellow-400 to-amber-300 text-yellow-900",
  Mythic: "bg-gradient-to-r from-blue-400 to-indigo-400 text-indigo-900",
  Epic: "bg-gradient-to-r from-purple-400 to-violet-400 text-purple-900",
  Rare: "bg-gradient-to-r from-cyan-400 to-sky-300 text-sky-900",
  Common: "bg-gradient-to-r from-green-400 to-emerald-300 text-green-900",
};

function SparkleIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      className="absolute animate-sparkle text-white/60 text-xs pointer-events-none select-none"
      style={style}
    >
      ✦
    </span>
  );
}

function UnicornCard({ unicorn, index }: { unicorn: typeof unicorns[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${unicorn.cardGlow} opacity-0 animate-fade-up`}
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
        background: "rgba(15,10,30,0.7)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: unicorn.glowColor }}
      />

      <div className={`relative h-52 bg-gradient-to-br ${unicorn.gradient} overflow-hidden`}>
        {unicorn.image && (
          <img
            src={unicorn.image}
            alt={unicorn.name}
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl animate-float">{unicorn.emoji}</span>
        </div>
        <SparkleIcon style={{ top: "15%", left: "20%", animationDelay: "0s" }} />
        <SparkleIcon style={{ top: "30%", right: "25%", animationDelay: "0.7s" }} />
        <SparkleIcon style={{ bottom: "20%", left: "40%", animationDelay: "1.3s" }} />

        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${rarityBadge[unicorn.rarity]}`}>
            {unicorn.rarity}
          </span>
        </div>

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/30 text-white/90 backdrop-blur-sm border border-white/20">
            {unicorn.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="font-nunito font-bold text-xl text-white leading-tight">
              {unicorn.name}
            </h2>
            <p className="text-white/50 text-sm font-quicksand mt-0.5">
              Element: <span className="text-white/70">{unicorn.element}</span>
              {" · "}
              <span className="text-white/70">{unicorn.habitat}</span>
            </p>
          </div>
          <span
            className="text-white/30 text-lg transition-transform duration-300 mt-1"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
          >
            ▾
          </span>
        </div>

        <p className="text-white/60 text-sm font-quicksand leading-relaxed line-clamp-2">
          {unicorn.description}
        </p>

        {expanded && (
          <div className="mt-4 space-y-3 border-t border-white/10 pt-4 animate-fade-up">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest font-nunito mb-2">
                Powers
              </p>
              <div className="flex flex-wrap gap-2">
                {unicorn.powers.map((p) => (
                  <span
                    key={p}
                    className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${unicorn.gradient} text-white/90`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-white/40 text-xs uppercase tracking-widest font-nunito">Mood:</p>
              <span className="text-white/80 text-sm font-quicksand">{unicorn.mood}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", ...rarityOrder];

  const filtered =
    filter === "All" ? unicorns : unicorns.filter((u) => u.rarity === filter);

  return (
    <div
      className="min-h-screen font-quicksand"
      style={{
        background: "linear-gradient(135deg, #0a0415 0%, #110a2e 40%, #0d1a3a 100%)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-5%] w-72 h-72 rounded-full blur-3xl animate-glow-pulse"
          style={{ background: "rgba(139,92,246,0.15)" }}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-64 h-64 rounded-full blur-3xl animate-glow-pulse"
          style={{ background: "rgba(99,102,241,0.12)", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full blur-3xl animate-glow-pulse"
          style={{ background: "rgba(236,72,153,0.1)", animationDelay: "2s" }}
        />
      </div>

      <header className="relative px-5 pt-16 pb-8 text-center">
        <div className="relative inline-block">
          <p className="text-xs tracking-[0.3em] text-purple-300/60 uppercase font-nunito mb-3">
            Magical Bestiary
          </p>
          <h1
            className="font-nunito font-extrabold text-4xl leading-tight"
            style={{
              background: "linear-gradient(135deg, #e9d5ff 0%, #a78bfa 40%, #f9a8d4 80%, #fbcfe8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Unicorn
            <br />
            Types
          </h1>
          <span className="absolute -top-2 -right-4 text-yellow-300/70 animate-sparkle text-lg">✦</span>
          <span
            className="absolute top-8 -left-5 text-pink-300/60 animate-sparkle text-sm"
            style={{ animationDelay: "0.5s" }}
          >
            ✦
          </span>
        </div>

        <p className="text-white/40 text-sm mt-4 max-w-xs mx-auto font-quicksand leading-relaxed">
          Ancient records of every magical unicorn species known across the realms
        </p>

        <div className="flex justify-center gap-6 mt-6">
          {[
            { label: "Species", value: unicorns.length },
            { label: "Realms", value: 5 },
            { label: "Elements", value: 6 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-nunito font-bold text-2xl text-white/90">{s.value}</p>
              <p className="text-white/35 text-xs uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="px-5 mb-6 overflow-x-auto">
        <div className="flex gap-2 w-max mx-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-nunito whitespace-nowrap transition-all duration-300 ${
                filter === f
                  ? "bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(167,139,250,0.3)]"
                  : "text-white/40 border border-white/10 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 pb-16 max-w-md mx-auto space-y-4">
        {filtered.map((unicorn, i) => (
          <UnicornCard key={unicorn.id} unicorn={unicorn} index={i} />
        ))}
      </main>

      <footer className="text-center pb-10 px-5">
        <p className="text-white/20 text-xs font-quicksand tracking-wider">
          ✦ Tap any card to reveal powers ✦
        </p>
      </footer>
    </div>
  );
}
