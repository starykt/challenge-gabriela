import Icon from '@mdi/react';
import { format } from 'date-fns';
import AddNewResult from './newResultModal';
import React, { useState, useEffect } from 'react';
import { IResult, Lessons } from "../interfaces/result";
import { ResultService } from "../services/resultService";
import { mdiChartBoxOutline, mdiPlus, mdiTrashCanOutline } from '@mdi/js';

const resultService = new ResultService();


const List: React.FC = () => {
  type ColorClass = 'text-red-500' | 'text-yellow-500' | 'text-green-500';
  const [showDeleteMessage, setDeleteMessage] = useState<boolean>(false);

  const [showResultModal, setResultModal] = useState<boolean>(false);
  const [selectedBimester, setSelectedBimester] = useState<string | null>(null);

  const lessonColors = {
    [Lessons.Biologia]: "bg-label-biology",
    [Lessons.Artes]: "bg-label-art",
    [Lessons.Geografia]: "bg-label-geography",
    [Lessons.Sociologia]: "bg-label-sociology",
  };

  const lessonOrder = {
    [Lessons.Biologia]: 1,
    [Lessons.Artes]: 2,
    [Lessons.Geografia]: 3,
    [Lessons.Sociologia]: 4,
  };

  function getGradeColor(grade: number): ColorClass {
    if (grade < 6) {
      return 'text-red-500';
    } else if (grade >= 6 && grade < 8) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await resultService.deleteResult(id);
      setDeleteMessage(true);

      setTimeout(() => {
        setDeleteMessage(false);
        window.location.reload();
      }, 1000);
      } catch(err) {
        console.error(err);
      }
  }

  const formatTitle = (title: string): string => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  }

  const setNewModal = (bimester: string): void => {
    setResultModal(true);
    setSelectedBimester(bimester);
  }

  const [resultsByBimestre, setResultsByBimestre] = useState<{ [key: string]: IResult[] }>({});

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const fetchedResults = await resultService.fetchAllResults();
        setResultsByBimestre(fetchedResults);
      } catch(err) {
        console.error(err);
      }
    }
    fetchAllResults();
  }, [])

  return (
    <div className="relative grid gap-8 min-h-screen flex-col justify-center overflow-hidden">
      <div className="relative my-10">
        <div className="mx-auto max-w-6xl">
            {showDeleteMessage && (
              <div className="mt-4 bg-green-500 text-white p-2 transition-opacity duration-300 opacity-100 sticky">
                Nota excluída com sucesso!
              </div>
            )}
            {["PRIMEIRO", "SEGUNDO", "TERCEIRO", "QUARTO"].map(bimester => (
              <div key={bimester} className='mb-4 sm:justify-center'>
                <div className="flex justify-between items-center align-center">
                  <h1 className='text-2xl ml-2'>
                    {formatTitle(bimester)} semestre
                  </h1>
                  <button
                    className="flex align-center justify-center min-h-4 m-4 bg-button-confirmed text-black p-2 transition-opacity duration-300 opacity-100"
                    onClick={() => setNewModal(bimester)}
                  >
                    <p className="mx-2">
                      Lançar nota
                    </p>
                    <Icon path={mdiPlus} size={1} />
                  </button>
                </div>
                <div className="flex flex-wrap sm:flex-row gap-4 justify-around sm:justify-start">
                  {(resultsByBimestre[bimester] || [])
                    .sort((a, b) => lessonOrder[a.lesson!] - lessonOrder[b.lesson!])
                    .map(result => (
                      <div
                        key={result.id}
                        className={`grid min-w-48 min-h-30 ml-4 py-4 rounded w-24 ${lessonColors[result.lesson!]}`}
                      >
                      <div className='flex justify-between mb-2'>
                        <h1 className='text-2xl ml-4'>{result.lesson}</h1>
                        <div  onClick={() => handleDelete(result.id)}>
                          <Icon
                            className="justify-self-end mr-2 cursor-pointer"
                            path={mdiTrashCanOutline}
                            size={1}
                          />
                        </div>
                      </div>
                      <h2 className='text-sm ml-4 mb-4'>{(format(result.createdAt!, 'dd/MM/yyyy'))}</h2>
                      <div className='flex align-center py-4 justify-start bg-gray-800 bg-opacity-50'>
                        <Icon className="ml-4" path={mdiChartBoxOutline} size={1} />
                        <h3 className={`text-base ml-2 ${getGradeColor(result.grade!)}`}>
                          Nota: {result.grade}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          ))}
         {showResultModal && (
            <AddNewResult
              closeModal={() => {
                setResultModal(false);
                setSelectedBimester(null); // Limpa o bimestre selecionado ao fechar o modal
              }}
              selectedBimester={selectedBimester} // Passa o bimestre selecionado para o modal
            />
          )}
        </div>
      </div>
    </div>
  )};

export default List;