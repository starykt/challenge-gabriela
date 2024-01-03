import "../css/newResult.css";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ResultService } from "../services/resultService";
import { Bimesters, IResult, Lessons } from "../interfaces/result";

const resultService = new ResultService();

const AddNew = () => {
  // Configurando as cores padrões de cada matéria
  const lessonColors = {
    [Lessons.Biologia]: "bg-label-biology",
    [Lessons.Artes]: "bg-label-art",
    [Lessons.Geografia]: "bg-label-geography",
    [Lessons.Sociologia]: "bg-label-sociology",
  };

  const [showLessonWarning, setShowLessonWarning] = useState<boolean>(false);
  const [clickedLesson, setClickedLesson] = useState<Lessons | null>();
  const [newResult, setNewResult] = useState<IResult>({
    id: "8",
    bimester: Bimesters.quarto,
    lesson: null,
    grade: null,
    createdAt: null,
    updatedAt: null
  });

  const setLesson = (lesson: Lessons) => {
    setClickedLesson(clickedLesson === undefined ? lesson : (lesson === clickedLesson ? null : lesson));
  };

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string | number; }; }) => {
    setNewResult(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Esperando que o valor seja atualizado
  useEffect(() => {
    if (newResult.lesson !== null && newResult.createdAt !== null && newResult.updatedAt !== null) {
      handleSubmit();
    }
  }, [newResult]);

  const finisheData = () => {
    if (!clickedLesson) {
      setShowLessonWarning(true);

      setTimeout(() => {
        setShowLessonWarning(false);
      }, 3000);

      return;
    }

    const lessonOption = clickedLesson?.toLowerCase();
    const currentDate = new Date();


    setNewResult(prev => ({
      ...prev,
      createdAt: currentDate,
      updatedAt: currentDate,
      lesson: lessonOption ? Lessons[clickedLesson!] : null,
    }));
  }

  const handleSubmit = async () => {
    if (!newResult.grade) {
      return;
    }

    try {
      await resultService.fetchNewResult(newResult);
      navigate("/");
    }catch(err) {
      console.error(err);
    }
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <form className='bg-black-900'>
        <div>
          <h1 className='text-5xl py-6'>Bimestre</h1>
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
            max="10"
            required
            onChange={handleChange} />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold rounded-md px-3 py-2 bg-white text-black"><Link to="/">Cancelar</Link></button>
          <button
            type="submit"
            onClick={finisheData}
            className="rounded-md bg-button-confirm px-3 py-2 text-black text-sm font-semibold shadow-sm hover:bg-button-confirmed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Confirmar</button>
        </div>
        {showLessonWarning && (
          <div className="mt-4 bg-red-500 text-white p-2 transition-opacity duration-300 opacity-100">
            Por favor, selecione uma disciplina
          </div>
        )}
      </form>
    </div>
  )
};

export default AddNew;