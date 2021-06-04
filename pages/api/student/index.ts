import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Student } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await handleGET(req, res);
      break;
    case "POST":
      await handlePOST(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
async function handlePOST(req: NextApiRequest, res: NextApiResponse<any>) {
  const studentData: Student = req.body;
  const result = await prisma.student.create({
    data: studentData,
  });
  res.json(result);
}

async function handleGET(req: NextApiRequest, res: NextApiResponse<any>) {
  const studentsData = await prisma.student.findMany({ select: { spuId: true, firstName: true, lastName: true } })
  const students = studentsData.map((sD) => {
    return {
      "spuId": sD.spuId,
      "name": sD.firstName + " " + sD.lastName
    }
  })

  res.json(students)
}
