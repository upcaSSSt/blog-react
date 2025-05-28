import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('posts/:id', 'routes/post-view.tsx'),
  route('new', 'routes/new.tsx'),
  route('edit/:id', 'routes/edit.tsx'),
  route('users', 'routes/users.tsx'),
  route('users/:id', 'routes/user.tsx'),
] satisfies RouteConfig;
