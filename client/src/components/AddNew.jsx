import "../css/newResult.css";
import { Link } from "react-router-dom";
import { React, useState } from 'react';
import { Lessons } from "../interfaces/result.ts";

const AddNew = () => {
  // Configurando as cores padrões de cada matéria
  const lessonColors = {
    [Lessons.first]: "bg-label-biology",
    [Lessons.second]: "bg-label-art",
    [Lessons.third]: "bg-label-geography",
    [Lessons.fourth]: "bg-label-sociology",
  };

  const [clickedLesson, setClickedLesson] = useState(null);

  const setLesson = (lesson) => {
    setClickedLesson(lesson === clickedLesson ? null : lesson);
  };

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
          <label for="grade">Nota</label>
          <input type="number" name="grade" id="grade" className="flex mt-2 bg-transparent p-1.5 pl-1 text-white-900 placeholder:text-white-400 border rounded border-white" placeholder="7.5" max="10" />
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" class="text-sm font-semibold rounded-md px-3 py-2 bg-white text-black"><Link to="/">Cancelar</Link></button>
          <button type="submit" class="rounded-md bg-button-confirm px-3 py-2 text-black text-sm font-semibold shadow-sm hover:bg-button-confirmed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Confirmar</button>
        </div>
      </form>
    </div>
  )
};

export default AddNew;