import { randomUUID } from 'node:crypto'
interface Servico {
    id: string;
    nome: string;
    preco: number;
    duracao: number;
}

const servicos: Array<Servico> = [
  { id: randomUUID(), nome: "Corte de Cabelo", preco: 50, duracao: 30 },
  { id: randomUUID(), nome: "Barba", preco: 35, duracao: 20 },
];   

const listarServicos = () : Servico[] => servicos;

console.log(listarServicos());
