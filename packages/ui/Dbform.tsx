"use client";
import React, { useState } from 'react';
import { nanoid } from 'nanoid';


interface DbFormProps {
  name: string;
  tags: string[];
  env: string[];
  port:number;
}

interface EnvVariable {
  name: string;
  value: string;
}

const DbForm: React.FC<DbFormProps> = ({ name, tags, env ,port}) => {
  const [formValues, setFormValues] = useState({
    tag: '',
    name: '',
    type: name,
    envVariables: env.map((envVar) => ({ name: envVar, value: nanoid(14) })) as EnvVariable[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      tag: value,
    }));
  };

  const handleEnvInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues((prevValues) => {
      const updatedEnvVariables = [...prevValues.envVariables];
      updatedEnvVariables[index].value = value;
      return {
        ...prevValues,
        envVariables: updatedEnvVariables,
      };
    });
  };

  const checkFormCompletion = () => {
    const { tag, name, type, envVariables } = formValues;

    if (!tag || !name || !type || envVariables.some((envVar) => !envVar.value)) {
      alert('Please fill in all the fields');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkFormCompletion()) {
      return;
    }

    const { tag, name, type, envVariables } = formValues;
    fetch('/db/new/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name,
        tag,
        type,
        envVariables,
        port
      }),
    })
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-amber-500 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="appearance-none w-full bg-dark border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="block text-amber-500 font-bold mb-2">
            Tag:
          </label>
          <select
            id="tag"
            name="tag"
            value={formValues.tag}
            onChange={handleSelectChange}
            className="block appearance-none w-full bg-dark border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-purple-500"
          >
            <option value="">Select a tag</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-amber-500 font-bold mb-2">
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formValues.type}
            readOnly
            className="appearance-none w-full bg-dark border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="env" className="block text-amber-500 font-bold mb-2">
            Environment Variables
          </label>
          {formValues.envVariables.map((envVar, index) => (
            <>
            <label htmlFor="env" className="block text-amber-500 font-bold mb-2">
           {envVar.name} :
          </label>
            <input
              key={index}
              type="text"
              id={`env-${index}`}
              name={`env-${index}`}
              value={envVar.value}
              onChange={(e) => handleEnvInputChange(index, e)}
              className="appearance-none w-full bg-dark border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-purple-500"
            />
            </>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Deploy
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default DbForm;
