sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library, JSONModel) {
    // estancia da classe.
    "use strict";
    var urlObject = library.URLHelper;
    return Controller.extend("googleimagens.controller.Inicial", {
      onInit: function () {
        //onInit equivale a INITIALIZATION no ABAP
        let produto = {};
        let productModel = new JSONModel(produto); //Inicialização / Model é responsavel para exibir as variaveis na tela
        let view = this.getView();

        view.setModel(productModel, "ModeloProduto");
        /*this.produto = {
          nome: "margarina",
          marca: "doriana",
          peso: 500,
          uom: "G",
          estoque: 12,
          adicionarEstoque: function () {
            this.estoque++;
            return this.estoque + " Unidades em Estoque";
          },
        };*/
      },

      onClickImagem: function (oEvent) {
        urlObject.redirect(oEvent.getSource().getSrc(), true);
      },
      onPressBuscar: function () {
        /*//alert("Nasceu meu Aplicativo SAP Fiori!!");
        //Variaveis.
        var material = "Coca Cola";
        var unidades = 10;
        var peso = 1.8;
        //lista = tabela interna no abap
        let listaCompras = ["Pão", "Leite", "Banana", "Maça"];

        //Objetos = equivale a estrutura no abap.

        var total = this.produto.adicionarEstoque();
        alert(total);*/
        //Instancia o objeto input na variavel
        let inputBusca = this.byId("inpBusca");
        // coleta o valor digitado no input
        let valor = inputBusca.getValue();
        //exibe na tela
        //alert(valor);

        let parameters = {
          url: "https://world.openfoodfacts.org/api/v2/product/" + valor,
          method: "GET",
          async: true,
          crossDomain: true,
        };

        //Comando AJAX - conjunto de comandos // done = encerrar com sucesso.
        $.ajax(parameters)
          .done(
            function (response) {
              let oProdutoModel = this.getView().getModel("ModeloProduto");
              //clear
              oProdutoModel.setData({});
              oProdutoModel.refresh();
              oProdutoModel.setData(response);
              oProdutoModel.refresh();
            }.bind(this)
          )
          .fail(
            function () {
              debugger;
            }.bind(this)
          ); //exception.

        //tratar o retorno com promisse
        // promisse = quando um funçao retorna com parametro de exportação outra função

        //variavel tipo texto = com aspas
        let material = "Agua Mineral Natural";
        //variavel de tipo numerico inteiro
        let peso = 500;
        let uom = "ml";
        //numerico com casas decimais
        let qtd_sodio = 15.66;
        //booleano = abap_bool
        let conteudo_liquido = true;

        //tabela interna no javascript - array
        let composicao = ["bicabornato", "magnesio", "sulfato", "brometo"];

        // estrutura  - tipo com varias propriedades  - ou  tambem chamado de objeto.
        let produto = {
          descricao: "chá verde",
          marca: "quaker",
          peso: 130,
          uom: "g",
        };
      },
    });
  }
);
