import {createFileRoute} from '@tanstack/react-router';

import Navbar from '@/components/common/navBar/Navbar';
import '@/styles/fonts.css';

export const Route = createFileRoute('/test')({
  component: () => <Navbar />,
});
