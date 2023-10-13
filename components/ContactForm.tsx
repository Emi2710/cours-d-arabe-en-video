import React from 'react'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,

} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";

const initValues = { email: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };



export default function ContactForm() {

  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({
    email: false,
    message: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const displaySuccessMessage = () => {
    setShowSuccess(true);
    
  };

  const { values, isLoading, error } = state;

  const onBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      [event.target.name]: event.target.value,
    },
  }));


  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({
        email: false,
        message: false,
    });
      setState(initState);
      toast({
        title: "Le message a bien été envoyé",
        status: "success",
        duration: Infinity,
        position: "top",
      });

      displaySuccessMessage();

    } catch (error) {
        const errorObject = error as Error; // Type assertion
        setState((prev) => ({
            ...prev,
            isLoading: false,
            error: errorObject.message,
        }));
    }
  };


  return (
    <Container className='mb-28 flex flex-col items-center justify-center'>
      {error && (
        <Text className='text-orange text-xl'>
          {error}
        </Text>
      )}

      {showSuccess && (
        <div>
            <p className='text-vert bold text-xl mb-10'>Le message a bien été envoyé</p>
        </div>
      )}


      <FormControl 
        isRequired 
        isInvalid={touched.email && !values.email} 
        mb={5}
        className=''>

        <FormLabel className='bold mb-3'>Email</FormLabel>
        <Input
          className='border-3 border-gris-contour h-[50px] w-[80vw] lg:w-screen max-w-[860px] '
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage className='text-orange'>Champs requis</FormErrorMessage>
      </FormControl>


      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
        className=''
      >
        <FormLabel className='bold mb-3 mt-8'>Votre message</FormLabel>
        <Textarea
          className='border-3 border-gris-contour w-[80vw] lg:w-screen max-w-[860px]'
          name="message"
          rows={10}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage className='text-orange'>Champs requis</FormErrorMessage>
      </FormControl>

      <Button
        className='w-[190px] mt-16 mx-auto text-lg bold bg-bleu-foncé py-2 text-white rounded-[5px] effet-bleu tracking-wide'
        isLoading={isLoading}
        disabled={
           !values.email || !values.message
        }
        onClick={onSubmit}
      >
        Envoyer
      </Button>
    </Container>
  )
}