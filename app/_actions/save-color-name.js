"use server";

import { prisma } from "@/lib/prisma";

export const saveColorName = async (colorHex, name) => {
  const record = await prisma.colorName.create({
    data: {
      hex: colorHex,
      name,
    },
  });
  console.log("saved color name: ", record);
};
