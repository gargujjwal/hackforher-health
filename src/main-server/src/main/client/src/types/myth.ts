export interface Source {
  name: string;
  href: string;
}

export interface Myth {
  id: string;
  myth: string;
  reality: string;
  explanation: string;
  source: Source;
}
