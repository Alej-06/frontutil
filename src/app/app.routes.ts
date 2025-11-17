import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { PlistBlogPavon } from './component/shared/feature/blog/plist/plist';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'blog', component: PlistBlogPavon}
];
