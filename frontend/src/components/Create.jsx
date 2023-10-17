import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompts } from '../utils';
import {Formfield, Loader} from '../comp'

const Create = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setForm({...form, prompt: randomPrompt})
  }

  const generateImage = async () => {
      if (form.prompt){
        try {
           setGenerateImg(true); 
           const response = await fetch('http://localhost:4000/api/v1/imgai', {
            method: 'POST',
            headers: {
              'Content-Type': "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt,}),
           });
           const data = await response.json();
           setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
        }catch (error){
            alert(error);         
        } finally{
          setGenerateImg(false);
        } 
      } else {
          alert('Please enter a prompt')
        }
      };
  

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
          const response = await fetch('http://localhost:4000/api/v1/post', {
            method: "POST",
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
          });
          await response.json();
          navigate('/');
      } catch (error) {
        alert(error);
      }finally {
        setLoading(false);
      }
    } else {
        alert ('Please enter Prompt and generate the Image')
    }


  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text=[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Create imaginative and visually stunning images 
          through DALL-E AI and share them with the community
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <Formfield 
          labelName="Your Name" 
          type="text"
          name="name" 
          placeholder= "Full Name" 
          value={form.name}
          handleChange={handleChange}/>

          <Formfield 
          labelName="Prompt" 
          type="text"
          name="prompt" 
          placeholder="an armchair in the shape of an avocado" 
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}/>

      <div className='relative bg-gray-50 border border-gray-300 
      text-gray-900 text-sm rounded-lg focus:ring-blue-500 
      focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
          {form.photo ? (
            <img src={form.photo} 
            alt={form.prompt} 
            className='w-full h-full oject-contain'/>
          ):(
            <img src={preview} 
            alt='preview' 
            className='w-9/12 h-9/12 object-contain opacity-40'/>
          )}
          {generateImg && (
            
            <div className='absolute inset-0 z-0 flex justify-center 
            items-center bg-[#rgba(0,0,0,0.5)] rounded-lg'>
              <Loader/>
            </div>
          )}
        </div>
        </div>
       
        <div className='mt-5 gap-5 flex'>
          <button 
          type='button' 
          onClick={generateImage} 
          className='text-white bg-green-700 font-medium text-sm
          rounded-md w-full sm:w-auto px-5 py-2.5 text-center'>
            {generateImg ? 'Generating' : 'Generate'}
          </button>
        </div>
        
        <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>
            Once you have create the Image you want, 
            you can share it with others in the community</p>
            
            <button 
            type='submit' 
            className='mt-3 text-white bg-[#6469ff] font-medium
            rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {loading ? 'Sharing...' : 'Share with the Community'}
            </button>
        </div>

      </form>

    </section>
  )
}

export default Create