import React, {useState, useEffect} from 'react';
import {A} from 'hookrouter';
import {Table, Form} from  'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import ItensListaTarefas from './itens-lista-tarefas'
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';

function ListarTarefas(){
  const ITENS_POR_PAG = 3;

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDes, setOrdenarDes] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState('');



  useEffect(()=> {

    function obterTarefas(){
      const tarefasDb = localStorage['tarefas'];
      let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      // filtrar
      listaTarefas = listaTarefas.filter(
        t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
      );

      //ordenar
        if(ordenarAsc){
         listaTarefas.sort((t1, t2) =>(t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);

        }else if (ordenarDes){
          listaTarefas.sort((t1, t2) =>(t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);

        }
      //paginar

      setTotalItens(listaTarefas.length);
      setTarefas(listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG));
    }
    if(carregarTarefas){
      obterTarefas();
      setCarregarTarefas(false)
    }
  }, [carregarTarefas, paginaAtual, ordenarDes, ordenarAsc, filtroTarefa]);

  function handleMudarPagina(pagina){
    setPaginaAtual(pagina);
    setCarregarTarefas(true);

  }

  function handleOrdenar(event){
    event.preventDefault();
    if(!ordenarAsc && !ordenarDes){
      setOrdenarAsc(true);
      setOrdenarDes(false);
    }else if(ordenarAsc){
      setOrdenarAsc(false);
      setOrdenarDes(true);
    }else{
      setOrdenarDes(false);
      setOrdenarAsc(false);

    }
    setCarregarTarefas(true);

  }

  function handleFiltar(event) {
    setFiltroTarefa(event.target.value);
    setCarregarTarefas(true);
  }

  return (
<div className="container">
      <div className="text-center">
        <h3>Tarefas a fazer</h3>
        <Table striped bordered hover responsive data-testid="tabela">
          <thead>
            <tr>
              <th>
                <a href="/" onClick={handleOrdenar}>
                Tarefa
                &nbsp;
                <Ordenacao
                  ordenarAsc={ordenarAsc}
                  ordenarDes={ordenarDes} />
                </a>
                
              </th>
              <th>
                <A href="/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa">
                  <FontAwesomeIcon icon={faPlus}/>
                  &nbsp;
                  Nova tarefa
                </A>
              </th>
            </tr>
            <tr>
              <th>
                <Form.Control 
                type="text"
                value={filtroTarefa}
                onChange={handleFiltar}
                data-testid="txt-tarefa"
                className="filtro-tarefa"/>

              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas}>
            </ItensListaTarefas>

          </tbody>
        </Table>
        <Paginacao
        totalItens={totalItens}
        itensPorPagina={ITENS_POR_PAG}
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina}
        />
      </div>
      </div>
  );
}
export default ListarTarefas;