export {};
declare module '@mui/material' {
  interface PropsColorOverrides {
    alert: true;
    orange: true;
    green: true;
    primary_variant: true;
    w_high: true;
    white: true;
    white_transparent: true;
  }

  interface Palette {
    alert?: Palette['primary'];
    orange?: Palette['primary'];
    green?: Palette['primary'];
    primary_variant?: Palette['primary'];
    w_high?: Palette['primary'];
    white?: Palette['primary'];
    white_transparent?: Palette['primary'];
  }

  interface PaletteOptions {
    alert?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    primary_variant?: PaletteOptions['primary'];
    w_high?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    white_transparent?: PaletteOptions['primary'];
  }

  interface CheckboxPropsColorOverrides extends PropsColorOverrides {}
  interface ButtonPropsColorOverrides extends PropsColorOverrides {}
  interface SvgIconPropsColorOverrides extends PropsColorOverrides {}
  interface IconButtonPropsColorOverrides extends PropsColorOverrides {}
}
