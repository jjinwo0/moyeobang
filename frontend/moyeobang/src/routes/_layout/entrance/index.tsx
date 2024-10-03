import {createFileRoute} from '@tanstack/react-router';
import Login from '@/components/Login/Login';
import SignUpForm from '@/components/Login/SignUpForm';

export const Route = createFileRoute('/_layout/entrance/')({
  component: SignUpForm,
});
