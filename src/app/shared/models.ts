export interface Acao {
    id?: number;
    nome: string;
    descricao: string;
    ativo: any;
}

export interface Objeto {
    nome: string;
    acoes: Acao[];
}

export interface Departamento {
    id?: number;
    nome: string;
    acoes: Acao[];
    funcionarios?: Funcionario[];
}

export interface Cep {
    id: number;
    numero: string;
    uf: string;
    cidade: string;
}

export interface Endereco {
    id: number;
    cep: Cep;
    bairro: string;
    logradouro: string;
    numero?: string;
    complemento?: string;
}

export interface Pessoa {
    id?: number;
    sexo: string;
    dataNascimento: Date;
    nome: string;
    rg: string;
    cpf: string;
    telefone: string;
    email: string;
    endereco: Endereco;
}

export interface PessoaNewDTO {
    urlFoto?: string;
    ssn: string;
    nome: string;
    sobreNome: string;
    telefone: string;
    ocultarTelefone: number;
    email: string;
    senha: string;
    idZipCode: number;
    rua: string;
    numero: string;
    complemento: string;
}

export interface Funcionario {
    id?: number;
    pessoa: Pessoa;
    login: string;
    ativo: boolean;
    dataCriacao: Date;
    dataAtualizacao: Date;
    departamentos: Departamento[];
}

export interface Especialidade {
    id?: number;
    nome: string;
}

export interface Medico {
    id?: number;
    ativo: boolean;
    ufCrm: string;
    crm: string;
    especialidades?: Especialidade[];
    pessoa: Pessoa;
}

export interface Paciente {
    id?: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
    pessoa: Pessoa;
}

export interface Prontuario {
    id?: number;
    numero: number;
    paciente: Paciente;
    especialidade: Especialidade;
}
