// import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
// import {TanStackRouterDevtools} from '@tanstack/router-devtools';

// export const Route = createRootRoute({
//   component: () => (
//     <>
//       <div className="p-2 flex gap-2">
//         {/* <Link to="/" className="[&.active]:font-bold">
//           Home
//         </Link>{' '} */}
//         <Link to="/about" className="[&.active]:font-bold">
//           About
//         </Link>
//       </div>
//       <hr />
//       <Outlet />
//       <TanStackRouterDevtools />
//     </>
//   ),
// });

import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';

// rootRoute로 내보내기
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/About" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
