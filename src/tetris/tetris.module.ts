import { Module } from "@nestjs/common";
import { TetrisService } from "./services/tetris.service";

@Module({
  providers: [TetrisService],
  exports: [TetrisService],
})
export class TetrisModule {
  constructor() {}
}
