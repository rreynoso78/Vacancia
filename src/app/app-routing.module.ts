import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'inicio',
    loadChildren: () => import('./public/inicio/inicio.module').then( m => m.InicioModule),
  },

  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./public/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: 'plantilla',
    loadChildren: () => import('./private/modales/modal-plantilla/modal-plantilla.module').then( m => m.ModalPlantillaModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
