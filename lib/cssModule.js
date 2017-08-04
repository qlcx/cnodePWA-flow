declare module CSSModule {
  declare var exports: { [key: string]: string }
}

declare module 'CSSModule' {
  declare var exports: { [key: string]: string };
}

declare module './Sider.css' {
  declare var exports: { [key: string]: string };
}