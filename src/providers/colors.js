const colors = [
  { half: "rgb(0, 0, 255)", value: "rgba(0, 0, 255, .5)", name: "Blue" },
  { half: "rgb(0, 128, 0)", value: "rgba(0, 128, 0, .5)", name: "Green" },
  { half: "rgb(255, 0, 0)", value: "rgba(255, 0, 0, .5)", name: "Red" },
  {
    half: "rgb(128, 128, 128)",
    value: "rgba(128, 128, 128, .5)",
    name: "Gray",
  },
  { half: "rgb(0, 255, 255)", value: "rgba(0, 255, 255, .5)", name: "Aqua" },
  {
    half: "rgb(255, 0, 255)",
    value: "rgba(255, 0, 255, .5)",
    name: "Fuchsia",
  },
  { half: "rgb(0, 255, 0)", value: "rgba(0, 255, 0, .5)", name: "Lime" },
  {
    half: "rgb(255, 255, 0)",
    value: "rgba(255, 255, 0, .5)",
    name: "Yellow",
  },
  { half: "rgb(0, 128, 128)", value: "rgba(0, 128, 128, .5)", name: "Teal" },
  {
    half: "rgb(192, 192, 192)",
    value: "rgba(192, 192, 192, .5)",
    name: "Silver",
  },
  { half: "rgb(0, 0, 128)", value: "rgba(0, 0, 128, .5)", name: "Navy" },
  { half: "rgb(128, 0, 0)", value: "rgba(128, 0, 0, .5)", name: "Maroon" },
  { half: "rgb(128, 128, 0)", value: "rgba(128, 128, 0, .5)", name: "Olive" },
  { half: "rgb(0, 0, 0)", value: "rgba(0, 0, 0, .5)", name: "Black" },
  {
    half: "rgb(128, 0, 128)",
    value: "rgba(128, 0, 128, .5)",
    name: "Purple",
  },
  {
    half: "rgb(240, 248, 255)",
    value: "rgba(240, 248, 255, .5)",
    name: "Aliceblue",
  },
  {
    half: "rgb(250, 235, 215)",
    value: "rgba(250, 235, 215, .5)",
    name: "Antiquewhite",
  },
  {
    half: "rgb(127, 255, 212)",
    value: "rgba(127, 255, 212,.5)",
    name: "Aquamarine",
  },
  {
    half: "rgb(240, 255, 255)",
    value: "rgba(240, 255,255, .5)",
    name: "Azure",
  },
  {
    half: "rgb(245, 245, 220)",
    value: "rgba(245, 245,220, .5)",
    name: "Beige",
  },
  {
    half: "rgb(255, 228, 196)",
    value: "rgba(255, 228,196, .5)",
    name: "Bisque",
  },
  {
    half: "rgb(255, 235, 205)",
    value: "rgba(255, 235,205, .5)",
    name: "Blanchedalmond",
  },
  {
    half: "rgb(138, 43, 226)",
    value: "rgba(138,43, 226, .5)",
    name: "Blueviolet",
  },
  { half: "rgb(165, 42, 42)", value: "rgba(165,42, 42, .5)", name: "Brown" },
  {
    half: "rgb(222, 184, 135)",
    value: "rgba(222, 184,135, .5)",
    name: "Burlywood",
  },
  {
    half: "rgb(95, 158, 160)",
    value: "rgba(95, 158,160, .5)",
    name: "Cadetblue",
  },
  {
    half: "rgb(127, 255, 0)",
    value: "rgba(127, 255,0, .5)",
    name: "Chartreuse",
  },
  {
    half: "rgb(210, 105, 30)",
    value: "rgba(210, 105,30, .5)",
    name: "Chocolate",
  },
  {
    half: "rgb(255, 127, 80)",
    value: "rgba(255, 127,80, .5)",
    name: "Coral",
  },
  {
    half: "rgb(100, 149, 237)",
    value: "rgba(100, 149, 237,.5)",
    name: "Cornflowerblue",
  },
  {
    half: "rgb(255, 248, 220)",
    value: "rgba(255, 248,220, .5)",
    name: "Cornsilk",
  },
  {
    half: "rgb(220, 20, 60)",
    value: "rgba(220, 20, 60,.5)",
    name: "Crimson",
  },
  { half: "rgb(0, 255, 255)", value: "rgba(0, 255, 255,.5)", name: "Cyan" },
  { half: "rgb(0, 0, 139)", value: "rgba(0, 0, 139, .5)", name: "Darkblue" },
  {
    half: "rgb(0, 139, 139)",
    value: "rgba(0, 139, 139, .5)",
    name: "Darkcyan",
  },
  {
    half: "rgb(184, 134, 11)",
    value: "rgba(184, 134, 11, .5)",
    name: "Darkgoldenrod",
  },
  {
    half: "rgb(169, 169, 169)",
    value: "rgba(169, 169, 169,.5)",
    name: "Darkgray",
  },
  { half: "rgb(0, 100, 0)", value: "rgba(0, 100, 0, .5)", name: "Darkgreen" },
  {
    half: "rgb(169, 169, 169)",
    value: "rgba(169, 169, 169, .5)",
    name: "Darkgrey",
  },
  {
    half: "rgb(189, 183, 107)",
    value: "rgba(189, 183, 107, .5)",
    name: "Darkkhaki",
  },
  {
    half: "rgb(139, 0, 139)",
    value: "rgba(139, 0, 139, .5)",
    name: "Darkmagenta",
  },
  {
    half: "rgb(85, 107, 47)",
    value: "rgba(85, 107, 47, .5)",
    name: "Darkolivegreen",
  },
  {
    half: "rgb(255, 140, 0)",
    value: "rgba(255, 140, 0,.5)",
    name: "Darkorange",
  },
  {
    half: "rgb(153, 50, 204)",
    value: "rgba(153, 50, 204,.5)",
    name: "Darkorchid",
  },
  { half: "rgb(139, 0, 0)", value: "rgba(139, 0, 0, .5)", name: "Darkred" },
  {
    half: "rgb(233, 150, 122)",
    value: "rgba(233, 150, 122, .5)",
    name: "Darksalmon",
  },
  {
    half: "rgb(143, 188, 143)",
    value: "rgba(143, 188, 143,.5)",
    name: "Darkseagreen",
  },
  {
    half: "rgb(72, 61, 139)",
    value: "rgba(72, 61, 139,.5)",
    name: "Darkslateblue",
  },
  {
    half: "rgb(47, 79, 79)",
    value: "rgba(47, 79, 79,.5)",
    name: "Darkslategray",
  },
  {
    half: "rgb(47, 79, 79)",
    value: "rgba(47, 79, 79,.5)",
    name: "Darkslategrey",
  },
  {
    half: "rgb(0, 206, 209)",
    value: "rgba(0, 206, 209,.5)",
    name: "Darkturquoise",
  },
  {
    half: "rgb(148, 0, 211)",
    value: "rgba(148, 0, 211,.5)",
    name: "Darkviolet",
  },
  {
    half: "rgb(255, 20, 147)",
    value: "rgba(255, 20, 147,.5)",
    name: "Deeppink",
  },
  {
    half: "rgb(0, 191, 255)",
    value: "rgba(0, 191, 255,.5)",
    name: "Deepskyblue",
  },
  {
    half: "rgb(105, 105, 105)",
    value: "rgba(105, 105,105, .5)",
    name: "Dimgray",
  },
  {
    half: "rgb(105, 105, 105)",
    value: "rgba(105, 105,105, .5)",
    name: "Dimgrey",
  },
  {
    half: "rgb(30, 144, 255)",
    value: "rgba(30, 144,255, .5)",
    name: "Dodgerblue",
  },
  {
    half: "rgb(178, 34, 34)",
    value: "rgba(178, 34,34, .5)",
    name: "Firebrick",
  },
  {
    half: "rgb(255, 250, 240)",
    value: "rgba(255, 250,240, .5)",
    name: "Floralwhite",
  },
  {
    half: "rgb(34, 139, 34)",
    value: "rgba(34, 139,34, .5)",
    name: "Forestgreen",
  },
  {
    half: "rgb(220, 220, 220)",
    value: "rgba(220,220, 220, .5)",
    name: "Gainsboro",
  },
  {
    half: "rgb(248, 248, 255)",
    value: "rgba(248,248, 255, .5)",
    name: "Ghostwhite",
  },
  { half: "rgb(255, 215, 0)", value: "rgba(255,215, 0, .5)", name: "Gold" },
  {
    half: "rgb(218, 165, 32)",
    value: "rgba(218, 165,32, .5)",
    name: "Goldenrod",
  },
  {
    half: "rgb(128, 128, 128)",
    value: "rgba(128, 128,128, .5)",
    name: "Grey",
  },
  {
    half: "rgb(173, 255, 47)",
    value: "rgba(173, 255, 47,.5)",
    name: "Greenyellow",
  },
  {
    half: "rgb(240, 255, 240)",
    value: "rgba(240, 255,240, .5)",
    name: "Honeydew",
  },
  {
    half: "rgb(255, 105, 180)",
    value: "rgba(255, 105,180, .5)",
    name: "Hotpink",
  },
  {
    half: "rgb(205, 92, 92)",
    value: "rgba(205, 92, 92,.5)",
    name: "Indianred",
  },
  { half: "rgb(75, 0, 130)", value: "rgba(75, 0, 130,.5)", name: "Indigo" },
];

export default colors;
