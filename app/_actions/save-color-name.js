"use server";

import { prisma } from "@/lib/prisma";
export const saveColorName = async (colorHex, name) => {
  console.log("color hex: ", colorHex);
  console.log("name: ", name);

  await prisma.colorName.create({
    data: {
      hex: colorHex,
      name,
    },
  });
};
