import { useState, useEffect } from "react";

const UNICORNS = [
  {
    id: 1,
    name: "Аврора",
    latin: "Aurora Solaris",
    rarity: "Легендарный",
    element: "Свет",
    habitat: "Горные вершины",
    mood: "Радостный",
    power: 98,
    emoji: "☀️",
    accent: "#f5c842",
    accentDim: "rgba(245,200,66,0.1)",
    accentGlow: "rgba(245,200,66,0.28)",
    tag: "ЛЕГЕНДА",
    description: "Рождённая из первого луча рассвета, Аврора ткёт ленты цвета по небосводу. Её грива переливается всеми оттенками радуги, а следы копыт превращаются в золотые цветы.",
    powers: ["Ткачество цвета", "Хождение во снах", "Аура исцеления"],
  },
  {
    id: 2,
    name: "Туманность",
    latin: "Nebula Cosmica",
    rarity: "Мифический",
    element: "Космос",
    habitat: "Разрывы пространства",
    mood: "Таинственный",
    power: 95,
    emoji: "🌌",
    accent: "#7b8fff",
    accentDim: "rgba(123,143,255,0.1)",
    accentGlow: "rgba(123,143,255,0.28)",
    tag: "МИФ",
    description: "Выкованная в сердце умирающих звёзд, Туманность несёт в себе целый космос. Звёзды рождаются там, где она скачет, и гаснут, когда она уходит.",
    powers: ["Создание звёзд", "Путешествие сквозь пустоту", "Изгиб гравитации"],
  },
  {
    id: 3,
    name: "Иней",
    latin: "Glacies Aeterna",
    rarity: "Редкий",
    element: "Лёд",
    habitat: "Вечная тундра",
    mood: "Безмятежный",
    power: 75,
    emoji: "❄️",
    accent: "#7dd3fc",
    accentDim: "rgba(125,211,252,0.1)",
    accentGlow: "rgba(125,211,252,0.28)",
    tag: "РЕДКИЙ",
    description: "Кристаллизованный из древних ледников, Иней движется в тишине. Его дыхание формирует изящные снежинки — каждая единственная в своём роде.",
    powers: ["Ледяная скульптура", "Призыв метели", "Кристальное зрение"],
  },
  {
    id: 4,
    name: "Уголёк",
    latin: "Ignis Perpetuus",
    rarity: "Эпический",
    element: "Огонь",
    habitat: "Вулканическая кальдера",
    mood: "Страстный",
    power: 87,
    emoji: "🔥",
    accent: "#fb923c",
    accentDim: "rgba(251,146,60,0.1)",
    accentGlow: "rgba(251,146,60,0.28)",
    tag: "ЭПОС",
    description: "Восставший из вулканических глубин, Уголёк пылает внутренним огнём. Его копыта оставляют тлеющие цветы, расцветающие в пламени.",
    powers: ["Танец пламени", "Хождение по лаве", "Возрождение Феникса"],
  },
  {
    id: 5,
    name: "Тень",
    latin: "Umbra Arcana",
    rarity: "Эпический",
    element: "Тьма",
    habitat: "Сумеречное царство",
    mood: "Загадочный",
    power: 89,
    emoji: "🌑",
    accent: "#c084fc",
    accentDim: "rgba(192,132,252,0.1)",
    accentGlow: "rgba(192,132,252,0.28)",
    tag: "ЭПОС",
    description: "Сотканная из безлунных ночей, Тень живёт между мирами. Она хранит тайны, о которых даже звёзды не решаются шептать.",
    powers: ["Теневой шаг", "Чтение мыслей", "Страж кошмаров"],
  },
  {
    id: 6,
    name: "Цветок",
    latin: "Flora Perpetua",
    rarity: "Обычный",
    element: "Природа",
    habitat: "Зачарованные луга",
    mood: "Нежный",
    power: 58,
    emoji: "🌸",
    accent: "#6ee7b7",
    accentDim: "rgba(110,231,183,0.1)",
    accentGlow: "rgba(110,231,183,0.28)",
    tag: "ОБЫЧНЫЙ",
    description: "Там, где бежит Цветок, из голой земли вырастают дикие цветы. Его грива вечно вплетена живыми лозами и лепестками.",
    powers: ["Магия роста", "Буря лепестков", "Связь с природой"],
  },
];

const FILTERS = ["Все", "Легендарный", "Мифический", "Эпический", "Редкий", "Обычный"];

function PowerBar({ value, accent }: { value: number; accent: string }) {
  return (
    <div className="relative h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${accent}70, ${accent})`,
          boxShadow: `0 0 6px ${accent}50`,
          transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

function Card({
  u,
  index,
  open,
  onToggle,
}: {
  u: (typeof UNICORNS)[0];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="opacity-0 animate-fade-up cursor-pointer select-none"
      style={{ animationDelay: `${index * 0.07}s`, animationFillMode: "forwards" }}
      onClick={onToggle}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: open
            ? `linear-gradient(140deg, ${u.accentDim}, rgba(255,255,255,0.02) 70%)`
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${open ? `${u.accent}45` : "rgba(255,255,255,0.06)"}`,
          boxShadow: open ? `0 4px 32px ${u.accentGlow}` : "none",
        }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, transparent 10%, ${u.accent} 50%, transparent 90%)`,
            opacity: open ? 1 : 0,
          }}
        />

        {/* Main row */}
        <div className="flex items-start gap-4 px-5 pt-5 pb-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-500"
            style={{
              background: open
                ? `radial-gradient(circle, ${u.accentDim} 0%, transparent 80%)`
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${open ? `${u.accent}35` : "rgba(255,255,255,0.07)"}`,
              boxShadow: open ? `0 0 16px ${u.accentGlow}` : "none",
            }}
          >
            <span className={open ? "animate-float" : ""} style={{ filter: open ? `drop-shadow(0 0 5px ${u.accent})` : "none" }}>
              {u.emoji}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
              <h2
                className="font-cormorant font-semibold text-xl text-white leading-none"
                style={{ letterSpacing: "0.01em" }}
              >
                {u.name}
              </h2>
              <span
                className="text-[8px] font-raleway font-bold tracking-[0.18em] px-1.5 py-0.5 rounded"
                style={{ color: u.accent, background: `${u.accent}15`, border: `1px solid ${u.accent}30` }}
              >
                {u.tag}
              </span>
            </div>
            <p className="font-cormorant italic text-sm mb-2.5" style={{ color: "rgba(255,255,255,0.3)" }}>
              {u.latin}
            </p>
            <div className="flex items-center gap-2.5">
              <PowerBar value={u.power} accent={u.accent} />
              <span className="font-raleway text-xs font-semibold flex-shrink-0" style={{ color: u.accent }}>
                {u.power}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flex-shrink-0 mt-1.5 transition-transform duration-300"
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              color: open ? u.accent : "rgba(255,255,255,0.2)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Meta pills row */}
        <div className="px-5 pb-4 flex gap-3 flex-wrap">
          {[
            { l: "Элемент", v: u.element },
            { l: "Место", v: u.habitat },
            { l: "Нрав", v: u.mood },
          ].map((m) => (
            <div key={m.l} className="text-xs font-raleway">
              <span style={{ color: "rgba(255,255,255,0.2)" }}>{m.l}: </span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>{m.v}</span>
            </div>
          ))}
        </div>

        {/* Expanded */}
        {open && (
          <div
            className="opacity-0 animate-reveal"
            style={{ animationFillMode: "forwards" }}
          >
            <div
              className="mx-5 mb-4 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${u.accent}35, transparent)` }}
            />
            <div className="px-5 pb-5 space-y-4">
              <p
                className="font-cormorant italic text-[15px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {u.description}
              </p>
              <div>
                <p
                  className="font-raleway text-[8px] uppercase tracking-[0.22em] mb-2"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                >
                  Способности
                </p>
                <div className="flex flex-wrap gap-2">
                  {u.powers.map((p) => (
                    <span
                      key={p}
                      className="font-raleway text-xs px-3 py-1 rounded-full"
                      style={{
                        color: u.accent,
                        background: `${u.accent}10`,
                        border: `1px solid ${u.accent}28`,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Index() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const list = filter === "Все" ? UNICORNS : UNICORNS.filter((u) => u.rarity === filter);

  return (
    <div className="min-h-screen font-raleway" style={{ background: "#07070f" }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute animate-drift"
          style={{
            top: "-20%", left: "-15%",
            width: "70vw", height: "70vw",
            maxWidth: 520, maxHeight: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(110,60,255,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute animate-drift"
          style={{
            bottom: "-15%", right: "-15%",
            width: "55vw", height: "55vw",
            maxWidth: 420, maxHeight: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240,80,200,0.05) 0%, transparent 65%)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative px-5 pt-14 pb-5 max-w-lg mx-auto">
        {/* Rule line */}
        <div
          className="flex items-center gap-3 mb-7"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12))" }} />
          <p className="font-raleway text-[9px] tracking-[0.32em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
            Магический Бестиарий
          </p>
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
        </div>

        {/* Title block */}
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
          <p
            className="font-cormorant font-light"
            style={{ fontSize: "clamp(3.2rem, 15vw, 5.5rem)", lineHeight: 0.9, letterSpacing: "-0.025em", color: "rgba(255,255,255,0.88)" }}
          >
            Виды
          </p>
          <p
            className="font-cormorant italic"
            style={{
              fontSize: "clamp(3.2rem, 15vw, 5.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
              marginTop: "-0.05em",
              background: "linear-gradient(120deg, #d8b4fe 0%, #a78bfa 45%, #f0abfc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            единорогов
          </p>
        </div>

        <p
          className="font-cormorant italic mt-4 leading-relaxed"
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.28)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.25s",
          }}
        >
          Древние записи о каждом магическом существе, известном в мирах
        </p>

        {/* Stats */}
        <div
          className="flex gap-8 mt-6 pt-5"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.35s",
          }}
        >
          {[{ n: UNICORNS.length, l: "Видов" }, { n: 6, l: "Элементов" }, { n: 5, l: "Миров" }].map((s) => (
            <div key={s.l}>
              <p className="font-cormorant font-semibold text-2xl" style={{ color: "rgba(255,255,255,0.82)" }}>{s.n}</p>
              <p className="font-raleway text-[8px] uppercase tracking-[0.22em] mt-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Filters */}
      <div
        className="px-5 mb-4 max-w-lg mx-auto"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.45s" }}
      >
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => { setFilter(f); setOpenId(null); }}
                className="font-raleway text-[11px] tracking-wider px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: active ? "rgba(255,255,255,0.09)" : "transparent",
                  color: active ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.28)",
                  border: `1px solid ${active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <main className="px-5 pb-20 max-w-lg mx-auto space-y-2">
        {list.map((u, i) => (
          <Card
            key={u.id}
            u={u}
            index={i}
            open={openId === u.id}
            onToggle={() => setOpenId(openId === u.id ? null : u.id)}
          />
        ))}
      </main>

      <footer className="text-center pb-10">
        <p className="font-cormorant italic text-sm" style={{ color: "rgba(255,255,255,0.12)" }}>
          Нажмите на карточку, чтобы узнать больше
        </p>
      </footer>
    </div>
  );
}
