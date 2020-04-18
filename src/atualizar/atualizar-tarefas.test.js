import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefas from './atualizar-tarefas'

describe('tese do component de listagem de tarefas', () => {
  it('deve renderizar o projeto sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AtualizarTarefas id={1}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
});