export interface RouteStats {
  duration: number;
  speeds: {name: string, value: number}[];
  distance: number;
  globalSpeed: number
}
