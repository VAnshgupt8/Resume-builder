import { Route as rootRouteImport } from './routes/__root';
import { Route as RegisterRouteImport } from './routes/register';
import { Route as LoginRouteImport } from './routes/login';
import { Route as ForgotPasswordRouteImport } from './routes/forgot-password';
import { Route as AppRouteImport } from './routes/_app';
import { Route as SplatRouteImport } from './routes/$';
import { Route as IndexRouteImport } from './routes/index';
import { Route as AppTemplatesRouteImport } from './routes/_app.templates';
import { Route as AppSettingsRouteImport } from './routes/_app.settings';
import { Route as AppProfileRouteImport } from './routes/_app.profile';
import { Route as AppDownloadsRouteImport } from './routes/_app.downloads';
import { Route as AppDashboardRouteImport } from './routes/_app.dashboard';
import { Route as AppAtsRouteImport } from './routes/_app.ats';
import { Route as AppAiRouteImport } from './routes/_app.ai';
import { Route as AppResumesIndexRouteImport } from './routes/_app.resumes.index';
import { Route as AppResumesNewRouteImport } from './routes/_app.resumes.new';
import { Route as AppResumesIdIndexRouteImport } from './routes/_app.resumes.$id.index';
import { Route as AppResumesIdPreviewRouteImport } from './routes/_app.resumes.$id.preview';
const RegisterRoute = RegisterRouteImport.update({
    id: '/register',
    path: '/register',
    getParentRoute: () => rootRouteImport,
});
const LoginRoute = LoginRouteImport.update({
    id: '/login',
    path: '/login',
    getParentRoute: () => rootRouteImport,
});
const ForgotPasswordRoute = ForgotPasswordRouteImport.update({
    id: '/forgot-password',
    path: '/forgot-password',
    getParentRoute: () => rootRouteImport,
});
const AppRoute = AppRouteImport.update({
    id: '/_app',
    getParentRoute: () => rootRouteImport,
});
const SplatRoute = SplatRouteImport.update({
    id: '/$',
    path: '/$',
    getParentRoute: () => rootRouteImport,
});
const IndexRoute = IndexRouteImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => rootRouteImport,
});
const AppTemplatesRoute = AppTemplatesRouteImport.update({
    id: '/templates',
    path: '/templates',
    getParentRoute: () => AppRoute,
});
const AppSettingsRoute = AppSettingsRouteImport.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => AppRoute,
});
const AppProfileRoute = AppProfileRouteImport.update({
    id: '/profile',
    path: '/profile',
    getParentRoute: () => AppRoute,
});
const AppDownloadsRoute = AppDownloadsRouteImport.update({
    id: '/downloads',
    path: '/downloads',
    getParentRoute: () => AppRoute,
});
const AppDashboardRoute = AppDashboardRouteImport.update({
    id: '/dashboard',
    path: '/dashboard',
    getParentRoute: () => AppRoute,
});
const AppAtsRoute = AppAtsRouteImport.update({
    id: '/ats',
    path: '/ats',
    getParentRoute: () => AppRoute,
});
const AppAiRoute = AppAiRouteImport.update({
    id: '/ai',
    path: '/ai',
    getParentRoute: () => AppRoute,
});
const AppResumesIndexRoute = AppResumesIndexRouteImport.update({
    id: '/resumes/',
    path: '/resumes/',
    getParentRoute: () => AppRoute,
});
const AppResumesNewRoute = AppResumesNewRouteImport.update({
    id: '/resumes/new',
    path: '/resumes/new',
    getParentRoute: () => AppRoute,
});
const AppResumesIdIndexRoute = AppResumesIdIndexRouteImport.update({
    id: '/resumes/$id/',
    path: '/resumes/$id/',
    getParentRoute: () => AppRoute,
});
const AppResumesIdPreviewRoute = AppResumesIdPreviewRouteImport.update({
    id: '/resumes/$id/preview',
    path: '/resumes/$id/preview',
    getParentRoute: () => AppRoute,
});
const AppRouteChildren = {
    AppAiRoute: AppAiRoute,
    AppAtsRoute: AppAtsRoute,
    AppDashboardRoute: AppDashboardRoute,
    AppDownloadsRoute: AppDownloadsRoute,
    AppProfileRoute: AppProfileRoute,
    AppSettingsRoute: AppSettingsRoute,
    AppTemplatesRoute: AppTemplatesRoute,
    AppResumesNewRoute: AppResumesNewRoute,
    AppResumesIndexRoute: AppResumesIndexRoute,
    AppResumesIdPreviewRoute: AppResumesIdPreviewRoute,
    AppResumesIdIndexRoute: AppResumesIdIndexRoute,
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
    IndexRoute: IndexRoute,
    SplatRoute: SplatRoute,
    AppRoute: AppRouteWithChildren,
    ForgotPasswordRoute: ForgotPasswordRoute,
    LoginRoute: LoginRoute,
    RegisterRoute: RegisterRoute,
};
export const routeTree = rootRouteImport
    ._addFileChildren(rootRouteChildren)
    ._addFileTypes();
