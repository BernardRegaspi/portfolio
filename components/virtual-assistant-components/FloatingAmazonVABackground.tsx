import React, { useEffect, useState } from "react";

interface DynamicElement {
  id: number;
  text: string;
  left: number;
  top: number;
  fontSize: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
  animationType: number;
}

const FloatingCodeBackground: React.FC = () => {
  const [dynamicElements, setDynamicElements] = useState<DynamicElement[]>([]);

  useEffect(() => {
    const amazonVAElements: string[] = [
      "Product Research",
      "Keyword Optimization",
      "PPC Management",
      "Inventory Analysis",
      "Competitor Research",
      "Listing Optimization",
      "Amazon FBA",
      "Seller Central",
      "A9 Algorithm",
      "BSR Tracking",
      "Review Management",
      "Brand Registry",
      "Sponsored Products",
      "Amazon DSP",
      "Helium 10",
      "Jungle Scout",
      "AMZScout",
      "Keepa",
      "FBA Calculator",
      "Product Sourcing",
      "Supplier Management",
      "Quality Control",
      "Amazon Analytics",
      "Sales Velocity",
      "Conversion Rate",
      "Click-Through Rate",
      "ACoS Optimization",
      "TACoS Analysis",
      "Profit Margins",
      "ROI Tracking",
      "Market Research",
      "Niche Analysis",
      "Product Launch",
      "Ranking Strategy",
      "Customer Service",
      "Return Management",
      "Account Health",
      "Performance Metrics",
      "Sales Reports",
      "Inventory Planning",
    ];

    const createFloatingElement = () => {
      const id = Date.now() + Math.random();
      const newElement: DynamicElement = {
        id,
        text: amazonVAElements[
          Math.floor(Math.random() * amazonVAElements.length)
        ],
        left: Math.random() * 90 + 5,
        top: Math.random() * 90 + 5,
        fontSize: Math.random() * 8 + 12,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`,
        animationDuration: Math.random() * 3 + 4,
        animationDelay: Math.random() * 2,
        animationType: Math.floor(Math.random() * 6) + 1,
      };

      setDynamicElements((prev) => [...prev, newElement]);

      setTimeout(() => {
        setDynamicElements((prev) => prev.filter((el) => el.id !== id));
      }, (newElement.animationDuration + newElement.animationDelay + 2) * 1000);
    };

    for (let i = 0; i < 3; i++) {
      setTimeout(createFloatingElement, i * 1200);
    }

    const interval = setInterval(createFloatingElement, 5000);
    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = (type: number): string => {
    const animations: Record<number, string> = {
      1: "animate-float-1",
      2: "animate-float-2",
      3: "animate-float-3",
      4: "animate-float-4",
      5: "animate-float-5",
      6: "animate-float-6",
    };
    return animations[type] || "animate-float-1";
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static floating Amazon VA elements */}
      <div
        className="absolute top-[10%] left-[10%] text-red-400 font-mono font-bold text-base opacity-70 animate-float-1"
        style={{ textShadow: "0 0 10px currentColor", animationDuration: "4s" }}
      >
        Product Research
      </div>

      <div
        className="absolute top-[20%] right-[15%] text-teal-400 font-mono font-bold text-sm opacity-60 animate-float-2"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "5s",
          animationDelay: "1s",
        }}
      >
        Amazon FBA
      </div>

      <div
        className="absolute top-[60%] left-[5%] text-blue-400 font-mono font-bold text-lg opacity-80 animate-float-3"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "6s",
          animationDelay: "2s",
        }}
      >
        PPC Management
      </div>

      <div
        className="absolute top-[70%] right-[10%] text-yellow-400 font-mono font-bold text-xs opacity-70 animate-float-4"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "4.5s",
          animationDelay: "0.5s",
        }}
      >
        Helium 10
      </div>

      <div
        className="absolute top-[40%] right-[25%] text-purple-400 font-mono font-bold text-base opacity-60 animate-float-5"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "5.5s",
          animationDelay: "1.5s",
        }}
      >
        Listing Optimization
      </div>

      <div
        className="absolute top-[30%] left-[20%] text-indigo-400 font-mono font-bold text-sm opacity-80 animate-float-6"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "4.2s",
          animationDelay: "2.5s",
        }}
      >
        Seller Central
      </div>

      <div
        className="absolute top-[15%] left-[60%] text-green-400 font-mono font-bold text-base opacity-70 animate-float-1"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "5s",
          animationDelay: "3s",
        }}
      >
        BSR Tracking
      </div>

      <div
        className="absolute top-[80%] left-[30%] text-pink-400 font-mono font-bold text-sm opacity-60 animate-float-2"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "4.8s",
          animationDelay: "1.2s",
        }}
      >
        Keyword Research
      </div>

      <div
        className="absolute top-[50%] left-[80%] text-cyan-400 font-mono font-bold text-base opacity-75 animate-float-3"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "5.2s",
          animationDelay: "0.8s",
        }}
      >
        ACoS Optimization
      </div>

      <div
        className="absolute top-[25%] left-[40%] text-orange-400 font-mono font-bold text-sm opacity-65 animate-float-4"
        style={{
          textShadow: "0 0 10px currentColor",
          animationDuration: "4.7s",
          animationDelay: "2.2s",
        }}
      >
        Jungle Scout
      </div>

      {/* Dynamic floating elements */}
      {dynamicElements.map((element) => (
        <div
          key={element.id}
          className={`absolute font-mono font-bold ${getAnimationClass(
            element.animationType
          )} opacity-0 animate-fade-in`}
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            fontSize: `${element.fontSize}px`,
            color: element.color,
            textShadow: "0 0 10px currentColor",
            animationDuration: `${element.animationDuration}s`,
            animationDelay: `${element.animationDelay}s`,
            animationFillMode: "both",
          }}
        >
          {element.text}
        </div>
      ))}

      {/* Floating particles */}
      <div
        className="absolute top-[15%] left-[30%] w-1 h-1 bg-white rounded-full animate-particle-float opacity-0"
        style={{ animationDuration: "8s", animationIterationCount: "infinite" }}
      />
      <div
        className="absolute top-[80%] left-[60%] w-1 h-1 bg-white rounded-full animate-particle-float opacity-0"
        style={{
          animationDuration: "6s",
          animationDelay: "2s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="absolute top-[45%] left-[85%] w-1 h-1 bg-white rounded-full animate-particle-float opacity-0"
        style={{
          animationDuration: "7s",
          animationDelay: "4s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="absolute top-[35%] left-[15%] w-1 h-1 bg-white rounded-full animate-particle-float opacity-0"
        style={{
          animationDuration: "9s",
          animationDelay: "1s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="absolute top-[65%] left-[45%] w-1 h-1 bg-white rounded-full animate-particle-float opacity-0"
        style={{
          animationDuration: "7.5s",
          animationDelay: "3s",
          animationIterationCount: "infinite",
        }}
      />

      {/* Add subtle glow effect with purple theme */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-purple-900/10 opacity-30"></div>
    </div>
  );
};

export default FloatingCodeBackground;
