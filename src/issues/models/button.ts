const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type Size = (typeof sizes)[number];

export interface FabButton {
  icon: string;
  color?: string;
  size?: Size;
  action: () => void;
}
