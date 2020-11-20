const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let funcionario = models.Funcionario;
let empresa = models.Empresa;
let fun_Emp = models.Funcionario_Empresa;
let produto = models.Produto;
let cliente = models.Cliente;
let operacao = models.Operacao;

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Funcionando :)');
});

//Autentica Usuario
app.post('/login', async(req,res)=>{
    let response = await funcionario.findOne({
        where:{cpf:req.body.cpf, senha:req.body.senha}
    });
    if(response === null){
        res.send(JSON.stringify('error'))
    }else{
        res.send(response);
    }
});

//Libera Funcionario
app.post('/autoFuncionario', async(req,res) =>{
    // await empresa.create({
    //     idFuncionario:req.body.cpfF
    // });
    // if(response === null){
    //     res.send(JSON.stringify('Não foi Possivel Cadastra Funcionario '))
    // }else{
    //     res.send(JSON.stringify('Autorização Realizada com Sucesso')) 
    // }
    console.log(req.body);
});
//Cadastrar Funcionario
app.post('/cadFuncionario', async(req,res) =>{
    let response = await empresa.findOne({
        where:{idFuncionarios:req.body.cpf}
    });
    if(response === null){
        res.send(JSON.stringify('Voce não tem Permição de Cadastra-se nesta Empresa '))
    }else{
        await funcionario.create({
            nome: req.body.nome,   
            email: req.body.email,   
            senha: req.body.senha,   
            cpf: req.body.cpf,
        });  
        res.send(JSON.stringify('Cadastro Realizado com Sucesso')) 
    }
    console.log(req.body);
});

//Edita Informações do Usuario
app.post('/editInfoUser', async(req,res) =>{
    let response = await funcionario.findOne({
        where:{id:req.body.id, senha:req.body.senhaAntiga}
    });
    if(response === null){
        res.send(JSON.stringify('Incompatibilidade com a Senha Antiga '))
    }else{
        response.senha = req.body.novaSenha;
        response.save()
        res.send(JSON.stringify('Senha Atualizada'));
    }
    //console.log(req.body);
});

//Busca Produtos no Banco
app.post('/buscaProduto', async(req,res) =>{
    let idEmpresa = req.body.idEmpresa
    const response = await produto.findAll({
        attributes:['id','nomeProduto','quantidade','valor','nomeFornecedor']
    })
    if(response === null){
        res.send(JSON.stringify('Erro ao trazer dados do Banco'))
    }else{
        res.send(response);
    }
    //console.log(req.body);
    //const users = await produto.findAll();
    //console.log("All users:", JSON.stringify(response, null, 2));
});

//Cadastra Produto no Banco
app.post('/createProduto', async(req,res) =>{
    let idProduto='';
    await produto.create({
        codigo: req.body.codigoProd,
        nomeProduto: req.body.nomeProd,
        quantidade: req.body.quantidadeProd,
        descricao: req.body.descricaoProd,
        valor: req.body.valorProd,
        nomeFornecedor: req.body.nomeFor,
        cnpjFornecedor: req.body.cnpjFor,
        telefone: req.body.telefoneFor,
        email: req.body.emailFor,
        endereco: req.body.enderecoFor,
        idFuncionarios: req.body.idFun,
    }).then((response) =>{
        idProduto+=response.id;
    });
    //Cadastra Operações
    await operacao.create({
        //idProduto: idProduto,
        nomeProduto: req.body.nomeProd,   
        quantidade: req.body.quantidadeProd,   
        valor: req.body.valorProd,   
        idFuncionario: req.body.idFun,   
        dataHora: req.body.dataHora,   
        //idEmpresa: req.body.idEmpresa,   
        //imgProduto: req.body.imgProduto,   
    });
     //console.log(req.body);
});

//Cadastra Cliente no Banco
app.post('/createCliente', async(req,res) =>{
    await cliente.create({
        nomeCliente: req.body.nomeClie,
        cpfCnpj: req.body.cpfCnpjClie,
        //imgClie: req.body.imgClie,
        email: req.body.emailClie,
        telefone: req.body.telefoneClie,
        endereco: req.body.enderecoClie,
        idFuncionario: req.body.idFun,
    })
    // console.log(req.body);
});

//Busca Cliente no Banco
app.post('/buscaCliente', async(req,res) =>{
    let idEmpresa = req.body.idEmpresa
    const response = await cliente.findAll({
        attributes:['id','nomeCliente','cpfCnpj']
    })
    if(response === null){
        res.send(JSON.stringify('Erro ao trazer dados do Banco'))
    }else{
        res.send(response);
    }
    //console.log(req.body);
});

//Busca Operacao no Banco
app.post('/buscaOperacao', async(req,res) =>{
    let idEmpresa = req.body.idEmpresa
    const response = await operacao.findAll({
        attributes:['id','nomeProduto','valor','quantidade','idFuncionario','dataHora']
    })
    if(response === null){
        res.send(JSON.stringify('Erro ao trazer dados do Banco'))
    }else{
        res.send(response);
    }
    //console.log(req.body);
});

//Busca Operacao no Banco
app.post('/carrinho', async(req,res) =>{
    // let idEmpresa = req.body.idEmpresa
    // const response = await operacao.findAll({
    //     attributes:['id','nomeProduto','valor','quantidade','idFuncionario','dataHora']
    // })
    // if(response === null){
    //     res.send(JSON.stringify('Erro ao trazer dados do Banco'))
    // }else{
    //     res.send(response);
    // }
    console.log(req.body);
    //const users = await produto.findAll();
    //console.log("All users:", JSON.stringify(response, null, 2));
});

