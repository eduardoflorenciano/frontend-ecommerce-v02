// Emitido após o cadastro. O back não devolve token no cadastro, então o login
// é feito logo em seguida com as mesmas credenciais.
export interface CadastroConcluido {
  id: number;
  nome: string;
  telefone: string;
  senha: string;
}

export class Logindatailsmodel {
  nome?: string;
  telefone?: string;
  senha?: string;
  confirmarSenha?: string;
}
