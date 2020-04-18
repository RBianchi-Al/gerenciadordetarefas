import React from 'react';
import ReactDOM from 'react-dom';
import CadastrarTarefas from './cadastrar-tarefas';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('tese do component de listagem de tarefas', () => {
  it('deve renderizar o projeto sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CadastrarTarefas/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve cadastrar uma nova tarefa', () => {
    const {getByTestId} = render(<CadastrarTarefas/>);
    fireEvent.change(getByTestId('txt-tarefa'), {target: {value:'Testar componente'}});
    fireEvent.click(getByTestId('btn-cadastrar'));
    expect(getByTestId('modal')).toHaveTextContent('Sucesso');
    expect(getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso!');
 
  });
  
});