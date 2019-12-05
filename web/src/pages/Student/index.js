import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import { Container, SearchBar, StudentList } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('students');

        setStudents(response.data);
      } catch (err) {
        toast.error('Erro ao carregar os dados...');
      }
    }
    loadStudents();
  }, []);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: {
          search,
        },
      });

      setStudents(response.data);
    }
    loadStudents();
  }, [search]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="submit">
            <MdAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </button>
          <SearchBar>
            <MdSearch size={16} color="#999" />
            <input
              name="search"
              placeholder="Buscar aluno"
              onChange={handleSearch}
            />
          </SearchBar>
        </div>
      </header>

      <StudentList>
        <table>
          <thead>
            <tr>
              <th className="name">NOME</th>
              <th>E-MAIL</th>
              <th className="age">IDADE</th>
              <th className="edit" />
              <th className="delete" />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={String(student.id)}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="age">{student.age}</td>
                <td className="edit">
                  <button type="button">editar</button>
                </td>
                <td className="delete">
                  <button type="button">apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StudentList>
    </Container>
  );
}
