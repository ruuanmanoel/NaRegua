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
const validarDadosAgendamento = (dado: unknown) : dado is CriarAgendamentoInput => { 

    // Verifica se o dado é um objeto e se é diferente de null
    if (typeof dado !== 'object' || dado === null) return false;

    // Verifica se o objeto possui as propriedades esperadas
    if (!("servicoId" in dado) ||
        !("nomeCliente" in dado) ||
        !("inicio" in dado) 
    ) return false;

    // Verifica os tipos do dado para ver se bate com a interface
    if (typeof dado.inicio !== "string" ||
        typeof dado.nomeCliente !== "string" ||
        typeof dado.servicoId !== "string"
    ) return false;

    // Verifica se o dado não possui atributos vazio
    if (dado.inicio.trim().length === 0 ||
        dado.nomeCliente.trim().length === 0 ||
        dado.servicoId.trim().length === 0
    ) return false;


    const dataInicio = new Date(dado.inicio);
    if (Number.isNaN(dataInicio.getTime())) return false;

    return true;

} 

app.get('/servicos', (_req, res) => {
    res.json(listarServicos());
})

app.get("/agendamentos", (_req, res) =>{
    return res.json(agendamentos);
})
app.post('/agendamentos', (req: Request<{}, unknown, unknown>, res) => {
    
    // Verifica se os dados enviados são validos 
    if(!validarDadosAgendamento(req.body)) {
        return res.status(400).json({
            message: "Dados do agendamento são invalidos."
        })
    }

    const {servicoId, nomeCliente, inicio} = req.body;
    const servico = buscarServico(servicoId);

    // Verifica se o id do serviço existe.
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