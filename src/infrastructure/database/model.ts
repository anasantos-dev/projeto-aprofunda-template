import { model, Schema } from 'mongoose'

const DespesaSchema = new Schema({
    descricao: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    data: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }

})

export const DespesaModel = model('despesas', DespesaSchema)