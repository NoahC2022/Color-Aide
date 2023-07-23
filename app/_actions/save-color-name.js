"use server";

import { prisma } from "@/lib/prisma";
export const saveColorName = async (colorHex, name) => {
  console.log("color hex: ", colorHex);
  console.log("name: ", name);

  const record = await prisma.colorName.create({
    data: {
      hex: colorHex,
      name,
    },
  });
  console.log("saved color name: ", record);
};
