listaProdutos = carregarProdutos()  

    if (localStorage.getItem('listaProdutos') == null){ 

    localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos))
    }

    listaProdutos = JSON.parse(localStorage.getItem('listaProdutos')) 



    function carregarTabela(){

    dadosTabela = ''

    for(i in listaProdutos){
        prod = listaProdutos[i]
        dadosTabela += `<tr onclick="editarProduto(${i})"><td>${prod.cod}</td><td>${prod.grupo}</td><td>${prod.descricao}</td><td>${prod.valor}</td><td><span onclick="moverProduto(${i}, -1)">&#9650;</span><span onclick="moverProduto(${i}, 1)">&#9660;</span></td></tr>`
    }
    document.getElementById('corpoTabela').innerHTML = dadosTabela
}

   function editarProduto(id){

       prod = listaProdutos[id]
       //alert(prod)
       document.getElementById('codigo').value = prod.cod
       document.getElementById('valor').value = prod.valor
       document.getElementById('descricao').value = prod.descricao
       document.getElementById('grupo').value = prod.grupo
       document.getElementById('categoria').value = prod.categoria
       document.getElementById('index').value = id
    }

    function novoProduto(){
        document.getElementById('formulario').reset()
        document.getElementById('index').value = ''
    }

   function gravarProduto(){
       id = document.getElementById('index').value
       prod = {quantidade: 0}
       prod.cod = document.getElementById('codigo').value
       prod.valor = document.getElementById('valor').value
       prod.descricao = document.getElementById('descricao').value
       prod.grupo = document.getElementById('grupo').value
       prod.categoria = document.getElementById('categoria').value

        if(id != ''){
            listaProdutos[id] = prod
        }else{
            listaProdutos.push(prod)
        }
        localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos))

        carregarTabela()
        novoProduto()
        }

        function apagarProduto(){ 
            id = document.getElementById('index').value
            if (id == ''){
                return
            }else if (confirm('Você realmente deseja apagar este produto?')){
                listaProdutos.splice(id, 1)
                localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos))
            }            
            carregarTabela()
            novoProduto()
         }

         function moverProduto(i, movimento){
             auxiliar = listaProdutos[i]
             listaProdutos[i] = listaProdutos[i + movimento]
             listaProdutos[i + movimento] = auxiliar
             carregarTabela()
            }

    carregarTabela()