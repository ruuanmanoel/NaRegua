import { randomUUID } from 'node:crypto'
import express, {type Request} from 'express'

const app = express();
app.use(express.json());

interface Servico {
    id: string;
    nome: string;
    preco: number;
    duracao: number;
}

interface CriarAgendamentoInput {
    servicoId: string,
    nomeCliente: string,
    inicio: string
}

interface Agendamento extends CriarAgendamentoInput {
    id: string
}

const servicos: Array<Servico> = [
  { id: randomUUID(), nome: "Corte de Cabelo", preco: 50, duracao: 30 },
  { id: randomUUID(), nome: "Barba", preco: 35, duracao: 20 },
];   

const agendamentos: Array<Agendamento> = [];

const listarServicos = () : Servico[] => servicos;
const buscarServico = (servicoId: string): Servico | undefined => servicos.find((servico) => servico.id === servicoId);

console.log(listarServicos())

app.get('/servicos', (_req, res) => {
    res.json(listarServicos());
})

app.get("/agendamentos", (_req, res) =>{
    return res.json(agendamentos);
})
app.post('/agendamentos', (req: Request<{}, unknown, CriarAgendamentoInput>, res) => {
    const {servicoId, nomeCliente, inicio} = req.body;
    const servico = buscarServico(servicoId);

    if(servico == null) {
        return res.status(404)
        .json({"message": "Serviço não encontrado."});
    }

    const novoAgendamento: Agendamento = {
        id: randomUUID(),
        servicoId,
        nomeCliente,
        inicio
    };

    agendamentos.push(novoAgendamento);

    return res.status(201).json(novoAgendamento);
})

app.listen(3000, () => {
    console.log(`Servidor escutando na porta 3000`);
})