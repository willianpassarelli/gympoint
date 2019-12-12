import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Modal from '~/components/Modal';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

import api from '~/services/api';

import { Container, SearchBar, StudentList, Pagination } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [search, setSearch] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('students', {
          params: {
            search,
            page,
          },
        });

        if (response.data.length !== 10) {
          setResults(true);
        } else {
          setResults(false);
        }
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Erro ao carregar os dados...');
      }
    }
    loadStudents();
  }, [page, search]);

  async function reloadList() {
    try {
      const response = await api.get('students', {
        params: {
          page,
        },
      });

      setStudents(response.data);
    } catch (err) {
      toast.error('Erro ao carregar os dados...');
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`students/${studentId}`);

      setIsOpen(false);
      setStudentId('');
      reloadList();
      toast.success('Dados apagados com sucesso.');
    } catch (err) {
      toast.error('Erro ao apagar aluno.');
    }
  }

  function openModal(id) {
    setIsOpen(true);
    setStudentId(id);
  }

  function closeModal() {
    setIsOpen(false);
    setStudentId('');
  }

  async function handlePage(e) {
    await setPage(e === 'back' ? page - 1 : page + 1);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <Button register path="/student/form" />
          <SearchBar>
            <MdSearch size={16} color="#999" />
            <input
              name="search"
              placeholder="Buscar aluno"
              onChange={e => setSearch(e.target.value)}
            />
          </SearchBar>
        </div>
      </header>

      <StudentList>
        {students.length === 0 ? (
          <div>
            <h1>Lista vazia</h1>
          </div>
        ) : (
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
                    <Link to={`/student/form/${student.id}`}>editar</Link>
                  </td>
                  <td className="delete">
                    <button type="button" onClick={() => openModal(student.id)}>
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => handlePage('back')}
          >
            <FaChevronLeft />
          </button>
          <span>Página {page}</span>
          <button
            type="button"
            disabled={results}
            onClick={() => handlePage('next')}
          >
            <FaChevronRight />
          </button>
        </Pagination>
      </StudentList>
      <Modal
        text="Você tem certeza que deseja apagar os dados do aluno?"
        handleOpen={modalIsOpen}
        handleClose={closeModal}
        handleDelete={handleDelete}
      />
    </Container>
  );
}
