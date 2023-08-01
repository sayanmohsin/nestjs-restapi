import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpsertAddressDto } from "../dto";
import { isNull, omit, omitBy } from "lodash";

@Injectable({})
export class AddressService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  upsertOrGetAddress(
    addressUpsertRawData: UpsertAddressDto,
  ) {
    const addressId: string | null =
      addressUpsertRawData.addressId;
    const addressUpsertData = omit(addressUpsertRawData, [
      "addressId",
    ]);

    if (addressId && addressUpsertData) {
      const addressUpdateData = omitBy(
        addressUpsertData,
        isNull,
      );
      return this.prismaService.address.update({
        where: {
          addressId,
        },
        data: addressUpdateData,
      });
    } else if (!addressId && addressUpsertData) {
      return this.prismaService.address.create({
        data: addressUpsertData,
      });
    } else {
      return this.prismaService.address.findUnique({
        where: {
          addressId,
        },
      });
    }
  }
}
