const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))",
        green: "#2ca200", // 9x
        darkGreen: "#008e00", // 4x
        lightGreen: "#dbf1d5", // 1x

        red: "#d9534f", // 13x
        darkRed: "#b92c28", // 0x
        lightRed: "#f2dede", // 0x

        blue: "#00a9ff", // 34x primary focus info link
        darkBlue: "#2a6496", // 2x
        lightBlue: "#d9f2ff", // 2x

        yellow: "#efc100", // 3x

        chartPink: "#FF6384",
        chartBlue: "#36A2EB",
        chartYellow: "#FFCE56",
        chartTeal: "#4BC0C0",

        blueButtonAccent: "#0098e6",
        redButtonAccent: "#d43b37",
        greenButtonAccent: "#289200",
        yellowButtonAccent: "#d7ae00",
        greyButtonAccent: "#bcbcbc",

        white: "#ffffff", // 30x
        grey00: "#fbfbfb", // 7x whiteSmokeVeryLight
        grey10: "#f5f5f5", // 8x whiteSmokeLight
        grey20: "#ebebeb", // 16x whiteSmokeTight' & 'whiteSmokeDark' was invented by me.
        grey30: "#cccccc", // 55x border -> veryLightGrey
        grey40: "#aaaaaa", // 1x shimmer
        grey50: "#999999", // 28x textMuted,label -> nobel
        grey60: "#666666", // 6x dimGray
        grey80: "#333333", // 15x text -> nightRider
        grey90: "#1a1a1a",
        black: "#000000", // heading

        border: {
          default: "hsl(var(--border))",
          danger: "#dca7a7",
          success: "#b2dba1",
          info: "#9acfea",
          warning: "#f5e79e",
        },
        background: {
          default: "hsl(var(--background))",
          danger: "#f2dede",
          success: "#dff0d8",
          info: "#d8ecf6",
          warning: "#fcf8e3",
        },
        borderTop: {
          danger: "#e4b9c0",
          success: "#c2deb7",
          info: "#aedde6",
          warning: "#f7e1b5",
        },
        gradient: {
          danger: "#e4b9c0",
          success: "#c8e5bc",
          info: "#b8def0",
          warning: "#f8efc0",
        },
        color: {
          danger: "#a94442",
          success: "#3c763d",
          info: "#31708f",
          warning: "#8a6d3b",
        },
      },
      spacing: {
        none: "0px",
        auto: "auto",
        xxxl: "96px", // BASE_SPACE * 2
        xxl: "48px", // BASE_SPACE
        xl: "24px", // BASE_SPACE / 2
        lg: "16px", // BASE_SPACE / 3
        md: "12px", // BASE_SPACE / 4
        sm: "6px", // BASE_SPACE / 8
        xs: "3px", // BASE_SPACE / 16
        xxs: "1px", // BASE_SPACE / 48
      },
      borderWidth: {
        none: "0px",
        xs: "1px",
        sm: "2px",
        lg: "3px",
        xl: "5px",
      },
      borderRadius: {
        none: "0px",
        xxs: "2px",
        xs: "4px",
        sm: "5px",
        lg: "10px",
      },
      fontSize: {
        xxs: "8px",
        xs: "13px",
        sm: "14px",
        md: "17px",
        lg: "19px",
        xl: "21px",
        xxl: "30px",
        xxxl: "38px",
        xxxxl: "51px",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
      lineHeight: {
        standard: "1.42857143",
        large: "1.1",
      },
      fontFamily: {
        arrrrial: ['"ARRrrrialWeb"', "sans-serif"],
        arrrrrmo: ['"ARRrrrmoji-Web"', "sans-serif"],
      },
      height: {
        13: "52px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
