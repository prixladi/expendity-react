import React, { useEffect } from 'react';
import { Formik, Form as FormikForm, FormikHelpers, FormikValues, FormikProps } from 'formik';
import { Prompt } from 'react-router-dom';
import * as yup from 'yup';

type Props<Values> = {
  onSubmit: (values: Values, helpers: FormikHelpers<Values>) => Promise<void>;
  initialValues: Values;
  leaveMessage?: string;
  // eslint-disable-next-line
  validationSchema?: yup.ObjectSchema<any>;
  children?: React.ReactNode;
};

type PromptProps = {
  leaveMessage?: string;
  when: boolean;
};

const LeavePrompt: React.FC<PromptProps> = ({ leaveMessage, when }: PromptProps) => {
  useEffect(() => {
    if (when && !!leaveMessage) {
      window.onbeforeunload = () => true;
      return () => {
        window.onbeforeunload = null;
      };
    }

    window.onbeforeunload = null;
    return undefined;
  }, [leaveMessage, when]);

  if (!leaveMessage || !when) {
    return null;
  }

  return <Prompt message={leaveMessage} when={when} />;
};

const Form = <Values extends FormikValues>({
  onSubmit,
  initialValues,
  leaveMessage,
  children,
  validationSchema,
}: Props<Values>): JSX.Element => (
  <Formik<Values>
    validateOnChange={false}
    validateOnBlur={true}
    validateOnMount={false}
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({ dirty, isSubmitting }: FormikProps<Values>) => (
      <>
        <LeavePrompt leaveMessage={leaveMessage} when={dirty && !isSubmitting} />
        <FormikForm>{children}</FormikForm>
      </>
    )}
  </Formik>
);

export default Form;
