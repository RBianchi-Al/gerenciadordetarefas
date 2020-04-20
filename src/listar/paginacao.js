import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import PropTypes from 'prop-types';

function Paginacao(props){


  function gerarPrimeiroItem(){
    return (
      <Pagination.First
      key="pagFirst"
      onClick={() => props.mudarPagina(1)}
      disabled={props.paginaAtual === 1}/>   
    );
  }

  function gerarItemAnterior(){
    return (
      <Pagination.Prev
      key="pagPrev"
      onClick={() => props.mudarPagina(props.paginaAtual - 1)}
      disabled={props.paginaAtual === 1}/>
    );
  }

  function gerarItemNumerico(pagina){
    return (
      <Pagination.Item
      key={pagina}
      active={pagina === props.paginaAtual}
      onClick={() => props.mudarPagina(pagina)}>
        {pagina}
      </Pagination.Item>
    );
  }

  function gerarProximoItem (numPagina){
    return(
      <Pagination.Next
      key="pagNext"
      onClick={() => props.mudarPagina(props.paginaAtual + 1)}
      disabled={props.paginaAtual === numPagina}/>
    );
  }

  function gerarUltimoItem (numPagina){
    return (
      <Pagination.Last
      key="pagLast"
      onClick={() => props.mudarPagina(numPagina)}
      disabled={props.paginaAtual === numPagina}/>

    );
  }

  function obterPaginacao(){
    const numPagina = Math.ceil(props.totalItens / props.itensPorPagina);


    let itens = [];
    itens.push(gerarPrimeiroItem());
    itens.push(gerarItemAnterior());

    for (let pagina =1 ; pagina <= numPagina; pagina++){
      itens.push(gerarItemNumerico(pagina));
    }

    itens.push(gerarProximoItem(numPagina)); 
    itens.push(gerarUltimoItem(numPagina));  

    return itens;
  }

  return (
    <Pagination data-testid="paginacao">
      {obterPaginacao()}
    </Pagination>
  );


}



Paginacao.propTypes = {
  totalItens: PropTypes.number.isRequired,
  itensPorPagina: PropTypes.number.isRequired,
  paginaAtual: PropTypes.number.isRequired,
  mudarPagina: PropTypes.func.isRequired
}

export default Paginacao;
