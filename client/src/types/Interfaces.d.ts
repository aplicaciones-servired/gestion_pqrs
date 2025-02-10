export interface User {
  id: string;
  names: string,
  lastnames: string,
  username: string,
  email: string,
  company: string,
  process: string,
  sub_process: string,
}


export interface chat_bot {
  EMPRESA:            string;
  ID_PQR:             number;
  FECHAREGISTRO:      Date;
  TIPO_PQR:           string;
  CLIENTE:            string;
  DOCUMENTO:          number;
  TELEFONO:           string;
  CORREO_ELECTRONICO: string;
  DESCRIPCION:        string;
}
