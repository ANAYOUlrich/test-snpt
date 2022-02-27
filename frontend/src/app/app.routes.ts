import { Routes } from '@angular/router'
import { IndexComposantComponent } from './views/composants/index/index.component'
import { IndexRouePelleComponent } from './views/roues-pelles/index/index.component'

export const routes:Routes = [
  {path: 'roues-pelles', component:IndexRouePelleComponent},
  {path: 'composants', component:IndexComposantComponent},
]
