import { Request, Response } from "express";
import { literal, Op, where, fn } from "sequelize";
import { Chat_box, initChatBoxModel } from "../model/chat_box.model";

const EvaluarTipoMayores = (tipo1: string, tipo2: string) =>
  `WHEN '${tipo1}' THEN '${tipo2}'`;

export const getChat = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const { fecha1, fecha2, zona } = data;

  if (fecha1 === undefined || fecha2 === undefined) {
    res.status(400).json("Fecha no válida");
  }

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
  }

  const empresa = zona === "39627" ? "Multired" : "Servired";
  initChatBoxModel(zona);
  try {
    const Chat = await Chat_box.findAll({
      attributes: [
        [literal(`'${empresa}'`), "EMPRESA"],
        ["id_pqr", "ID_PQR"],
        ["fecharegistro", "FECHAREGISTRO"],
        [
          literal(`
            CASE id_clase_solicitud
              ${EvaluarTipoMayores("1", "1 - Peticion")}
              ${EvaluarTipoMayores("2", "2 - Queja")}
              ${EvaluarTipoMayores("3", "3 - Reclamo")}
              ${EvaluarTipoMayores("4", "4 - Sugerencia")}
              ${EvaluarTipoMayores("5", "5 - Felicitacion")}
              ELSE 'Indefinido'
            END
          `),
          "TIPO_PQR",
        ],
        ["nombre_cliente", "CLIENTE"],
        ["cedula", "DOCUMENTO"],
        ["telefono", "TELEFONO"],
        ["email", "CORREO_ELECTRONICO"],
        ["descripcion", "DESCRIPCION"],
      ],
      where: {
        [Op.and]: [
          where(fn('DATE', literal('fecharegistro')), '>=', fecha1.slice(0, 10)),
          where(fn('DATE', literal('fecharegistro')), '<=', fecha2.slice(0, 10))
        ]
      },
      order: ["fecharegistro"],
    });
    res.status(200).json(Chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
