function addProduto(i, add){
    prod = listaProdutos[i]
    prod.quantidade += add

    if(prod.quantidade < 0){
        return
    }

    let valorAtual = prod.quantidade * prod.valor
    document.getElementById(`parcial-${i}`).innerHTML = `R$ ${Number(valorAtual).toFixed(2)} (x${prod.quantidade})`
}

listaProdutos = carregarProdutos()

    if (localStorage.getItem('listaProdutos') == null){
        localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos))
    }

    listaProdutos = JSON.parse(localStorage.getItem('listaProdutos')) 

function carregarProduto(){
    let grupoAtual = ''

    for(i in listaProdutos){
        console.log(i)
        prod = listaProdutos[i]

        if (grupoAtual != prod.grupo){
            grupoAtual = prod.grupo
            h2 = document.createElement('h2')
            h2.innerHTML = `${prod.grupo} <span>${prod.categoria}</span>`
            document.getElementById('conteudo').appendChild(h2)
        }
        let produto = document.getElementsByClassName('item-produto')[0].cloneNode(true)

        if (prod.cod != ''){
        produto.getElementsByClassName('adicionais')[0].remove()
        produto.getElementsByClassName('cod-produto')[0].innerHTML = prod.cod        
        
        }else{
            produto.getElementsByClassName('produto')[0].remove()
            
        }
        produto.getElementsByClassName('valor-produto')[0].innerHTML = `R$ ${prod.valor}`
        produto.getElementsByClassName('desc-produto')[0].innerHTML = prod.descricao        
        document.getElementById('conteudo').appendChild(produto)

        let btMais = produto.getElementsByClassName('bt-mais')[0]
        btMais.setAttribute("onclick", `addProduto(${i}, 1)`)

        let btMenos = produto.getElementsByClassName('bt-menos')[0]
        btMenos.setAttribute("onclick", `addProduto(${i}, -1)`)

        produto.getElementsByClassName('valor-parcial')[0].setAttribute("id", `parcial-${i}`)
    }
        document.getElementsByClassName("item-produto")[0].setAttribute('style', 'display: none;')

        localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos))
}

carregarProduto()

acc = document.getElementsByClassName("produto")
carregarEvento(acc)
acc = document.getElementsByClassName("adicionais")
carregarEvento(acc)

function carregarEvento(acc){
    for(i = 0; i < acc.length; i++){
        temp= acc[i]
        temp.addEventListener("click", function(){
        let painel = this.nextElementSibling
        if ( painel.style.display == 'block'){
            painel.style.display = 'none'
        }else{
            painel.style.display = 'block'
        }
    })
    }   
}

 let botaoEnviar = document.getElementById('enviar')
 botaoEnviar.addEventListener("click", function(){
     let modal = document.getElementById('modal-enviar')
     let msg = ''
     let total = 0

     for(i in listaProdutos){
         prod = listaProdutos[i]

        if(prod.quantidade > 0){
            totalProduto = (prod.quantidade * prod.valor).toFixed(2)
            total += Number(totalProduto)
            msg += `Cód ${prod.cod} - ${prod.quantidade} x ${prod.valor} = ${totalProduto} <br>`
        }
     }
     if (total == 0){
         msg += 'Escolha ao menos 1 produto!'
    }else{
        msg += `Total dos Produtos = ${total.toFixed(2)}<br>`
        pedido = msg
        msg += `<div id="complemento-envio">
                <input type="text" name="nome" id="nome" placeholder="Digite o seu Nome, Por Favor">
                <br>
                <input type="text" name="endereco" id="endereco" placeholder="Digite o seu Endereço, Por Favor">
                <span>Clique no botão CONTINUAR para enviar seu pedida via WHATSAPP</span>
                </div> `

    let rodape = document.getElementById('rodape-modal')
    rodape.innerHTML = ` <button type="button" onclick="continuar()">CONTINUAR</button>`
    }  
     document.getElementsByClassName('corpo-modal')[0].innerHTML = msg
     modal.style.display = "block"

     if (total == 0){
        complemento = document.getElementById('complemento-envio')
        complemento.style.display = 'none'
    }else{
        complemento = document.getElementById('complemento-envio')
        complemento.style.display = 'block'
    }         
 })

function continuar(){
    nome = document.getElementById('nome')
    
    if(nome.value == ''){
        alert('Digite o seu nome!')
    }else{
        fone = '5561986796746'
        nome = document.getElementById('nome').value
        endereco = document.getElementById('endereco').value
        pedido = `Olá meu nome é ${nome}. Desejo fazer o seguinte pedido: ${pedido}`
        pedido += (endereco != '') ? `Meu endereço é ${endereco} ` : ''
        
        pedido = pedido.replaceAll('<br>', '\n')
        pedido = encodeURI(pedido)
        link = `https://api.whatsapp.com/send?phone=${fone}&text=${pedido}`
        console.log(link)
        window.open(link, '_blanck')
    }
}

    botaoEnviar = document.getElementById('fechar-modal')
    botaoEnviar.addEventListener("click", function(){
        modal = document.getElementById('modal-enviar')
        modal.style.display = 'none'
 }) 
