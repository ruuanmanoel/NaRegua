import { randomUUID } from 'node:crypto'
import express from 'express'

const app = express();

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


app.get('/servicos', (_req, res) => {
    res.json(listarServicos());
})

app.listen(3000, () => {
    console.log(`Servidor escutando na porta 3000`);
})