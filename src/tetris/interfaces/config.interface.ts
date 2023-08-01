export interface TetrisActions {
  name: string;
  description?: string;
  isSystem: boolean;
  props: Record<string, any>[];
  isGlobalAction: boolean;
  saveTetrisProps(
    actionId: string,
  ): Promise<Record<string, any>[]>;
  getTetrisProps(
    actionId: string,
  ): Promise<Record<string, any>[]>;
}

export interface Elements {
  name: string;
  description?: string;
  isSystem: boolean;
  props: Record<string, any>[];
  styleConfigurations: Record<string, any>;
  dataConfigurations: Record<string, any>;
  isGlobalAction: boolean;
  saveElementProps(
    actionId: string,
  ): Promise<Record<string, any>>;
  getElementProps(
    actionId: string,
  ): Promise<Record<string, any>>;
}

export interface Tetris {
  name: string;
  description?: string;
  props?: Record<string, any>[];
  actions: TetrisActions[];
  elements: Elements[];
}
