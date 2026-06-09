const {
  useState,
  useEffect,
  useMemo
} = React;

// --- CONFIGURATION ---
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ058IHDO-lSXB4DKKkc8Lu1sU_eVVNsahQ4zAbleIRJgQbAAG1aYGVU1Pxxn3tvRH4FDR9GmSUft6H/pub?output=csv";
const REQUEST_LIMIT = 6;

// --- ICONS ---
const Icons = {
  Search: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  LayoutGrid: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "14",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "14",
    y: "14",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "14",
    rx: "1"
  })),
  List: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "21",
    y1: "6",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "21",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "21",
    y1: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "3.01",
    y1: "6",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "3.01",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "3.01",
    y1: "18",
    y2: "18"
  })),
  SortAsc: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m3 16 4 4 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 20V4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 4h10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 8h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 12h4"
  })),
  Hash: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "9",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "15",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    x2: "8",
    y1: "3",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "14",
    y1: "3",
    y2: "21"
  })),
  Box: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3.3 7 8.7 5 8.7-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22V12"
  })),
  Clock: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  Briefcase: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "7",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  })),
  Zap: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  })),
  Eye: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  Layers: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
  })),
  DollarSign: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "2",
    y2: "22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
  })),
  Calendar: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "4",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "16",
    y1: "2",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "8",
    y1: "2",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "21",
    y1: "10",
    y2: "10"
  })),
  Tag: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 7h.01"
  })),
  Gift: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "8",
    width: "18",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
  })),
  Users: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })),
  ShoppingBag: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 10a4 4 0 0 1-8 0"
  })),
  Banknote: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "12",
    x: "2",
    y: "6",
    rx: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12h.01M18 12h.01"
  })),
  Monitor: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })),
  Calculator: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "20",
    x: "4",
    y: "2",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "6",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "16",
    y1: "14",
    y2: "18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 10h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 10h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 14h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 14h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 18h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 18h.01"
  })),
  Check: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  WhatsApp: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
  })),
  X: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  })),
  ChevronsUpDown: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m7 15 5 5 5-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 9 5-5 5 5"
  })),
  Clipboard: () => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "8",
    height: "4",
    x: "8",
    y: "2",
    rx: "1",
    ry: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
  }))
};

// --- HELPERS ---
const calculateMyAverage = (base, subs) => {
  if (!base) return null;
  const baseVal = parseFloat(base) || 0;
  let numerator = baseVal * 10;
  let denominator = 10;

  // Subscores: j (Portability), m (Aesthetics).
  // Removed 'k' (Complexity) from calculation to avoid bias.
  ['j', 'm'].forEach(key => {
    const val = parseFloat(subs[key]);
    if (!isNaN(val)) {
      numerator += val * 2;
      denominator += 1;
    }
  });
  return (numerator / denominator).toFixed(1);
};
const calculateOverallAverage = (bgg, myAvg, friend) => {
  const values = [];
  if (bgg && !isNaN(parseFloat(bgg))) values.push(parseFloat(bgg));
  if (myAvg && !isNaN(parseFloat(myAvg))) values.push(parseFloat(myAvg));
  if (friend && !isNaN(parseFloat(friend))) values.push(parseFloat(friend));
  if (values.length === 0) return null;
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
};

// NEW SCALE: 1-5
const getComplexityLabel = val => {
  if (!val) return '-';
  const v = Math.round(parseFloat(val));
  const labels = {
    1: "No brainer",
    2: "Casual",
    3: "Moderate",
    4: "Complex",
    5: "Heavy"
  };
  return labels[Math.max(1, Math.min(5, v))] || "Moderate";
};
const parsePrice = priceStr => {
  if (!priceStr) return 0;
  return parseFloat(priceStr.toString().replace(/[^0-9.]/g, '')) || 0;
};
const formatDate = dateStr => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
const formatPlayers = (min, max) => {
  if (!min && !max) return '';
  if (min === max) return `${min}`;
  if (min && !max) return `${min}+`;
  if (!min && max) return `Up to ${max}`;
  return `${min}-${max}`;
};
const generateRequestMessage = selectedGames => {
  let msg = "Hi, here is my request list for the meetup:\n\n";
  selectedGames.forEach((game, idx) => {
    msg += `${idx + 1}. *${game.name}* (${formatPlayers(game.minPlayers, game.maxPlayers)} Players, ${game.playTime}m)\n`;
  });
  return msg;
};

// --- COMPONENTS ---

const StatsPill = ({
  icon: Icon,
  label,
  value,
  onClick,
  className = ""
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  className: `px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm flex items-center gap-2 md:gap-3 bg-[#F1F1F1]/5 border-[#F1F1F1]/10 text-[#F1F1F1]/60 transition-colors shrink-0 ${onClick ? 'cursor-pointer hover:bg-[#F1F1F1]/10' : ''} ${className}`
}, /*#__PURE__*/React.createElement(Icon, {
  className: "w-3 h-3 md:w-4 md:h-4"
}), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
  className: "text-[#F1F1F1] font-bold"
}, value), " ", /*#__PURE__*/React.createElement("span", {
  className: "hidden sm:inline"
}, label)), onClick && /*#__PURE__*/React.createElement(Icons.ChevronsUpDown, {
  className: "w-3 h-3 opacity-50 ml-1"
}));
const ViewToggle = ({
  active,
  onClick,
  icon: Icon
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  className: `p-2 md:p-3 rounded-xl transition-all ${active ? 'bg-[#F1F1F1] text-[#1F1F1F]' : 'text-[#F1F1F1]/40 hover:text-white hover:bg-[#F1F1F1]/10'}`
}, /*#__PURE__*/React.createElement(Icon, {
  className: "w-4 h-4"
}));
function GameCard({
  game,
  viewMode,
  onOpenDetail,
  isRequestMode,
  isSelected,
  onToggleSelect
}) {
  const isGrid = viewMode === 'grid';
  const isOwned = game.owned;
  const handleClick = e => {
    if (isRequestMode) {
      onToggleSelect(game);
    } else {
      onOpenDetail(game);
    }
  };

  // Request Mode Overlay Logic
  const requestOverlay = isRequestMode && /*#__PURE__*/React.createElement(React.Fragment, null, isSelected && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 border-[3px] border-[#C51728] rounded-3xl z-20 pointer-events-none flex items-start justify-end p-2 md:p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#C51728] text-white rounded-full p-1 shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Check, {
    className: "w-4 h-4 md:w-5 md:h-5"
  }))), !isOwned && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-[#1F1F1F]/60 backdrop-grayscale z-30 flex items-center justify-center cursor-not-allowed rounded-2xl md:rounded-3xl"
  }));
  if (!isGrid) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: handleClick,
      className: `group flex items-center gap-3 md:gap-6 border p-3 md:p-4 rounded-2xl transition-all cursor-pointer relative overflow-hidden
                            ${isRequestMode && isSelected ? 'bg-[#C51728]/10 border-[#C51728]' : ''}
                            ${!isRequestMode && isOwned ? 'bg-[#F1F1F1]/5 border-[#F1F1F1]/5 hover:bg-[#F1F1F1]/10 hover:border-[#C51728]/30' : ''} 
                            ${!isRequestMode && !isOwned ? 'bg-[#F1F1F1]/[0.02] border-[#F1F1F1]/5 not-owned' : ''}
                            ${isRequestMode && !isOwned ? 'opacity-40' : ''}
                        `
    }, isRequestMode && isSelected && /*#__PURE__*/React.createElement("div", {
      className: "absolute left-0 top-0 bottom-0 w-1.5 bg-[#C51728]"
    }), /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shrink-0 bg-[#000]/20 flex items-center justify-center relative"
    }, game.image ? /*#__PURE__*/React.createElement("img", {
      src: game.image,
      alt: game.name,
      loading: "lazy",
      className: "w-full h-full object-cover",
      onError: e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling && (e.currentTarget.nextSibling.style.display = 'flex'); }
    }) : /*#__PURE__*/React.createElement(Icons.Box, {
      className: "w-5 h-5 md:w-6 md:h-6 text-[#F1F1F1]/20"
    }), game.expansions?.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1 right-1 bg-[#C51728] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full",
      title: "Has Expansions"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("h3", {
      className: `font-serif-italic text-lg md:text-xl truncate transition-colors flex items-center gap-2 ${isOwned ? 'text-[#F1F1F1] group-hover:text-white' : 'text-[#F1F1F1]/50'}`
    }, game.name, game.expansions?.length > 0 && /*#__PURE__*/React.createElement(Icons.Layers, {
      className: "w-3 h-3 md:w-4 md:h-4 text-[#F1F1F1]/30"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 md:gap-4 text-xs md:text-sm text-[#F1F1F1]/40 mt-0.5 md:mt-1"
    }, game.playTime && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icons.Clock, {
      className: "w-3 h-3 md:w-3.5 md:h-3.5"
    }), game.playTime, "m"), (game.minPlayers || game.maxPlayers) && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icons.Users, {
      className: "w-3 h-3 md:w-3.5 md:h-3.5"
    }), formatPlayers(game.minPlayers, game.maxPlayers)), game.subScores?.k && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icons.Zap, {
      className: "w-3 h-3 md:w-3.5 md:h-3.5"
    }), getComplexityLabel(game.subScores.k)))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 sm:gap-8 pr-1 md:pr-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex flex-col items-center min-w-[3rem]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[#F1F1F1]/30 uppercase font-bold tracking-widest mb-1"
    }, "BGG"), /*#__PURE__*/React.createElement("span", {
      className: "font-bold text-[#F1F1F1]/60"
    }, game.bggRating || '-')), /*#__PURE__*/React.createElement("div", {
      className: "hidden sm:flex flex-col items-center min-w-[3rem]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[#F1F1F1]/30 uppercase font-bold tracking-widest mb-1"
    }, "Friend"), /*#__PURE__*/React.createElement("span", {
      className: "font-bold text-[#F1F1F1]/60"
    }, game.friendRating || '-')), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center min-w-[2rem] md:min-w-[3rem]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[8px] md:text-[10px] text-[#F1F1F1]/30 uppercase font-bold tracking-widest mb-1"
    }, "My Avg"), /*#__PURE__*/React.createElement("span", {
      className: "text-lg md:text-xl text-[#F1F1F1]"
    }, game.calculatedMyAvg || '-')), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center min-w-[2rem] md:min-w-[3rem]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[8px] md:text-[10px] text-[#F1F1F1]/30 uppercase font-bold tracking-widest mb-1"
    }, "Overall"), /*#__PURE__*/React.createElement("span", {
      className: "text-sm md:text-base font-bold text-[#C51728]"
    }, game.calculatedOverallAvg || '-'))));
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: handleClick,
    className: `group relative border rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col 
                        ${isRequestMode && isSelected ? 'bg-[#1F1F1F]' : ''}
                        ${!isRequestMode && isOwned ? 'bg-[#F1F1F1]/5 border-[#F1F1F1]/5 hover:border-[#C51728]/40 hover:shadow-2xl hover:shadow-[#C51728]/10' : 'bg-[#F1F1F1]/[0.02] border-[#F1F1F1]/5'}
                        ${!isOwned && !isRequestMode ? 'not-owned' : ''}
                    `
  }, requestOverlay, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col h-full relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full aspect-[4/3] bg-[#000]/30 overflow-hidden"
  }, game.image ? /*#__PURE__*/React.createElement("img", {
    src: game.image,
    alt: game.name,
    loading: "lazy",
    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100",
    onError: e => { e.currentTarget.style.display = 'none'; }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center text-[#F1F1F1]/10"
  }, /*#__PURE__*/React.createElement(Icons.Box, {
    className: "w-12 h-12"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 right-0 z-10 px-5 md:px-6 pb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: `font-serif-italic text-3xl md:text-2xl leading-none mb-1 transition-colors drop-shadow-md line-clamp-2 ${isOwned ? 'text-[#F1F1F1] group-hover:text-white' : 'text-[#F1F1F1]/50'}`,
    title: game.name
  }, game.name)), game.expansions?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 right-3 flex flex-col gap-1 items-end z-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#1F1F1F]/80 backdrop-blur text-[#F1F1F1] text-[10px] px-2 py-1 rounded-full border border-[#F1F1F1]/10 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Layers, {
    className: "w-3 h-3"
  }), " +", game.expansions.length)), !isOwned && !isRequestMode && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 left-3 bg-[#000]/60 backdrop-blur text-[#F1F1F1]/60 text-[10px] px-2 py-1 rounded-full border border-[#F1F1F1]/10 uppercase font-bold tracking-widest z-20"
  }, "Not Owned")), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#1F1F1F] border-t border-[#F1F1F1]/10 rounded-b-3xl flex flex-col mt-auto z-20 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 md:p-4 pt-3 md:pt-4 grid grid-cols-3 gap-1 md:gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[8px] md:text-[10px] text-[#F1F1F1]/40 uppercase font-bold tracking-widest mb-1 md:mb-1.5"
  }, "BGG"), /*#__PURE__*/React.createElement("div", {
    className: "text-base md:text-xl font-bold text-[#F1F1F1]/60"
  }, game.bggRating || '-')), /*#__PURE__*/React.createElement("div", {
    className: "text-center border-l border-[#F1F1F1]/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[8px] md:text-[10px] text-[#F1F1F1]/40 uppercase font-bold tracking-widest mb-1 md:mb-1.5"
  }, "My Avg"), /*#__PURE__*/React.createElement("div", {
    className: "text-base md:text-xl text-[#F1F1F1]"
  }, game.calculatedMyAvg || '-')), /*#__PURE__*/React.createElement("div", {
    className: "text-center border-l border-[#F1F1F1]/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[8px] md:text-[10px] text-[#F1F1F1]/40 uppercase font-bold tracking-widest mb-1 md:mb-1.5"
  }, "Overall"), /*#__PURE__*/React.createElement("div", {
    className: "text-base md:text-xl font-bold text-[#C51728]"
  }, game.calculatedOverallAvg || '-'))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 md:px-6 py-3 border-t border-[#F1F1F1]/5 flex items-center justify-between text-[10px] md:text-xs text-[#F1F1F1]/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Clock, {
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, game.playTime ? `${game.playTime}m` : '-')), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Users, {
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, formatPlayers(game.minPlayers, game.maxPlayers) || '-')), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Zap, {
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, game.subScores?.k ? getComplexityLabel(game.subScores.k) : '-'))))));
}
function RequestBar({
  selectedGames,
  onCopy
}) {
  if (selectedGames.length === 0) return null;
  const message = generateRequestMessage(selectedGames);
  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    onCopy();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/90 to-transparent z-40 pointer-events-none transition-opacity duration-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 left-0 right-0 px-4 md:px-0 z-50 flex justify-center animate-slide-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#1F1F1F] border border-[#F1F1F1]/10 shadow-2xl rounded-full p-2 pl-6 flex items-center gap-4 max-w-lg w-full ring-1 ring-[#C51728]/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#F1F1F1]/40 uppercase font-bold tracking-widest"
  }, "Request"), /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1] font-bold"
  }, selectedGames.length, " Game", selectedGames.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleCopy,
    className: "p-3 rounded-full hover:bg-[#F1F1F1]/10 text-[#F1F1F1]/60 hover:text-white transition-colors",
    title: "Copy Text"
  }, /*#__PURE__*/React.createElement(Icons.Clipboard, null)), /*#__PURE__*/React.createElement("button", {
    onClick: handleWhatsApp,
    className: "bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg transition-colors flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.WhatsApp, null), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm hidden sm:inline"
  }, "Send"))))));
}
function GameDetailModal({
  game,
  onClose
}) {
  // REMOVED: if (!game) return null; (Handled by parent now)

  // Add Effect to lock scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  if (!game) return null; // Safety check moved after hooks

  const isOwned = game.owned;
  const handleContentClick = e => {
    e.stopPropagation();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 bg-[#000]/90 backdrop-blur-sm",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#1F1F1F] border-t md:border border-[#F1F1F1]/10 rounded-t-3xl md:rounded-3xl w-full max-w-4xl h-[95vh] md:h-auto md:max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 md:fade-in md:zoom-in-95 duration-200 relative",
    onClick: handleContentClick
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 z-50 p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white border border-white/10 transition-all cursor-pointer leading-none"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-[#000]/40 relative h-[300px] md:h-[400px] shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0"
  }, game.image ? /*#__PURE__*/React.createElement("img", {
    src: game.image,
    alt: game.name,
    loading: "lazy",
    className: "w-full h-full object-cover opacity-60",
    onError: e => { e.currentTarget.style.display = 'none'; }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/40 to-transparent"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative p-6 md:p-10 h-full flex flex-col justify-end"
  }, /*#__PURE__*/React.createElement("h2", {
    className: `font-serif-italic text-3xl md:text-5xl mb-4 leading-none drop-shadow-xl ${isOwned ? 'text-white' : 'text-[#F1F1F1]/50'}`
  }, game.name), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 md:gap-3 text-xs md:text-sm text-[#F1F1F1]/80 mb-6 font-medium flex-wrap"
  }, game.playTime && /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 bg-[#F1F1F1]/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5"
  }, /*#__PURE__*/React.createElement(Icons.Clock, {
    className: "w-3.5 h-3.5"
  }), " ", game.playTime, "m"), (game.minPlayers || game.maxPlayers) && /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 bg-[#F1F1F1]/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5"
  }, /*#__PURE__*/React.createElement(Icons.Users, {
    className: "w-3.5 h-3.5"
  }), " ", formatPlayers(game.minPlayers, game.maxPlayers)), game.source && /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 bg-[#F1F1F1]/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5"
  }, game.source === 'Bought' ? /*#__PURE__*/React.createElement(Icons.Banknote, {
    className: "w-3.5 h-3.5"
  }) : /*#__PURE__*/React.createElement(Icons.Gift, {
    className: "w-3.5 h-3.5"
  }), game.source), game.status && /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 bg-[#F1F1F1]/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5"
  }, /*#__PURE__*/React.createElement(Icons.Tag, {
    className: "w-3.5 h-3.5"
  }), " ", game.status)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3 md:gap-4 w-full md:max-w-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/10 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#F1F1F1]/10 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#F1F1F1]/60 uppercase font-bold tracking-widest mb-1"
  }, "BGG"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl md:text-4xl font-bold text-[#F1F1F1]/80"
  }, game.bggRating || '-')), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/10 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#F1F1F1]/10 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#F1F1F1]/60 uppercase font-bold tracking-widest mb-1"
  }, "My Avg"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl md:text-4xl font-bold text-[#F1F1F1]"
  }, game.calculatedMyAvg || '-')), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/10 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#F1F1F1]/10 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#F1F1F1]/60 uppercase font-bold tracking-widest mb-1"
  }, "Overall"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl md:text-4xl font-bold text-[#C51728]"
  }, game.calculatedOverallAvg || '-'))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 bg-[#1F1F1F] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 md:p-10 space-y-8 md:space-y-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F1F1F1]/5 rounded-2xl border border-[#F1F1F1]/5 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/40 mb-1"
  }, "Acquired"), /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]"
  }, formatDate(game.dateAcquired) || '-')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/40 mb-1"
  }, "Paid"), /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]"
  }, "Rs. ", parseInt(game.price).toLocaleString())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/40 mb-1"
  }, "MSRP"), /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/60"
  }, "Rs. ", parseInt(game.msrp).toLocaleString())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/40 mb-1"
  }, "Status"), /*#__PURE__*/React.createElement("div", {
    className: `${isOwned ? 'text-emerald-400' : 'text-red-400'}`
  }, isOwned ? 'Owned' : 'Gone'))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-[#F1F1F1]/40 tracking-widest mb-4 md:mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Calculator, {
    className: "w-4 h-4"
  }), " Scoring Breakdown"), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/5 rounded-3xl p-6 md:p-8 border border-[#F1F1F1]/5 space-y-6 md:space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1] font-bold text-base md:text-lg flex items-center gap-3"
  }, "Gameplay", /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] bg-[#C51728]/20 text-[#C51728] px-2 py-0.5 rounded-full border border-[#C51728]/30 font-bold tracking-wide"
  }, "BASE")), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#F1F1F1]/40 mt-1.5"
  }, "Primary weighted factor (x10)")), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl md:text-4xl font-serif-italic text-white"
  }, game.baseScore || '-', " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-[#F1F1F1]/40 font-sans"
  }, "/ 10"))), /*#__PURE__*/React.createElement("div", {
    className: "h-px bg-[#F1F1F1]/10 w-full"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 md:gap-4"
  }, [{
    l: 'Portability',
    v: game.subScores?.j,
    i: Icons.Briefcase
  }, {
    l: 'Aesthetics',
    v: game.subScores?.m,
    i: Icons.Eye
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `p-3 md:p-4 rounded-2xl border ${s.v ? 'bg-[#F1F1F1]/5 border-[#F1F1F1]/10' : 'bg-transparent border-[#F1F1F1]/5 opacity-30'} transition-colors`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#F1F1F1]/40 tracking-widest truncate mb-2 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(s.i, {
    className: "w-3 h-3"
  }), s.l), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl md:text-2xl font-serif-italic text-[#F1F1F1]"
  }, s.v || '-', " ", /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-[#F1F1F1]/40 font-sans"
  }, "/ 5"))))), /*#__PURE__*/React.createElement("div", {
    className: `p-3 md:p-4 rounded-2xl border ${game.subScores?.k ? 'bg-[#F1F1F1]/5 border-[#F1F1F1]/10' : 'bg-transparent border-[#F1F1F1]/5 opacity-30'} transition-colors`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#F1F1F1]/40 tracking-widest truncate mb-2 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Zap, {
    className: "w-3 h-3"
  }), "Complexity"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base md:text-lg font-serif-italic text-[#F1F1F1] leading-tight"
  }, game.subScores?.k ? `${Math.round(game.subScores.k)} - ${getComplexityLabel(game.subScores.k)}` : '-'))), /*#__PURE__*/React.createElement("div", {
    className: `p-3 md:p-4 rounded-2xl border ${game.minPlayers || game.maxPlayers ? 'bg-[#F1F1F1]/5 border-[#F1F1F1]/10' : 'bg-transparent border-[#F1F1F1]/5 opacity-30'} transition-colors`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#F1F1F1]/40 tracking-widest truncate mb-2 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Users, {
    className: "w-3 h-3"
  }), "Players"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base md:text-lg font-serif-italic text-[#F1F1F1] leading-tight"
  }, formatPlayers(game.minPlayers, game.maxPlayers))))))), game.expansions?.length > 0 && /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-[#F1F1F1]/40 tracking-widest mb-4 md:mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Layers, {
    className: "w-4 h-4"
  }), " Expansions"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, game.expansions.map((exp, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-[#F1F1F1]/5 p-4 rounded-xl border border-[#F1F1F1]/5 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-8 bg-[#C51728] rounded-full shrink-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1] font-bold truncate pr-2"
  }, exp.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#F1F1F1]/40"
  }, "BGG: ", exp.bggRating, " \u2022 Friend: ", exp.friendRating))), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-serif-italic text-[#F1F1F1] opacity-60 shrink-0"
  }, calculateOverallAverage(exp.bggRating, calculateMyAverage(exp.baseScore, exp.subScores || {})?.value, exp.friendRating) || '-'))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-[#F1F1F1]/40 tracking-widest mb-4 md:mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Monitor, {
    className: "w-4 h-4"
  }), " External Factors"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/5 p-4 md:p-6 rounded-3xl border border-[#F1F1F1]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/40 text-xs mb-1 font-bold tracking-widest"
  }, "BGG Rating"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#F1F1F1]/30"
  }, "Community")), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl md:text-3xl font-serif-italic text-[#F1F1F1]"
  }, game.bggRating || '-')), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/5 p-4 md:p-6 rounded-3xl border border-[#F1F1F1]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[#F1F1F1]/40 text-xs mb-1 font-bold tracking-widest"
  }, "Friend Rating"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#F1F1F1]/30"
  }, "Secondary")), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl md:text-3xl font-serif-italic text-[#F1F1F1]"
  }, game.friendRating || '-'))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 p-4 bg-[#F1F1F1]/5 rounded-2xl border border-[#F1F1F1]/5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold text-[#F1F1F1]/40 tracking-widest mb-2"
  }, "How Overall is Calculated"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#F1F1F1]/60 leading-relaxed"
  }, "The Overall Score is a simple average of three main components:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "1. ", /*#__PURE__*/React.createElement("strong", null, "BGG Rating:"), " The global community rating from BoardGameGeek.", /*#__PURE__*/React.createElement("br", null), "2. ", /*#__PURE__*/React.createElement("strong", null, "My Average:"), " My personal weighted score derived from Gameplay (x10 weight) plus Portability and Aesthetics.", /*#__PURE__*/React.createElement("br", null), "3. ", /*#__PURE__*/React.createElement("strong", null, "Friend Rating:"), " The rating given by my friends who have played it.")))))));
}

// --- MAIN APP ---
function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('overall');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showMSRP, setShowMSRP] = useState(false);
  // NEW: Toggle for Games count (Owned vs All)
  const [showAllGamesCount, setShowAllGamesCount] = useState(false);

  // Filter states
  const [filterPlayers, setFilterPlayers] = useState(null);
  const [filterTime, setFilterTime] = useState(null);

  // New Request Feature States
  const [isRequestMode, setIsRequestMode] = useState(false);
  const [selectedRequestGames, setSelectedRequestGames] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      const url = GOOGLE_SHEET_URL;
      Papa.parse(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: results => {
          const rawData = results.data;

          // Process Nesting
          const gameMap = {};
          const rootGames = [];

          // First pass: Create objects
          rawData.forEach(row => {
            if (!row.Game) return;
            const game = {
              id: row.Game,
              name: row.Game,
              parent: row['Parent Game'],
              owned: row.Owned === 'TRUE',
              status: row.Status,
              dateAcquired: row['Acquired Date'],
              price: parsePrice(row.Price),
              msrp: parsePrice(row.MSRP),
              source: row.Source,
              bggRating: row['BGG Rating'],
              baseScore: row.Gameplay,
              playTime: row['Play Time'],
              minPlayers: row['Min Players'],
              maxPlayers: row['Max Players'],
              image: row['Image'],
              friendRating: row['Friend Rating'],
              subScores: {
                j: row.Portability,
                // J
                k: row.Complexity,
                // K
                m: row.Aesthetics // M
              },
              expansions: []
            };
            gameMap[game.name] = game;
            if (!game.parent) {
              rootGames.push(game);
            }
          });

          // Second pass: Nest expansions
          rawData.forEach(row => {
            if (row['Parent Game'] && gameMap[row['Parent Game']]) {
              gameMap[row['Parent Game']].expansions.push(gameMap[row.Game]);
            }
          });
          setGames(rootGames);
          setLoading(false);
        },
        error: err => {
          console.error("CSV Parse Error:", err);
          setFetchError(true);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  // Toast Logic
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Back Button Logic
  useEffect(() => {
    const onPopState = () => {
      setSelectedGame(null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // NEW: Smart Esc Key Logic
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        // Priority 1: Close Modal
        if (selectedGame) {
          handleCloseGame();
          return;
        }

        // Priority 2: Exit Request Mode
        if (isRequestMode) {
          toggleRequestMode();
          return;
        }

        // Priority 3: Clear Search
        if (searchTerm) {
          setSearchTerm('');
          return;
        }
      }
    };
    // We need to attach this to window, but we need fresh state closures.
    // Since this effect runs only on mount, we can't see updated state.
    // We'll add the event listener, but inside we need access to current state.
    // The cleanest React way is to add dependencies, but that adds/removes listeners constantly.
    // For simplicity in this single-file setup, we will use a ref or just depend on the state variables.
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedGame, isRequestMode, searchTerm]); // Re-bind when state changes to get fresh values

  const handleOpenGame = game => {
    window.history.pushState({
      modalOpen: true
    }, '', '');
    setSelectedGame(game);
  };
  const handleCloseGame = () => {
    window.history.back();
  };
  const handleToggleSelect = game => {
    if (!game.owned) return; // Guard clause just in case

    const isAlreadySelected = selectedRequestGames.find(g => g.id === game.id);
    if (isAlreadySelected) {
      setSelectedRequestGames(prev => prev.filter(g => g.id !== game.id));
    } else {
      if (selectedRequestGames.length >= REQUEST_LIMIT) {
        setToastMessage("That's heavy! I can only carry so many boxes!");
        return;
      }
      setSelectedRequestGames(prev => [...prev, game]);
    }
  };
  const toggleRequestMode = () => {
    const newMode = !isRequestMode;
    setIsRequestMode(newMode);
    if (!newMode) {
      setSelectedRequestGames([]); // Clear on exit? Or keep? User didn't specify, clearing is cleaner.
    }
  };
  const filteredGames = useMemo(() => {
    let result = games.map(game => {
      const myAvgObj = calculateMyAverage(game.baseScore, game.subScores || {});
      const overallAvg = calculateOverallAverage(game.bggRating, myAvgObj, game.friendRating);
      return {
        ...game,
        calculatedMyAvg: myAvgObj,
        calculatedOverallAvg: overallAvg
      };
    });
    if (searchTerm) {
      result = result.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    result.sort((a, b) => {
      let valA, valB;
      // Sort logic
      switch (sortBy) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'myRating':
          valA = parseFloat(a.calculatedMyAvg || 0);
          valB = parseFloat(b.calculatedMyAvg || 0);
          break;
        case 'bggRating':
          valA = parseFloat(a.bggRating || 0);
          valB = parseFloat(b.bggRating || 0);
          break;
        case 'overall':
          valA = parseFloat(a.calculatedOverallAvg || 0);
          valB = parseFloat(b.calculatedOverallAvg || 0);
          break;
        case 'complexity':
          valA = parseFloat(a.subScores?.k || 0);
          valB = parseFloat(b.subScores?.k || 0);
          break;
        case 'aesthetic':
          valA = parseFloat(a.subScores?.m || 0);
          valB = parseFloat(b.subScores?.m || 0);
          break;
        case 'portability':
          valA = parseFloat(a.subScores?.j || 0);
          valB = parseFloat(b.subScores?.j || 0);
          break;
        case 'playtime':
          valA = parseInt(a.playTime || 0);
          valB = parseInt(b.playTime || 0);
          break;
        case 'players':
          valA = parseInt(a.maxPlayers || 0);
          valB = parseInt(b.maxPlayers || 0);
          break;
        case 'date':
          valA = new Date(a.dateAcquired || 0).getTime();
          valB = new Date(b.dateAcquired || 0).getTime();
          break;
        default:
          return 0;
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    if (filterPlayers !== null) {
      result = result.filter(g => {
        const min = parseInt(g.minPlayers) || 0;
        const max = parseInt(g.maxPlayers) || 99;
        return min <= filterPlayers && max >= filterPlayers;
      });
    }
    if (filterTime !== null) {
      result = result.filter(g => {
        const t = parseInt(g.playTime) || 0;
        if (filterTime === 'quick')  return t > 0 && t <= 15;
        if (filterTime === '15-30')  return t > 15 && t <= 30;
        if (filterTime === '30-45')  return t > 30 && t <= 45;
        if (filterTime === '45-60')  return t > 45 && t <= 60;
        if (filterTime === '60+')    return t > 60;
        return true;
      });
    }
    return result;
  }, [games, searchTerm, sortBy, sortOrder, filterPlayers, filterTime]);

  // SECTION SPLITTING LOGIC
  const {
    ownedGames,
    unownedGames
  } = useMemo(() => {
    if (searchTerm) {
      // If searching, show everything in one list (as 'ownedGames' for simplicity of rendering loop)
      return {
        ownedGames: filteredGames,
        unownedGames: []
      };
    }
    return {
      ownedGames: filteredGames.filter(g => g.owned),
      unownedGames: filteredGames.filter(g => !g.owned)
    };
  }, [filteredGames, searchTerm]);
  const stats = useMemo(() => {
    const totalGames = games.length;
    // NEW: Calculate Owned games specifically for the pill
    const ownedGamesCount = games.filter(g => g.owned).length;
    let totalPrice = 0;
    let totalMSRP = 0;
    games.forEach(game => {
      totalPrice += game.price || 0;
      totalMSRP += game.msrp || 0;
      if (game.expansions && game.expansions.length > 0) {
        game.expansions.forEach(exp => {
          totalPrice += exp.price || 0;
          totalMSRP += exp.msrp || 0;
        });
      }
    });
    return {
      total: totalGames,
      owned: ownedGamesCount,
      totalPrice: showMSRP ? totalMSRP : totalPrice
    };
  }, [games, showMSRP]);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-[#1F1F1F] text-[#F1F1F1] selection:bg-[#C51728]/30 selection:text-white pb-24 md:pb-0"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "border-b border-[#F1F1F1]/5 bg-[#1F1F1F]/95 backdrop-blur-xl sticky top-0 z-40 transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 lg:py-0 lg:h-20 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl md:text-3xl font-serif-italic tracking-wide text-[#F1F1F1] text-center lg:text-left"
  }, "Aanjelo's Board Games Library")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 md:gap-3 overflow-x-auto max-w-full no-scrollbar justify-center"
  }, /*#__PURE__*/React.createElement(StatsPill, {
    icon: Icons.Hash,
    label: showAllGamesCount ? "Games incl. Archive" : "Games",
    value: showAllGamesCount ? stats.total : stats.owned,
    onClick: () => setShowAllGamesCount(!showAllGamesCount),
    className: "cursor-pointer hover:bg-[#F1F1F1]/10"
  }), /*#__PURE__*/React.createElement(StatsPill, {
    icon: Icons.DollarSign,
    label: showMSRP ? "Value (MSRP)" : "Spent",
    value: `Rs. ${stats.totalPrice.toLocaleString()}`,
    onClick: () => setShowMSRP(!showMSRP),
    className: "cursor-pointer hover:bg-[#F1F1F1]/10"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: toggleRequestMode,
    className: `px-4 py-2 rounded-full border text-sm font-bold transition-all flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center
                                        ${isRequestMode ? 'bg-[#C51728] text-white border-[#C51728] shadow-[0_0_15px_rgba(197,23,40,0.5)]' : 'bg-transparent border-[#C51728] text-[#C51728] hover:bg-[#C51728]/10'}`
  }, /*#__PURE__*/React.createElement(Icons.ShoppingBag, {
    className: "w-4 h-4"
  }), isRequestMode ? `Requests (${selectedRequestGames.length}/${REQUEST_LIMIT})` : 'Request Games')))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
  }, isRequestMode && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 bg-[#C51728]/10 border border-[#C51728]/20 text-[#C51728] px-4 py-3 rounded-xl text-center text-sm md:text-base font-medium animate-slide-up"
  }, "Tap games to select for the meetup."),
  /* Filter Chips Row */
  !isRequestMode && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 overflow-x-auto no-scrollbar mb-8 md:mb-10 -mt-2 md:-mt-4 pb-1"
  },
    /*#__PURE__*/React.createElement("span", { className: "text-[10px] text-[#F1F1F1]/30 uppercase font-bold tracking-widest shrink-0" }, "Players"),
    [2, 3, 4, 5, 8, 10, 12, 15].map(p => /*#__PURE__*/React.createElement("button", {
      key: p,
      onClick: () => setFilterPlayers(filterPlayers === p ? null : p),
      className: `px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 transition-all ${
        filterPlayers === p
          ? 'bg-[#C51728] border-[#C51728] text-white shadow-[0_0_10px_rgba(197,23,40,0.4)]'
          : 'bg-[#F1F1F1]/5 border-[#F1F1F1]/10 text-[#F1F1F1]/60 hover:bg-[#F1F1F1]/10 hover:text-white'
      }`
    }, p)),
    /*#__PURE__*/React.createElement("div", { className: "w-px h-5 bg-[#F1F1F1]/10 mx-1 shrink-0" }),
    /*#__PURE__*/React.createElement("span", { className: "text-[10px] text-[#F1F1F1]/30 uppercase font-bold tracking-widest shrink-0" }, "Time"),
    [['Quick', 'quick'], ['15–30m', '15-30'], ['30–45m', '30-45'], ['45–60m', '45-60'], ['60m+', '60+']].map(([label, val]) => /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => setFilterTime(filterTime === val ? null : val),
      className: `px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 transition-all ${
        filterTime === val
          ? 'bg-[#C51728] border-[#C51728] text-white shadow-[0_0_10px_rgba(197,23,40,0.4)]'
          : 'bg-[#F1F1F1]/5 border-[#F1F1F1]/10 text-[#F1F1F1]/60 hover:bg-[#F1F1F1]/10 hover:text-white'
      }`
    }, label)),
    (filterPlayers !== null || filterTime !== null) && /*#__PURE__*/React.createElement("button", {
      onClick: () => { setFilterPlayers(null); setFilterTime(null); },
      className: "ml-1 px-3 py-1.5 rounded-full border border-[#F1F1F1]/10 text-xs text-[#F1F1F1]/40 hover:text-white hover:border-[#F1F1F1]/30 shrink-0 transition-all"
    }, "Clear")
  ),
  /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute left-4 top-1/2 -translate-y-1/2 text-[#F1F1F1]/30 group-focus-within:text-[#C51728]"
  }, /*#__PURE__*/React.createElement(Icons.Search, null)), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search your library...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "w-full bg-[#F1F1F1]/5 border border-[#F1F1F1]/5 rounded-2xl pl-12 pr-10 py-3 md:py-4 focus:outline-none focus:ring-1 focus:ring-[#C51728] focus:bg-[#F1F1F1]/10 transition-all placeholder:text-[#F1F1F1]/30 text-base md:text-lg"
  }), searchTerm && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSearchTerm(''),
    className: "absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#F1F1F1]/30 hover:text-white transition-colors"
  }, /*#__PURE__*/React.createElement(Icons.X, null))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 shrink-0 overflow-x-auto no-scrollbar pb-1 md:pb-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/5 rounded-2xl p-1 flex items-center border border-[#F1F1F1]/5 flex-1 md:flex-auto"
  }, /*#__PURE__*/React.createElement("select", {
    value: sortBy,
    onChange: e => setSortBy(e.target.value),
    className: "bg-transparent border-none text-xs md:text-sm focus:ring-0 text-[#F1F1F1] px-3 md:px-4 py-2 cursor-pointer outline-none w-full md:w-auto"
  }, /*#__PURE__*/React.createElement("option", {
    value: "overall",
    className: "bg-[#1F1F1F]"
  }, "Overall Avg"), /*#__PURE__*/React.createElement("option", {
    value: "name",
    className: "bg-[#1F1F1F]"
  }, "Name"), /*#__PURE__*/React.createElement("option", {
    value: "date",
    className: "bg-[#1F1F1F]"
  }, "Date Acquired"), /*#__PURE__*/React.createElement("option", {
    value: "myRating",
    className: "bg-[#1F1F1F]"
  }, "My Rating"), /*#__PURE__*/React.createElement("option", {
    value: "bggRating",
    className: "bg-[#1F1F1F]"
  }, "BGG Rating"), /*#__PURE__*/React.createElement("option", {
    value: "complexity",
    className: "bg-[#1F1F1F]"
  }, "Complexity"), /*#__PURE__*/React.createElement("option", {
    value: "aesthetic",
    className: "bg-[#1F1F1F]"
  }, "Aesthetic"), /*#__PURE__*/React.createElement("option", {
    value: "portability",
    className: "bg-[#1F1F1F]"
  }, "Portability"), /*#__PURE__*/React.createElement("option", {
    value: "playtime",
    className: "bg-[#1F1F1F]"
  }, "Play Time"), /*#__PURE__*/React.createElement("option", {
    value: "players",
    className: "bg-[#1F1F1F]"
  }, "Max Players")), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-6 bg-[#F1F1F1]/10 mx-1"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc'),
    className: "p-2 hover:bg-[#F1F1F1]/10 rounded-lg transition-colors text-[#F1F1F1]/60 hover:text-white shrink-0"
  }, /*#__PURE__*/React.createElement(Icons.SortAsc, {
    className: sortOrder === 'desc' ? 'rotate-180' : ''
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F1F1F1]/5 rounded-2xl p-1 flex items-center border border-[#F1F1F1]/5 shrink-0"
  }, /*#__PURE__*/React.createElement(ViewToggle, {
    active: viewMode === 'grid',
    onClick: () => setViewMode('grid'),
    icon: Icons.LayoutGrid
  }), /*#__PURE__*/React.createElement(ViewToggle, {
    active: viewMode === 'list',
    onClick: () => setViewMode('list'),
    icon: Icons.List
  })))), fetchError ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center py-32 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-4"
  }, "\uD83D\uDCE1"), /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold text-[#F1F1F1]/80 mb-2"
  }, "Couldn\u2019t load the collection"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-[#F1F1F1]/40 max-w-xs"
  }, "There was a problem fetching the game data. Check your connection and try refreshing the page.")) : loading ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8"
  }, Array.from({length: 8}).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "border border-[#F1F1F1]/5 rounded-3xl overflow-hidden bg-[#F1F1F1]/[0.02] animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full aspect-[4/3] bg-[#F1F1F1]/5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-4 bg-[#F1F1F1]/10 rounded-full w-3/4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 pt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-6 bg-[#F1F1F1]/10 rounded-lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-6 bg-[#F1F1F1]/10 rounded-lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-6 bg-[#C51728]/10 rounded-lg"
  })))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: viewMode === 'grid' ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8" : "flex flex-col gap-3"
  }, ownedGames.map(game => /*#__PURE__*/React.createElement(GameCard, {
    key: game.id,
    game: game,
    viewMode: viewMode,
    onOpenDetail: handleOpenGame,
    isRequestMode: isRequestMode,
    isSelected: selectedRequestGames.some(g => g.id === game.id),
    onToggleSelect: handleToggleSelect
  }))), filteredGames.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "col-span-full py-24 text-center text-[#F1F1F1]/40"
  }, "No games found"), !searchTerm && unownedGames.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-16 border-t border-[#F1F1F1]/5 pt-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-serif-italic text-[#F1F1F1]/40 mb-8 text-center flex items-center justify-center gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-px bg-[#F1F1F1]/5 w-16"
  }), "Archive", /*#__PURE__*/React.createElement("span", {
    className: "h-px bg-[#F1F1F1]/5 w-16"
  })), /*#__PURE__*/React.createElement("div", {
    className: viewMode === 'grid' ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8" : "flex flex-col gap-3"
  }, unownedGames.map(game => /*#__PURE__*/React.createElement(GameCard, {
    key: game.id,
    game: game,
    viewMode: viewMode,
    onOpenDetail: handleOpenGame,
    isRequestMode: isRequestMode,
    isSelected: selectedRequestGames.some(g => g.id === game.id),
    onToggleSelect: handleToggleSelect
  })))))), toastMessage && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-24 inset-x-0 flex justify-center z-[70] pointer-events-none animate-slide-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#C51728] text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm md:text-base border border-white/10 whitespace-nowrap pointer-events-auto"
  }, toastMessage)), isRequestMode && /*#__PURE__*/React.createElement(RequestBar, {
    selectedGames: selectedRequestGames,
    onCopy: () => setToastMessage("Copied to clipboard!")
  }), selectedGame && /*#__PURE__*/React.createElement(GameDetailModal, {
    game: selectedGame,
    onClose: handleCloseGame
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));