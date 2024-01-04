import Icon from '@mdi/react';
import "../css/newResult.css";
import { mdiClose } from '@mdi/js';
import { useEffect, useState } from 'react';
import { ResultService } from "../services/resultService";
import { Bimesters, IResult, Lessons } from "../interfaces/result";

const resultService = new ResultService();

interface AddNewResultProps {
  closeModal: () => void;
  selectedBimester: string | null;
}

const AddNewResult : React.FC<AddNewResultProps> = ({ closeModal, selectedBimester }) => {
  // Configurando as cores padrões de cada matéria
  const lessonColors = {
    [Lessons.Biologia]: "bg-label-biology",
    [Lessons.Artes]: "bg-label-art",
    [Lessons.Geografia]: "bg-label-geography",
    [Lessons.Sociologia]: "bg-label-sociology",
  };

  const normalizedBimester = selectedBimester!.toUpperCase();

  const [showLessonWarning, setShowLessonWarning] = useState<boolean>(false);
  const [showGradeWarning, setGradeWarning] = useState<boolean>(false);
  const [showErrorId, setErrorId] = useState<boolean>(false);

  const [clickedLesson, setClickedLesson] = useState<Lessons | null>();
  const [newResult, setNewResult] = useState<IResult>({
    id: "",
    bimester: normalizedBimester as Bimesters,
    lesson: null,
    grade: null,
    createdAt: null,
    updatedAt: null
  });

  const setLesson = (lesson: Lessons) => {
    setClickedLesson(clickedLesson === undefined ? lesson : (lesson === clickedLesson ? null : lesson));
  };

  const handleChange = (e: { target: { name: string; value: string | number; }; }) => {
    setNewResult(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Esperando que o valor seja atualizado
  useEffect(() => {
    if (newResult.lesson !== null) {
      handleSubmit();
    }
  }, [newResult]);

  const finisheData = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!clickedLesson) {
      setShowLessonWarning(true);

      setTimeout(() => {
        setShowLessonWarning(false);
      }, 3000);

      return;
    }

    const lessonOption = clickedLesson?.toLowerCase();
    const currentDate = new Date();
    const firstLetterOfBimester = selectedBimester?.charAt(0).toUpperCase();
    const firstLetterOfLesson = clickedLesson.charAt(0).toUpperCase();


    setNewResult(prev => ({
      ...prev,
      id: `${firstLetterOfBimester}${firstLetterOfLesson}`,
      createdAt: currentDate,
      updatedAt: currentDate,
      lesson: lessonOption ? Lessons[clickedLesson!] : null,
    }));
  }

  const handleSubmit = async () => {
    if (!newResult.grade || newResult.grade < 0 || newResult.grade > 10) {
      console.error("Nota inválida. Certifique-se de inserir um valor entre 0 e 10.");
      setGradeWarning(true);

      setTimeout(() => {
        setGradeWarning(false);
      }, 4000);

      return;
    }

    try {
      await resultService.fetchNewResult(newResult);
      window.location.reload();
    } catch(err) {
      setErrorId(true);
      setTimeout(() => {
        setErrorId(false);
      }, 4000);
      console.error(err);
    }
  };

  return (
    <div className="flex fixed inset-0 justify-center items-center bg-dark-200 bg-opacity-30 backdrop-blur-sm">
      <form className="bg-zinc-900 p-9 rounded-lg">
        <div>
          <div className="grid cursor-pointer" onClick={() => closeModal()}>
            <Icon path={mdiClose} size={1} className="place-self-end" />
          </div>
          <h1 className='text-5xl py-6'>{selectedBimester!.charAt(0).toUpperCase() + selectedBimester!.slice(1).toLowerCase()} bimestre</h1>
          <p className='m-2'>
            Disciplina
          </p>
        </div>
        <div className='flex'>
          {Object.values(Lessons).map((lesson) => (
            <div
              key={lesson}
              className={`lesson-item py-4 m-2 cursor-pointer text-center rounded w-24 ${lessonColors[lesson]} ${
                clickedLesson === lesson ? "clicked" : ""
              }`}
              onClick={() => setLesson(lesson)}
            >
              <p className='text-center'>
                {lesson}
              </p>
            </div>
          ))}
        </div>
        <div className="m-2">
          <label htmlFor="grade">Nota</label>
          <input
            type="number"
            name="grade"
            id="grade"
            className="flex mt-2 bg-transparent p-1.5 pl-1 text-white-900 placeholder:text-white-400 border rounded border-white"
            placeholder="7.5"
            min="0"
            max="10"
            required
            step="0.1"
            onChange={handleChange} />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={finisheData}
            className="rounded-md bg-button-confirm px-3 py-2 text-black text-sm font-semibold shadow-sm hover:bg-button-confirmed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Confirmar</button>
        </div>
        {showLessonWarning && (
          <div className="mt-4 bg-red-500 text-white p-2 transition-opacity duration-300 opacity-100">
            Por favor, selecione uma disciplina.
          </div>
        )}
        {showErrorId && (
          <div className="mt-4 bg-red-500 text-white p-2 transition-opacity duration-300 opacity-100">
            Este item já está cadastrado.
          </div>
        )}
        {showGradeWarning && (
          <div className="mt-4 bg-red-500 text-white p-2 transition-opacity duration-300 opacity-100">
            Insira uma nota válida, positiva e inferior a 10.
          </div>
        )}
      </form>
    </div>
  )
};

export default AddNewResult;