import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "../auth/decorators";
import { PrismaHealthIndicator } from "./prisma.health";

@Public()
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private prismaHealthIndicator: PrismaHealthIndicator,
  ) {}

  @Get("/")
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.memory.checkHeap(
          "memory_heap",
          150 * 1024 * 1024,
        ),
      () => this.prismaHealthIndicator.isHealthy("db"),
    ]);
  }
}
