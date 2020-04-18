import React from "react";
import "./gerenciador-tarefas.css";
import { useRoutes } from "hookrouter";
import ListarTarefas from "./listar/listar-tarefas";
import AtualizarTarefas from "./atualizar/atualizar-tarefas";
import CadastrarTarefas from "./cadastrar/cadastrar-tarefas";

const routes = {
  "/": () => <ListarTarefas />,
  "/cadastrar": () => <CadastrarTarefas />,
  "/atualizar/:id": ({ id }) => <AtualizarTarefas id={id} />,
};

function GerenciadorTarefas() {
  return useRoutes(routes);
}

export default GerenciadorTarefas;
